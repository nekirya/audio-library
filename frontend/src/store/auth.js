import { defineStore } from 'pinia';
import { authService } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),
  actions: {
    async login(credentials) {
      const response = await authService.login(credentials);
      this.setAuthData(response.data);
      return response;
    },
    async register(userData) {
      const response = await authService.register(userData);
      this.setAuthData(response.data);
      return response;
    },
    setAuthData(data) {
      this.user = data.user;
      this.token = data.token;
      this.isAuthenticated = true;
      localStorage.setItem('token', data.token);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    async checkAuth() {
      if (this.token) {
        try {
          const response = await authService.getMe();
          this.user = response.data;
          this.isAuthenticated = true;
        } catch (error) {
          this.logout();
        }
      }
    }
  }
});