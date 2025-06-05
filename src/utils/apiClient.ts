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

type HTTP = 'GET' | 'POST' | 'PUT';

interface ApiOptions {
  method?: HTTP;
  data?: any;
  headers?: Record<string, string>;
  cookies?: string;
}

export async function apiRequest<T = any>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
  const isDev = import.meta.env.PUBLIC_IS_DEV === 'true' || import.meta.env.PUBLIC_IS_DEV === true;

  const { method = 'GET', data, headers = {}, cookies } = options;

  const config: RequestInit = {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  if (cookies) {
    (config.headers as any).Cookie = cookies;
  }

  if (isDev && typeof process !== 'undefined') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  try {
    const res = await fetch(`${baseUrl}${path}`, config);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API error (${res.status}): ${errorBody}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error(`Network or fetch error: ${error}`);
  }
}
