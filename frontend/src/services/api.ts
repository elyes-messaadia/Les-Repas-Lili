import axios, { InternalAxiosRequestConfig } from 'axios';
import type { Restaurant, Reservation, User, Association, Beneficiary } from '../types/models';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password
    });
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout() {
    localStorage.removeItem('token');
  }
};

export const restaurantService = {
  async getAll() {
    const { data } = await api.get<Restaurant[]>('/restaurants');
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Restaurant>(`/restaurants/${id}`);
    return data;
  },

  async getByUserId(userId: number) {
    const { data } = await api.get<Restaurant[]>(`/restaurants/user/${userId}`);
    return data;
  },

  async create(restaurant: Omit<Restaurant, 'id' | 'created_at'>) {
    const { data } = await api.post<Restaurant>('/restaurants', restaurant);
    return data;
  },

  async update(id: number, restaurant: Partial<Restaurant>) {
    const { data } = await api.put<Restaurant>(`/restaurants/${id}`, restaurant);
    return data;
  }
};

export const reservationService = {
  async create(reservation: Omit<Reservation, 'id' | 'created_at'>) {
    const { data } = await api.post<Reservation>('/reservations', reservation);
    return data;
  },

  async getByRestaurant(restaurantId: number) {
    const { data } = await api.get<Reservation[]>(`/reservations/restaurant/${restaurantId}`);
    return data;
  },

  async getByAssociation(associationId: number) {
    const { data } = await api.get<Reservation[]>(`/reservations/association/${associationId}`);
    return data;
  },

  async updateStatus(id: number, status: string) {
    const { data } = await api.patch<Reservation>(`/reservations/${id}/status`, { status });
    return data;
  }
};

export const associationService = {
  async getAll() {
    const { data } = await api.get<Association[]>('/associations');
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Association>(`/associations/${id}`);
    return data;
  }
};

export const beneficiaryService = {
  async create(beneficiary: Omit<Beneficiary, 'id' | 'created_at'>) {
    const { data } = await api.post<Beneficiary>('/beneficiaries', beneficiary);
    return data;
  }
};

export default api; 