import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { restaurantService, reservationService } from '../../services/api';
import type { Restaurant, Reservation } from '../../types/models';

export const RestaurantDashboard = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      if (!user) return;
      const userRestaurants = await restaurantService.getByUserId(user.id);
      setRestaurants(userRestaurants);
    };
    loadRestaurants();
  }, [user]);

  useEffect(() => {
    const loadReservations = async () => {
      if (!selectedRestaurant) return;
      const restaurantReservations = await reservationService.getByRestaurant(selectedRestaurant.id);
      setReservations(restaurantReservations);
    };
    loadReservations();
  }, [selectedRestaurant]);

  const handleStatusChange = async (reservationId: number, newStatus: string) => {
    try {
      await reservationService.updateStatus(reservationId, newStatus);
      // Refresh reservations
      if (selectedRestaurant) {
        const updated = await reservationService.getByRestaurant(selectedRestaurant.id);
        setReservations(updated);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  return (
    <div className="restaurant-dashboard">
      <h2>Tableau de Bord Restaurateur</h2>
      
      <div className="restaurant-selector">
        <h3>Vos Restaurants</h3>
        <select onChange={(e) => {
          const restaurant = restaurants.find(r => r.id === Number(e.target.value));
          setSelectedRestaurant(restaurant || null);
        }}>
          <option value="">Sélectionner un restaurant</option>
          {restaurants.map(restaurant => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRestaurant && (
        <div className="reservations-list">
          <h3>Réservations pour {selectedRestaurant.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Personnes</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{new Date(reservation.reservation_date).toLocaleString()}</td>
                  <td>{reservation.number_of_people}</td>
                  <td>{reservation.status}</td>
                  <td>
                    <select
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="rejected">Refusée</option>
                      <option value="completed">Terminée</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}; 