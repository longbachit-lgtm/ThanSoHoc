// let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = "http://localhost:5000";
console.log("API_BASE_URL hiện tại là:", API_BASE_URL);

// Helper function để lấy token từ localStorage
const getToken = () => {
  const authData = localStorage.getItem("auth");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      return parsed.accessToken;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Helper function để tạo headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers["x_authorization"] = token;
    }
  }

  return headers;
};

// API functions
export const api = {
  // Auth APIs
  auth: {
    register: async (username, password, fullname, email, registrationCode) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify({
          username,
          password,
          fullname,
          email,
          registrationCode,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }
      return data;
    },

    login: async (username, password) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: getHeaders(false),
          body: JSON.stringify({ username, password }),
        });

        // Check if response exists (network error will throw before this)
        if (!response) {
          throw new Error(
            "Không thể kết nối đến server. Vui lòng kiểm tra xem server có đang chạy không!"
          );
        }

        const data = await response.json();

        if (!response.ok) {
          // Create error object similar to axios error structure
          const error = new Error(data.message || "Đăng nhập thất bại");
          error.response = {
            status: response.status,
            statusText: response.statusText,
            data: data,
          };
          throw error;
        }

        return data;
      } catch (error) {
        // Handle network errors (Failed to fetch, CORS, etc.)
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          const networkError = new Error(
            "Không thể kết nối đến server. Vui lòng đảm bảo server đang chạy tại http://localhost:5000"
          );
          networkError.isNetworkError = true;
          throw networkError;
        }

        // If it's already our custom error, re-throw it
        if (error.response) {
          throw error;
        }

        // Re-throw other errors as-is
        throw error;
      }
    },

    refreshToken: async (refreshToken) => {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_authorization: token || "",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Refresh token thất bại");
      }
      return data;
    },
  },

  // Numerology APIs
  numerology: {
    save: async (numerologyData) => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/save`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(numerologyData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lưu dữ liệu thất bại");
      }
      return data;
    },

    getMyData: async () => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/my-data`, {
        method: "GET",
        headers: getHeaders(true),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          return { data: null, message: data.message };
        }
        throw new Error(data.message || "Lấy dữ liệu thất bại");
      }
      return data;
    },

    getHistory: async (page = 1, limit = 10) => {
      const response = await fetch(
        `${API_BASE_URL}/api/numerology/history?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: getHeaders(true),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lấy lịch sử thất bại");
      }
      return data;
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/${id}`, {
        method: "DELETE",
        headers: getHeaders(true),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Xóa dữ liệu thất bại");
      }
      return data;
    },
  },

  // Todo APIs
  todo: {
    create: async (todoData) => {
      const response = await fetch(`${API_BASE_URL}/api/todo`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Tạo danh sách thất bại");
      }
      return data;
    },

    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/todo`, {
        method: "GET",
        headers: getHeaders(true),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lấy danh sách thất bại");
      }
      return data;
    },

    getActive: async () => {
      const response = await fetch(`${API_BASE_URL}/api/todo/active`, {
        method: "GET",
        headers: getHeaders(true),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lấy danh sách thất bại");
      }
      return data;
    },

    getByPeriod: async (period, targetDate = null) => {
      const params = new URLSearchParams({ period });
      if (targetDate) {
        params.append(
          "targetDate",
          targetDate instanceof Date ? targetDate.toISOString() : targetDate
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/todo/period?${params}`,
        {
          method: "GET",
          headers: getHeaders(true),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lấy danh sách thất bại");
      }
      return data;
    },

    update: async (id, todoData) => {
      const response = await fetch(`${API_BASE_URL}/api/todo/${id}`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật danh sách thất bại");
      }
      return data;
    },

    updateSection: async (id, sectionId, action, sectionData) => {
      const response = await fetch(`${API_BASE_URL}/api/todo/${id}/section`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify({ sectionId, action, sectionData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật section thất bại");
      }
      return data;
    },

    updateItem: async (id, sectionId, itemId, action, itemData) => {
      const response = await fetch(`${API_BASE_URL}/api/todo/${id}/item`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify({ sectionId, itemId, action, itemData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật item thất bại");
      }
      return data;
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/todo/${id}`, {
        method: "DELETE",
        headers: getHeaders(true),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Xóa danh sách thất bại");
      }
      return data;
    },
  },

  // Registration Code APIs
  registrationCode: {
    validate: async (code) => {
      const response = await fetch(
        `${API_BASE_URL}/api/registration-code/validate`,
        {
          method: "POST",
          headers: getHeaders(false),
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Validation thất bại");
      }
      return data;
    },

    create: async (codeData) => {
      const response = await fetch(`${API_BASE_URL}/api/registration-code`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(codeData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Tạo mã CODE thất bại");
      }
      return data;
    },

    getAll: async (params = {}) => {
      try {
        const queryParams = new URLSearchParams(params);
        const response = await fetch(
          `${API_BASE_URL}/api/registration-code?${queryParams}`,
          {
            method: "GET",
            headers: getHeaders(true),
          }
        );

        // Handle network errors
        if (!response) {
          throw new Error(
            "Không thể kết nối đến server. Vui lòng kiểm tra backend server."
          );
        }

        const data = await response.json();

        if (!response.ok) {
          // Create error with status info
          const error = new Error(
            data.message || "Lấy danh sách mã CODE thất bại"
          );
          error.status = response.status;
          error.response = data;
          throw error;
        }
        return data;
      } catch (error) {
        // Re-throw with more context
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          throw new Error(
            "Không thể kết nối đến server. Vui lòng đảm bảo backend server đang chạy tại http://localhost:5000"
          );
        }
        throw error;
      }
    },

    getById: async (id) => {
      const response = await fetch(
        `${API_BASE_URL}/api/registration-code/${id}`,
        {
          method: "GET",
          headers: getHeaders(true),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lấy thông tin mã CODE thất bại");
      }
      return data;
    },

    update: async (id, codeData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/registration-code/${id}`,
        {
          method: "PUT",
          headers: getHeaders(true),
          body: JSON.stringify(codeData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Cập nhật mã CODE thất bại");
      }
      return data;
    },

    delete: async (id) => {
      const response = await fetch(
        `${API_BASE_URL}/api/registration-code/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(true),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Xóa mã CODE thất bại");
      }
      return data;
    },
  },
};

export default api;
