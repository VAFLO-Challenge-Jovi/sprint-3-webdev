import { request } from './http.js';

/**
 * Wikipedia search + REST summary (public, CORS-enabled).
 * Tries Portuguese first, then English (the OCR often reads English titles).
 */
export async function findWikipediaSummary(query, { signal } = {}) {
  for (const lang of ['pt', 'en']) {
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: query,
      srlimit: '1',
      format: 'json',
      origin: '*',
    });
    const search = await request(`https://${lang}.wikipedia.org/w/api.php?${params}`, { signal });
    const hit = search.query?.search?.[0];
    if (!hit) continue;

    const summary = await request(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title)}`,
      { signal },
    );
    if (summary.type === 'disambiguation' || !summary.extract) continue;

    return {
      lang,
      title: summary.title,
      extract: summary.extract,
      url: summary.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(hit.title)}`,
      thumbnail: summary.thumbnail?.source || '',
    };
  }
  return null;
}
