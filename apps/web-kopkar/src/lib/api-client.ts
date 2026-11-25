/**
 * API Client Interceptor & Fetcher for KopKar SAI.
 * In production, automatically handles Authorization headers and 401 redirection.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('kopkar_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('kopkar_token');
    const gatewayUrl = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:5175';
    window.location.href = `${gatewayUrl}/#/login`;
    throw new ApiError(401, 'Sesi telah berakhir. Silakan login kembali.');
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorBody.message || 'Terjadi kesalahan sistem.');
  }

  return response.json();
}
