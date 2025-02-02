import axios from 'axios';
import type { User, Restaurant, Reservation } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export const userService = {
  async create(userData: Omit<User, 'id' | 'created_at'>) {
    const { data } = await api.post<User>('/users', userData);
    return data;
  }
};

export const restaurantService = {
  async getAll() {
    const { data } = await api.get<Restaurant[]>('/restaurants');
    return data;
  },

  async create(restaurantData: Omit<Restaurant, 'id' | 'created_at'>) {
    const { data } = await api.post<Restaurant>('/restaurants', restaurantData);
    return data;
  }
};

export const reservationService = {
  async create(reservationData: Omit<Reservation, 'id' | 'created_at'>) {
    const { data } = await api.post<Reservation>('/reservations', reservationData);
    return data;
  },

  async getByRestaurant(restaurantId: number) {
    const { data } = await api.get<Reservation[]>(`/restaurants/${restaurantId}/reservations`);
    return data;
  }
};

export default api; 