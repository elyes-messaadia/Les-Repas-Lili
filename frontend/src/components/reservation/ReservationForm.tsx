import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/api';
import type { Reservation } from '../../types/models';

interface ReservationFormProps {
  restaurantId: number;
  associationId: number;
  beneficiaryId: number;
  onSubmit?: (reservation: Reservation) => void;
}

export default function ReservationForm({ 
  restaurantId, 
  associationId, 
  beneficiaryId,
  onSubmit 
}: ReservationFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const reservation = await reservationService.create({
        restaurantId,
        associationId,
        beneficiaryId,
        date: formData.date,
        time: formData.time,
        status: 'PENDING'
      });

      if (onSubmit) {
        onSubmit(reservation);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la création de la réservation');
      console.error('Reservation creation error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Heure
        </label>
        <input
          type="time"
          id="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Créer la réservation
        </button>
      </div>
    </form>
  );
} 