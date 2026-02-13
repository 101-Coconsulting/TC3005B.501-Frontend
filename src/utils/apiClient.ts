/*
 * Author: Eduardo Porto Morales
 
 --GET
    const requests = await apiRequest('/applicant/get-user-requests/1');

 --POST
    await apiRequest('/applicant/create-request', {
        method: 'POST',
        data: { payload }
    });

 --PUT
    await apiRequest('/applicant/update-request/1', {
        method: 'PUT',
        data: { payload }
    });

*/

import { getSession } from "@data/cookies";

// Handle SSL certificate validation for server-side (Node.js) environment
// This is needed for Astro SSR to work with self-signed certificates
const isServer = typeof window === 'undefined';
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

// In development server environment, disable certificate validation
if (isServer && isDevelopment && typeof process !== 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

type HTTP = 'GET' | 'POST' | 'PUT';

interface ApiOptions {
  method?: HTTP;
  data?: any;
  headers?: Record<string, string>;
  cookies?: import("astro").APIContext["cookies"];
}

const BASE_URL = import.meta.env.PUBLIC_API_URL || 'https://localhost:3000';

// Esta cosa para debugear
console.log('BASE_URL:', BASE_URL);
console.log('PUBLIC_API_URL:', import.meta.env.PUBLIC_API_URL);

export async function apiRequest<T = any>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', data, headers, cookies } = options;

  const url = `${BASE_URL}${path}`;
  console.log('Full URL:', url); 
  
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

  try {
    // For Node.js in development, the NODE_TLS_REJECT_UNAUTHORIZED env var handles this
    // For browsers, we can't directly modify SSL validation behavior
    // ^eso que?
    const res = await fetch(url, config);

    if (!res.ok) {
      let errorResponse;
      try {
        const text = await res.text();
        try {
          errorResponse = JSON.parse(text);
        } catch {
          errorResponse = { error: text };
        }
      } catch {
        errorResponse = { error: 'Failed to read error response' };
      }
      throw {
        status: res.status,
        response: errorResponse
      };
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text as any;
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw {
      message: 'Network or fetch error',
      detail: error
    };
  }
}
