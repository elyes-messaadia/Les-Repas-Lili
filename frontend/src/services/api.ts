import axios from 'axios';
import { Recipe } from '../types/recipe';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export const recipeApi = {
  getAll: async () => {
    const { data } = await api.get<Recipe[]>('/recipes');
    return data;
  },

  create: async (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const { data } = await api.post<Recipe>('/recipes', recipe);
    return data;
  }
};

export default api; 