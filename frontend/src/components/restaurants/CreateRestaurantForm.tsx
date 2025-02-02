import { useState } from 'react';
import { restaurantService } from '../../services/api';
import type { Restaurant } from '../../types/models';

export const CreateRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    cuisine_type_id: 1,
    meal_options: [] as string[],
    max_reservations: 10,
    min_reservation_delay: 24
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await restaurantService.create({
        ...formData,
        user_id: 1 // À remplacer par l'ID de l'utilisateur connecté
      });
      // Réinitialiser le formulaire ou rediriger
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-restaurant-form">
      <h2>Ajouter un restaurant</h2>
      <div className="form-group">
        <label htmlFor="name">Nom du restaurant</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Adresse</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <button type="submit">Créer</button>
    </form>
  );
}; 