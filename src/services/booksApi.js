import { request } from './http.js';

const GOOGLE_KEY = (import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '').trim();

/** Google Books API. Works without a key, but the anonymous quota is shared and often exhausted. */
async function searchGoogleBooks(query, { signal, max }) {
  const params = new URLSearchParams({ q: query, maxResults: String(max), printType: 'books' });
  if (GOOGLE_KEY) params.set('key', GOOGLE_KEY);
  const data = await request(`https://www.googleapis.com/books/v1/volumes?${params}`, { signal });

  return (data.items || []).map(({ id, volumeInfo: info = {} }) => ({
    id,
    source: 'Google Books',
    title: info.title,
    subtitle: info.subtitle || '',
    authors: info.authors || [],
    year: info.publishedDate ? info.publishedDate.slice(0, 4) : '',
    description: info.description || '',
    thumbnail: info.imageLinks?.thumbnail?.replace('http://', 'https://') || '',
    url: info.infoLink || `https://books.google.com/books?id=${id}`,
  }));
}

/** Open Library search API (public, keyless, CORS-enabled). */
async function searchOpenLibrary(query, { signal, max }) {
  const params = new URLSearchParams({
    q: query,
    limit: String(max),
    fields: 'key,title,subtitle,author_name,first_publish_year,cover_i',
  });
  const data = await request(`https://openlibrary.org/search.json?${params}`, { signal });

  return (data.docs || []).map((doc) => ({
    id: doc.key,
    source: 'Open Library',
    title: doc.title,
    subtitle: doc.subtitle || '',
    authors: doc.author_name || [],
    year: doc.first_publish_year ? String(doc.first_publish_year) : '',
    description: '',
    thumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
    url: `https://openlibrary.org${doc.key}`,
  }));
}

/** Google Books first; Open Library when Google fails (quota) or finds nothing. */
let googleQuotaExceeded = false;

export async function searchBooks(query, { signal, max = 4 } = {}) {
  if (!googleQuotaExceeded) {
    try {
      const books = await searchGoogleBooks(query, { signal, max });
      if (books.length) return books;
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      // Don't hit an exhausted quota again during this session.
      if (error.status === 429 || error.status === 403) googleQuotaExceeded = true;
    }
  }
  return searchOpenLibrary(query, { signal, max });
}
