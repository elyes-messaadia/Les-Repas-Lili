import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { restaurantService, reservationService } from '../../services/api';
import type { Restaurant, Reservation } from '../../types/models';

export const RestaurantDashboard = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        if (!user) return;
        const userRestaurants = await restaurantService.getByUserId(user.id);
        setRestaurants(userRestaurants);
        if (userRestaurants.length > 0) {
          setSelectedRestaurant(userRestaurants[0]);
        }
      } catch (error) {
        showNotification('Erreur lors du chargement des restaurants', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, [user, showNotification]);

  useEffect(() => {
    const loadReservations = async () => {
      if (!selectedRestaurant) return;
      try {
        const restaurantReservations = await reservationService.getByRestaurant(selectedRestaurant.id);
        setReservations(restaurantReservations);
      } catch (error) {
        showNotification('Erreur lors du chargement des réservations', 'error');
      }
    };
    loadReservations();
  }, [selectedRestaurant, showNotification]);

  const handleStatusChange = async (reservationId: number, newStatus: string) => {
    try {
      await reservationService.updateStatus(reservationId, newStatus);
      showNotification('Statut de la réservation mis à jour', 'success');
      if (selectedRestaurant) {
        const updated = await reservationService.getByRestaurant(selectedRestaurant.id);
        setReservations(updated);
      }
    } catch (error) {
      showNotification('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lili-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-display font-bold text-lili-green mb-6">
          Tableau de Bord Restaurateur
        </h2>
        
        <div className="mb-8">
          <label htmlFor="restaurant-select" className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner un restaurant
          </label>
          <select 
            id="restaurant-select"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lili-green focus:border-transparent"
            value={selectedRestaurant?.id || ''}
            onChange={(e) => {
              const restaurant = restaurants.find(r => r.id === Number(e.target.value));
              setSelectedRestaurant(restaurant || null);
            }}
          >
            <option value="">Sélectionner un restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRestaurant && (
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">
              Réservations pour {selectedRestaurant.name}
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Personnes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map(reservation => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(reservation.reservation_date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.number_of_people}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        reservation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="text-sm border border-gray-300 rounded-lg p-1 focus:ring-2 focus:ring-lili-green focus:border-transparent"
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
    </div>
  );
}; 