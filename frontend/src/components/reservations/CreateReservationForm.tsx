import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { reservationService } from '../../services/api';
import type { Restaurant } from '../../types/models';

interface Props {
  restaurant: Restaurant;
  onSuccess?: () => void;
}

export const CreateReservationForm = ({ restaurant, onSuccess }: Props) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    number_of_people: 1,
    reservation_date: '',
    comments: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Vous devez être connecté pour faire une réservation');
      return;
    }

    try {
      await reservationService.create({
        ...formData,
        restaurant_id: restaurant.id,
        beneficiary_id: user.id,
        association_id: 1, // À adapter selon votre logique
        booking_agent_id: 1, // À adapter selon votre logique
        status: 'pending',
        reservation_date: new Date(formData.reservation_date).toISOString()
      });
      onSuccess?.();
    } catch (error) {
      setError('Erreur lors de la réservation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h3>Réserver chez {restaurant.name}</h3>
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="number_of_people">Nombre de personnes</label>
        <input
          type="number"
          id="number_of_people"
          min="1"
          max={restaurant.max_reservations}
          value={formData.number_of_people}
          onChange={(e) => setFormData({
            ...formData,
            number_of_people: parseInt(e.target.value)
          })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reservation_date">Date et heure</label>
        <input
          type="datetime-local"
          id="reservation_date"
          value={formData.reservation_date}
          onChange={(e) => setFormData({
            ...formData,
            reservation_date: e.target.value
          })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comments">Commentaires</label>
        <textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({
            ...formData,
            comments: e.target.value
          })}
        />
      </div>

      <button type="submit">Réserver</button>
    </form>
  );
}; 