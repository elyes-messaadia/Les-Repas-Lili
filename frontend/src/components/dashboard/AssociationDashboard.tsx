import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { associationService, reservationService } from '../../services/api';
import type { Association, Reservation } from '../../types/models';

export default function AssociationDashboard() {
  const { user } = useAuth();
  const [association, setAssociation] = useState<Association | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssociationData = async () => {
      if (!user?.id) return;

      try {
        const associationData = await associationService.getById(user.id);
        setAssociation(associationData);

        // Load reservations for this association
        const reservationsData = await reservationService.getByAssociation(associationData.id);
        setReservations(reservationsData);
      } catch (err) {
        console.error('Error loading association data:', err);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadAssociationData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!association) {
    return (
      <div className="text-center py-4">
        Aucune association trouvée pour cet utilisateur.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Informations de l'association</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nom</p>
            <p className="mt-1">{association.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Adresse</p>
            <p className="mt-1">{association.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Téléphone</p>
            <p className="mt-1">{association.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Réservations</h2>
        {reservations.length === 0 ? (
          <p className="text-gray-500">Aucune réservation en cours.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.restaurantId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        reservation.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reservation.status}
                      </span>
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
} 