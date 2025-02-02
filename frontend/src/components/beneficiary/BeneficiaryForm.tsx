import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { beneficiaryService } from '../../services/api';
import type { Beneficiary } from '../../types/models';

interface BeneficiaryFormProps {
  associationId: number;
  onSubmit?: (beneficiary: Beneficiary) => void;
}

export default function BeneficiaryForm({ associationId, onSubmit }: BeneficiaryFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const beneficiary = await beneficiaryService.create({
        ...formData,
        associationId,
      });

      if (onSubmit) {
        onSubmit(beneficiary);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la création du bénéficiaire');
      console.error('Beneficiary creation error:', err);
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
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ajouter le bénéficiaire
        </button>
      </div>
    </form>
  );
} 