import axios from 'axios';
import type { User, Restaurant, Reservation } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  async create(userData: Omit<User, "id" | "created_at" | "roles">) {
    const { data } = await api.post<User>('/users', userData);
    return data;
  },

  async login(email: string, password: string) {
    const { data } = await api.post<{ user: User; token: string }>('/auth/login', {
      email,
      password
    });
    return data;
  }
};

export const restaurantService = {
  async getAll() {
    const { data } = await api.get<Restaurant[]>('/restaurants');
    return data;
  },

  async getByUserId(userId: number) {
    const { data } = await api.get<Restaurant[]>(`/users/${userId}/restaurants`);
    return data;
  },

  async create(restaurantData: Omit<Restaurant, "id" | "created_at">) {
    const { data } = await api.post<Restaurant>('/restaurants', restaurantData);
    return data;
  }
};

export const reservationService = {
  async create(reservationData: Omit<Reservation, "id" | "created_at">) {
    const { data } = await api.post<Reservation>('/reservations', reservationData);
    return data;
  },

  async getByRestaurant(restaurantId: number) {
    const { data } = await api.get<Reservation[]>(`/restaurants/${restaurantId}/reservations`);
    return data;
  },

  async updateStatus(reservationId: number, status: string) {
    const { data } = await api.patch<Reservation>(`/reservations/${reservationId}/status`, { status });
    return data;
  }
};

export default api; 