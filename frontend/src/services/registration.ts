import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface ContactFormData {
  organizationType: 'restaurant' | 'association';
  name: string;
  email: string;
  address: string;
  contact: {
    firstName: string;
    lastName: string;
  };
  additionalInfo?: string;
}

export const registrationService = {
  async submitContactForm(data: ContactFormData): Promise<void> {
    await axios.post(`${API_URL}/contact/register`, data);
  },

  // Pour l'admin uniquement
  async getContactRequests(): Promise<ContactFormData[]> {
    const response = await axios.get(`${API_URL}/admin/contact-requests`);
    return response.data;
  },

  async approveContactRequest(id: number): Promise<void> {
    await axios.post(`${API_URL}/admin/contact-requests/${id}/approve`);
  },

  async rejectContactRequest(id: number, reason?: string): Promise<void> {
    await axios.post(`${API_URL}/admin/contact-requests/${id}/reject`, { reason });
  }
}; 