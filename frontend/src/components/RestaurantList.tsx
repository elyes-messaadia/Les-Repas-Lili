import { useState, useEffect } from 'react';
import { restaurantService } from '../services/api';
import type { Restaurant } from '../types/models';

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await restaurantService.getAll();
        setRestaurants(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      {restaurants.map(restaurant => (
        <div key={restaurant.id} className="restaurant-card">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <p>Adresse: {restaurant.address}</p>
          <p>Options de repas: {restaurant.meal_options.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}; 