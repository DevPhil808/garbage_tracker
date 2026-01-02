const BASE_URL = "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api";

/**
 * Core request handler for the Borla Tracker API.
 * Uses a Record type to ensure custom headers like 'Authorization' 
 * are compatible with TypeScript's indexing rules.
 */
async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420", // Prevents ngrok warning page from blocking the API
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: headers as HeadersInit,
  });

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    return;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.detail || data?.message || `API Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

export const api = {
  get: (endpoint: string) => request(endpoint, { method: "GET" }),
  post: (endpoint: string, body: any) => 
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) => 
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: (endpoint: string, body: any) => 
    request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint: string) => request(endpoint, { method: "DELETE" }),
};