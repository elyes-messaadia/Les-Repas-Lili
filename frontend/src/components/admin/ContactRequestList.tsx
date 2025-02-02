import { useState, useEffect } from 'react';
import { ContactFormData, registrationService } from '../../services/registration';

export function ContactRequestList() {
  const [requests, setRequests] = useState<(ContactFormData & { id: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await registrationService.getContactRequests();
      setRequests(data as (ContactFormData & { id: number })[]);
    } catch (error: any) {
      setError('Erreur lors du chargement des demandes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await registrationService.approveContactRequest(id);
      // Recharger la liste après approbation
      await loadRequests();
    } catch (error: any) {
      setError('Erreur lors de l\'approbation de la demande');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await registrationService.rejectContactRequest(id, rejectReason);
      setSelectedRequest(null);
      setRejectReason('');
      // Recharger la liste après rejet
      await loadRequests();
    } catch (error: any) {
      setError('Erreur lors du rejet de la demande');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Chargement des demandes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Demandes d'inscription</h2>
      
      {requests.length === 0 ? (
        <div className="text-gray-600">Aucune demande en attente</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.organizationType === 'restaurant' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.organizationType === 'restaurant' ? 'Restaurant' : 'Association'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.contact.firstName} {request.contact.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {selectedRequest === request.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Raison du rejet"
                          className="w-full p-2 border rounded"
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleReject(request.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRequest(null);
                              setRejectReason('');
                            }}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => setSelectedRequest(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Rejeter
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 