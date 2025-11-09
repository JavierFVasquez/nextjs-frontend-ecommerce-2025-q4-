import type { JsonApiResponse } from '../schemas';

/**
 * JSON:API Fetch Options
 */
interface JsonApiFetchOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean>;
  body?: string;
}

/**
 * Builds query string from params object
 */
function buildQueryString(
  params: Record<string, string | number | boolean>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return searchParams.toString();
}

/**
 * Generic JSON:API fetch wrapper
 * Handles JSON:API formatted requests and responses
 *
 * @param url - The API endpoint URL
 * @param options - Fetch options including JSON:API params
 * @returns Promise resolving to JSON:API formatted response
 */
export async function jsonApiFetch<T>(
  url: string,
  options: JsonApiFetchOptions = {}
): Promise<JsonApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  let fullUrl = url;
  if (params) {
    const queryString = buildQueryString(params);
    fullUrl = `${url}?${queryString}`;
  }

  // Set default headers for JSON:API
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/vnd.api+json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/vnd.api+json');
  }

  // Add API Key header if available
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey && !headers.has('x-api-key')) {
    headers.set('x-api-key', apiKey);
  }

  // Perform fetch
  const response = await fetch(fullUrl, {
    ...fetchOptions,
    headers,
  });

  // Handle non-OK responses
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
    );
  }

  // Parse and return JSON:API response
  const data: JsonApiResponse<T> = await response.json();
  return data;
}
