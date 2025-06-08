/*
 * Author: Eduardo Porto Morales
 
 --GET
    const requests = await apiRequest('/applicant/get-user-requests/1');

 --POST
    await apiRequest('/applicant/create-request', {
        method: 'POST',
        data: { payload}
    });

 --PUT
    await apiRequest('/applicant/update-request/1', {
        method: 'PUT',
        data: { payload }
    });

*/
// In development, allow self-signed certificates
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

import { getSession } from "@data/cookies";

type HTTP = 'GET' | 'POST' | 'PUT';

interface ApiOptions {
  method?: HTTP;
  data?: any;
  headers?: Record<string, string>;
  cookies?: import("astro").APIContext["cookies"];
}

export async function apiRequest<T = any>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
  const { method = 'GET', data, headers = {}, cookies } = options;
  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

  let token = "";
  try {
    const session = getSession(cookies); 
    token = session.token;
  } catch (e) {
    console.warn("[WARN] No se pudo obtener sesión en apiRequest", e);
  }

  const config: RequestInit = {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  // For browser environment, we need to handle self-signed certificates differently
  // The fetch API in browsers doesn't have a direct way to ignore certificate errors

  try {
    // Add a rejectUnauthorized option for development environments
    const fetchOptions = isDev 
      ? { ...config, rejectUnauthorized: false } 
      : config;
      
    const res = await fetch(`${baseUrl}${path}`, fetchOptions);

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      throw {
        status: res.status,
        response: errorJson || await res.text()
      };
    }

    return await res.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw {
      message: 'Network or fetch error',
      detail: error
    };
  }
}
