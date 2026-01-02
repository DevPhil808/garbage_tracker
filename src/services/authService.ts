// src/services/authService.ts

// Logout function: clears tokens and user data, calls backend logout endpoint
export async function logout() {
  const refresh = localStorage.getItem("refresh_token");
  const access = localStorage.getItem("access_token");

  try {
    await fetch(
      "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/auth/logout/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh, access }),
      }
    );
  } catch (err) {
    // Ignore errors — still clear tokens
    console.error("Logout API call failed:", err);
  }

  // Clear tokens and user data
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("company");

  // Redirect to login
  window.location.href = "/login";
}
