// Centralized API utilities
const defaultBaseUrl = 'http://localhost:4000';
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || defaultBaseUrl;

type JsonBody = Record<string, unknown>;

export async function request<TResponse>(
  path: string,
  options: RequestInit & { accessToken?: string; skipRefresh?: boolean } = {}
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);

  if (options.accessToken) {
    headers.set('Authorization', `Bearer ${options.accessToken}`);
  }

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config = {
    ...options,
    headers,
    credentials: 'include' as RequestCredentials,
  };

  let res = await fetch(url, config);

  if (res.status === 401 && !options.skipRefresh) {
    try {
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        // Retry original request
        // Remove Authorization header to force usage of new cookie
        const retryHeaders = new Headers(config.headers);
        retryHeaders.delete('Authorization');

        res = await fetch(url, {
          ...config,
          headers: retryHeaders,
        });
      }
    } catch (error) {
      // Refresh failed, proceed to return original error
    }
  }

  const data = (await res.json().catch(() => ({}))) as any;
  if (!res.ok) {
    const message =
      data?.error || data?.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return data as TResponse;
}

export async function getJson<TResponse>(
  path: string,
  options?: { accessToken?: string }
): Promise<TResponse> {
  return request<TResponse>(path, { ...options, method: 'GET' });
}

export async function postJson<TResponse>(
  path: string,
  body: JsonBody,
  options?: { accessToken?: string }
): Promise<TResponse> {
  return request<TResponse>(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
    skipRefresh: path === '/auth/refresh' || path === '/auth/login',
  });
}

export async function putJson<TResponse>(
  path: string,
  body: JsonBody,
  options?: { accessToken?: string }
): Promise<TResponse> {
  return request<TResponse>(path, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function deleteJson<TResponse>(
  path: string,
  options?: { accessToken?: string }
): Promise<TResponse> {
  return request<TResponse>(path, { ...options, method: 'DELETE' });
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    hospitalId: string | null;
  };
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'user';
  hospitalId?: string | null;
}

export interface SignupResponse {
  success?: boolean;
  // Some implementations may return created user
  data?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  // Or may directly return tokens (if auto-login on register)
  accessToken?: string;
  refreshToken?: string;
  user?: LoginResponse['user'];
}


