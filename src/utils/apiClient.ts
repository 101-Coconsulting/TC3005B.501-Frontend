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
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


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
    const res = await fetch(`${baseUrl}${path}`, config);

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      throw {
        status: res.status,
        response: errorJson || await res.text()
      };
    }

    return await res.json();
  } catch (error) {
    throw {
      message: 'Network or fetch error',
      detail: error
    };
  }
}
