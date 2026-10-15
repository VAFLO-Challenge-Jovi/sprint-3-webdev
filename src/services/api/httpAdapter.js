import { ApiError, request } from '../http.js';

/**
 * REST adapter for MockAPI.io (https://mockapi.io).
 * Resources: /users, /scans (and optionally /messages).
 */
export function createHttpAdapter(baseUrl) {
  const url = (resource, id, params) => {
    const path = `${baseUrl}/${resource}${id ? `/${id}` : ''}`;
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return path + query;
  };

  return {
    async list(resource, params, signal) {
      try {
        return await request(url(resource, null, params), { signal });
      } catch (error) {
        // MockAPI answers 404 when a filter matches nothing.
        if (error instanceof ApiError && error.status === 404) return [];
        throw error;
      }
    },
    create: (resource, data) => request(url(resource), { method: 'POST', body: data }),
    update: (resource, id, data) => request(url(resource, id), { method: 'PUT', body: data }),
    remove: (resource, id) => request(url(resource, id), { method: 'DELETE' }),
  };
}
