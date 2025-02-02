import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    // Si besoin d'une déconnexion côté serveur
    // await axios.post(`${API_URL}/auth/logout`);
  },

  async getCurrentUser(): Promise<LoginResponse['user'] | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      return null;
    }
  }
}; 