import type { AdminAuthResponse, BenchResource, BenchResourcePayload } from '../types/benchResources';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...requestOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed. Please try again.');
  }

  return data as T;
}

export function getPublicBenchResources() {
  return apiRequest<BenchResource[]>('/bench-resources');
}

export function loginAdmin(payload: { email: string; password: string }) {
  return apiRequest<AdminAuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function signupAdmin(payload: { name: string; email: string; password: string }, signupKey: string) {
  return apiRequest<AdminAuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'x-admin-signup-key': signupKey },
  });
}

export function getAdminBenchResources(token: string) {
  return apiRequest<BenchResource[]>('/admin/bench-resources', { token });
}

export function createBenchResource(payload: BenchResourcePayload, token: string) {
  return apiRequest<BenchResource>('/admin/bench-resources', {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  });
}

export function updateBenchResource(id: string, payload: BenchResourcePayload, token: string) {
  return apiRequest<BenchResource>(`/admin/bench-resources/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    token,
  });
}

export function deleteBenchResource(id: string, token: string) {
  return apiRequest<{ message: string }>(`/admin/bench-resources/${id}`, {
    method: 'DELETE',
    token,
  });
}
