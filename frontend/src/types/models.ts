export type UserRole = 'admin' | 'restaurateur' | 'association' | 'beneficiaire' | 'booking_agent';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
  created_at?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  description?: string;
  image_url?: string;
  menu_url?: string;
  cuisine_type_id: number;
  meal_options: string[];
  max_reservations: number;
  min_reservation_delay: number;
  user_id: number;
  created_at?: string;
}

export interface Reservation {
  id: number;
  beneficiary_id: number;
  restaurant_id: number;
  association_id: number;
  booking_agent_id: number;
  reservation_date: string;
  number_of_people: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  comments?: string;
  created_at?: string;
} 