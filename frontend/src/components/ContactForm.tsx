import { useState } from 'react';
import { ContactFormData, registrationService } from '../services/registration';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    organizationType: 'restaurant',
    name: '',
    email: '',
    address: '',
    contact: {
      firstName: '',
      lastName: ''
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await registrationService.submitContactForm(formData);
      setSuccess(true);
      // Réinitialiser le formulaire
      setFormData({
        organizationType: 'restaurant',
        name: '',
        email: '',
        address: '',
        contact: {
          firstName: '',
          lastName: ''
        }
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du formulaire');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-green-50 text-green-600 p-4 rounded">
          <h3 className="text-lg font-semibold">Demande envoyée avec succès !</h3>
          <p className="mt-2">
            Nous avons bien reçu votre demande. Notre équipe va l'examiner et vous contactera prochainement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Demande d'inscription</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type d'organisation
          </label>
          <select
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="restaurant">Restaurant</option>
            <option value="association">Association</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de l'organisation
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prénom du contact
            </label>
            <input
              type="text"
              name="contact.firstName"
              value={formData.contact.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du contact
            </label>
            <input
              type="text"
              name="contact.lastName"
              value={formData.contact.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Informations complémentaires
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo || ''}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </form>
    </div>
  );
} 