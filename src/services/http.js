export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Small fetch wrapper: JSON in/out, throws ApiError on non-2xx responses.
 */
export async function request(url, { method = 'GET', body, signal, headers } = {}) {
  let response;
  try {
    response = await fetch(url, {
      method,
      signal,
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Não foi possível conectar ao servidor.', 0);
  }

  if (!response.ok) {
    throw new ApiError(`Erro ${response.status} ao acessar ${new URL(url).hostname}.`, response.status);
  }

  if (response.status === 204) return null;
  return response.json();
}
