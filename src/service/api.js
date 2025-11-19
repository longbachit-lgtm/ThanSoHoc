const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Helper function để lấy token từ localStorage
const getToken = () => {
  const authData = localStorage.getItem('auth');
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
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['x_authorization'] = token;
    }
  }
  
  return headers;
};

// API functions
export const api = {
  // Auth APIs
  auth: {
    register: async (username, password, fullname, email) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password, fullname, email }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      return data;
    },

    login: async (username, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
      return data;
    },

    refreshToken: async (refreshToken) => {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x_authorization': token || '',
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Refresh token thất bại');
      }
      return data;
    },
  },

  // Numerology APIs
  numerology: {
    save: async (numerologyData) => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/save`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(numerologyData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Lưu dữ liệu thất bại');
      }
      return data;
    },

    getMyData: async () => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/my-data`, {
        method: 'GET',
        headers: getHeaders(true),
      });
      
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          return { data: null, message: data.message };
        }
        throw new Error(data.message || 'Lấy dữ liệu thất bại');
      }
      return data;
    },

    getHistory: async (page = 1, limit = 10) => {
      const response = await fetch(
        `${API_BASE_URL}/api/numerology/history?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: getHeaders(true),
        }
      );
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Lấy lịch sử thất bại');
      }
      return data;
    },

    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/numerology/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Xóa dữ liệu thất bại');
      }
      return data;
    },
  },
};

export default api;

