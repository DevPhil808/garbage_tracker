// src/services/apiClient.ts
export async function apiFetch(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("access_token");

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  const response = await fetch(url, { ...options, headers });

  // ✅ Try JSON, but fallback to raw text if it fails
  try {
    const clone = response.clone(); // clone so we can read twice
    const data = await clone.json();
    return {
      ok: response.ok,
      status: response.status,
      headers: response.headers,
      json: async () => data,
    };
  } catch (err) {
    const text = await response.text();
    console.error("Non-JSON response received:", text);
    throw new Error("Expected JSON but got HTML/text");
  }
}
