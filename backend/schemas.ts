import { z } from "./deps.ts";

// Schémas de base
export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  created_at: z.date().optional()
});

export const RoleSchema = z.object({
  id: z.number().optional(),
  name: z.string()
});

export const AssociationSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  address: z.string(),
  contact_name: z.string(),
  contact_email: z.string().email(),
  contact_phone: z.string(),
  user_id: z.number(),
  created_at: z.date().optional()
});

export const RestaurantSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  address: z.string(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  menu_url: z.string().url().optional(),
  cuisine_type_id: z.number(),
  meal_options: z.array(z.string()),
  max_reservations: z.number().min(1),
  min_reservation_delay: z.number().min(0),
  user_id: z.number(),
  created_at: z.date().optional()
});

export const ReservationSchema = z.object({
  id: z.number().optional(),
  beneficiary_id: z.number(),
  restaurant_id: z.number(),
  association_id: z.number(),
  booking_agent_id: z.number(),
  reservation_date: z.date(),
  number_of_people: z.number().min(1),
  status: z.enum(['pending', 'confirmed', 'rejected', 'completed']),
  comments: z.string().optional(),
  created_at: z.date().optional()
});

export const BeneficiarySchema = z.object({
  id: z.number().optional(),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  birth_year: z.number().min(1900).max(new Date().getFullYear()),
  created_at: z.date().optional()
});

export const BookingAgentSchema = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  association_id: z.number(),
  created_at: z.date().optional()
});

// Types TypeScript inférés des schémas Zod
export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type Association = z.infer<typeof AssociationSchema>;
export type Restaurant = z.infer<typeof RestaurantSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type Beneficiary = z.infer<typeof BeneficiarySchema>;
export type BookingAgent = z.infer<typeof BookingAgentSchema>;

// Schémas pour la création (sans id et created_at)
export const CreateUserSchema = UserSchema.omit({ id: true, created_at: true });
export const CreateRestaurantSchema = RestaurantSchema.omit({ id: true, created_at: true });
export const CreateReservationSchema = ReservationSchema.omit({ id: true, created_at: true });
export const CreateBeneficiarySchema = BeneficiarySchema.omit({ id: true, created_at: true });

// Types pour la création
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateRestaurant = z.infer<typeof CreateRestaurantSchema>;
export type CreateReservation = z.infer<typeof CreateReservationSchema>;
export type CreateBeneficiary = z.infer<typeof CreateBeneficiarySchema>; 