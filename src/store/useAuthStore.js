import { create } from "zustand";

// Load từ localStorage khi khởi tạo
const loadAuthFromStorage = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return JSON.parse(authData);
    }
  } catch (e) {
    console.error('Error loading auth from storage:', e);
  }
  return null;
};

export const useAuthStore = create((set) => ({
  user: loadAuthFromStorage()?.user || null,
  accessToken: loadAuthFromStorage()?.accessToken || null,
  refreshToken: loadAuthFromStorage()?.refreshToken || null,
  
  login: (userData, accessToken, refreshToken) => {
    const authData = {
      user: userData,
      accessToken,
      refreshToken,
    };
    localStorage.setItem('auth', JSON.stringify(authData));
    set({ 
      user: userData, 
      accessToken, 
      refreshToken 
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth');
    set({ 
  user: null,
      accessToken: null, 
      refreshToken: null 
    });
  },
  
  updateToken: (accessToken) => {
    const currentAuth = loadAuthFromStorage();
    if (currentAuth) {
      const authData = {
        ...currentAuth,
        accessToken,
      };
      localStorage.setItem('auth', JSON.stringify(authData));
      set({ accessToken });
    }
  },
  
  isAuthenticated: () => {
    const auth = loadAuthFromStorage();
    return !!(auth && auth.accessToken && auth.user);
  },
}));
