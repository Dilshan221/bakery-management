// src/services/api.js

// ✅ Point to your backend (defaults to 8000 as per your .env)
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Small helper to read/write auth in one place
const authStore = {
  getToken() {
    return localStorage.getItem("cb_token");
  },
  setAuth({ token, user }) {
    if (token) localStorage.setItem("cb_token", token);
    if (user) localStorage.setItem("cb_user", JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem("cb_token");
    localStorage.removeItem("cb_user");
  },
  currentUser() {
    try {
      return JSON.parse(localStorage.getItem("cb_user") || "null");
    } catch {
      return null;
    }
  },
};

export const apiService = {
  /**
   * Core request wrapper
   * - Attaches JSON headers
   * - Adds Authorization: Bearer <token> if present
   * - Parses JSON safely; supports 204 No Content
   * - Throws rich error with .data (parsed server payload if any)
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = authStore.getToken();

    const config = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      credentials: "omit", // using header token auth, not cookies
      ...options,
    };

    // Stringify body if it's a plain object
    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      // Non-2xx → build a rich error
      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch {
          // ignore parse errors
        }
        const err = new Error(
          (errorData && errorData.message) ||
            `HTTP error: ${response.status} ${response.statusText}`
        );
        err.response = response;
        err.data = errorData;
        throw err;
      }

      // 204 No Content
      if (response.status === 204) return null;

      // Try to parse JSON; fall back to text if not JSON
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      // Network-level failure (DNS, server down, CORS hard fail, etc.)
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        const netErr = new Error(
          "Network error: Could not connect to the server"
        );
        netErr.cause = error;
        throw netErr;
      }
      throw error;
    }
  },

  /* ------------------------------ Health ------------------------------ */
  testConnection() {
    // backend exposes /api/health
    return this.request("/health");
  },

  /* ------------------------------ Auth ------------------------------- */
  async login(credentials) {
    const data = await this.request("/usermanagement/login", {
      method: "POST",
      body: credentials, // { email, password }
    });
    // Expecting { token, user }
    if (data?.token) authStore.setAuth(data);
    return data;
  },

  logout() {
    authStore.clear();
  },

  me() {
    return authStore.currentUser();
  },

  /* ----------------------- User Management (UI) ----------------------- */
  registerUser(userData) {
    // { firstname, lastname, email, password, birthday?, newsletter? }
    return this.request("/usermanagement/register", {
      method: "POST",
      body: userData,
    });
  },

  // List used by your admin table
  getUsers() {
    return this.request("/usermanagement/all");
  },

  getUserById(id) {
    return this.request(`/usermanagement/${id}`);
  },

  updateUser(id, userData) {
    return this.request(`/usermanagement/${id}`, {
      method: "PUT",
      body: userData,
    });
  },

  deleteUser(id) {
    return this.request(`/usermanagement/${id}`, {
      method: "DELETE",
    });
  },

  /* ---------------------------- Attendance ---------------------------- */
  getAttendanceRecords() {
    return this.request("/attendance/getAll");
  },

  markAttendance(attendanceData) {
    return this.request("/attendance/mark", {
      method: "POST",
      body: attendanceData,
    });
  },

  getUserAttendance(userId) {
    return this.request(`/attendance/getUserAttendance/${userId}`);
  },

  updateAttendance(id, attendanceData) {
    return this.request(`/attendance/update/${id}`, {
      method: "PUT",
      body: attendanceData,
    });
  },
};

export default apiService;
