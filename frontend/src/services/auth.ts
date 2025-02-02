import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export type UserRole = 'ADMIN' | 'RESTAURANT' | 'ASSOCIATION' | 'ASSOCIATION_MANAGER' | 'BOOKING_AGENT';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    // Champs spécifiques selon le rôle
    restaurantId?: number;
    associationId?: number;
  };
}

// Configuration globale d'axios pour inclure le token dans toutes les requêtes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } finally {
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser(): Promise<LoginResponse['user'] | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    await axios.post(`${API_URL}/auth/forgot-password`, { 
      email,
      resetUrl: `${window.location.origin}/reset-password` // L'URL de réinitialisation
    });
  },

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await axios.post(`${API_URL}/auth/reset-password`, data);
  },

  async validateResetToken(token: string): Promise<boolean> {
    try {
      await axios.get(`${API_URL}/auth/validate-reset-token/${token}`);
      return true;
    } catch {
      return false;
    }
  }
}; 