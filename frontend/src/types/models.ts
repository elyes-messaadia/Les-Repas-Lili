export type UserRole = 'admin' | 'restaurateur' | 'association' | 'beneficiaire' | 'booking_agent';

export interface User {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'RESTAURANT' | 'ASSOCIATION';
  created_at: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  userId: number;
  created_at: string;
}

export interface Reservation {
  id: number;
  restaurantId: number;
  associationId: number;
  beneficiaryId: number;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  created_at: string;
}

export interface Association {
  id: number;
  name: string;
  address: string;
  phone: string;
  userId: number;
  created_at: string;
}

export interface Beneficiary {
  id: number;
  firstName: string;
  lastName: string;
  associationId: number;
  created_at: string;
}

export interface BookingAgent {
  id: number;
  user_id: number;
  association_id: number;
  created_at: string;
} 