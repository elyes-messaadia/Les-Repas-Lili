import { DB } from "./deps.ts";
import type { User, Restaurant, Reservation, Beneficiary, Association, BookingAgent } from "./schemas.ts";

// Création de la connexion SQLite
const db = new DB("app.db");

// Création des tables
db.execute(`
  -- Création de la table des utilisateurs
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Création de la table des rôles
  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  -- Création de la table de liaison entre utilisateurs et rôles
  CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
  );

  -- Création de la table des associations
  CREATE TABLE IF NOT EXISTS associations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Création de la table des restaurants
  CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    menu_url TEXT,
    cuisine_type_id INTEGER,
    meal_options TEXT, -- Stocké en JSON
    max_reservations INTEGER,
    min_reservation_delay INTEGER,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cuisine_type_id) REFERENCES cuisine_types(id)
  );

  -- Création de la table des réservations
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    beneficiary_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    association_id INTEGER NOT NULL,
    booking_agent_id INTEGER NOT NULL,
    reservation_date DATETIME NOT NULL,
    number_of_people INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'rejected', 'completed')),
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (association_id) REFERENCES associations(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_agent_id) REFERENCES booking_agents(id) ON DELETE CASCADE
  );

  -- Création de la table des bénéficiaires
  CREATE TABLE IF NOT EXISTS beneficiaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    birth_year INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Création de la table des agents de réservation
  CREATE TABLE IF NOT EXISTS booking_agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    association_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (association_id) REFERENCES associations(id) ON DELETE CASCADE
  );

  -- Création de la table des options de repas
  CREATE TABLE IF NOT EXISTS meal_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  -- Création de la table des types de cuisine
  CREATE TABLE IF NOT EXISTS cuisine_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`);

// Insertion des données par défaut
db.execute(`
  -- Insertion des rôles par défaut
  INSERT OR IGNORE INTO roles (name) VALUES 
    ('admin'),
    ('restaurateur'),
    ('association'),
    ('beneficiaire'),
    ('booking_agent');

  -- Insertion des options de repas par défaut
  INSERT OR IGNORE INTO meal_options (name) VALUES 
    ('halal'),
    ('vege'),
    ('vegan'),
    ('sans lactose'),
    ('sans gluten');

  -- Insertion des types de cuisine par défaut
  INSERT OR IGNORE INTO cuisine_types (name) VALUES 
    ('italienne'),
    ('orientale'),
    ('fast food'),
    ('française');
`);

export const dbClient = {
  // Utilisateurs
  async createUser(user: Omit<User, "id" | "created_at">) {
    const { name, email, password } = user;
    const result = db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING *",
      [name, email, password]
    );
    return result[0] as User;
  },

  async getUserByEmail(email: string) {
    const result = db.query("SELECT * FROM users WHERE email = ?", [email]);
    return result[0] as User | undefined;
  },

  // Restaurants
  async createRestaurant(restaurant: Omit<Restaurant, "id" | "created_at">) {
    const {
      name,
      address,
      description,
      image_url,
      menu_url,
      cuisine_type_id,
      meal_options,
      max_reservations,
      min_reservation_delay,
      user_id
    } = restaurant;

    const result = await db.execute({
      sql: `INSERT INTO restaurants (
        name, address, description, image_url, menu_url,
        cuisine_type_id, meal_options, max_reservations,
        min_reservation_delay, user_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *`,
      args: [
        name,
        address,
        description,
        image_url,
        menu_url,
        cuisine_type_id,
        JSON.stringify(meal_options),
        max_reservations,
        min_reservation_delay,
        user_id
      ]
    });
    return result.rows[0] as Restaurant;
  },

  async getRestaurants() {
    const result = await db.execute({
      sql: `SELECT *, json(meal_options) as meal_options
            FROM restaurants
            ORDER BY created_at DESC`
    });
    return result.rows as Restaurant[];
  },

  // Réservations
  async createReservation(reservation: Omit<Reservation, "id" | "created_at">) {
    const {
      beneficiary_id,
      restaurant_id,
      association_id,
      booking_agent_id,
      reservation_date,
      number_of_people,
      status,
      comments
    } = reservation;

    const result = await db.execute({
      sql: `INSERT INTO reservations (
        beneficiary_id, restaurant_id, association_id,
        booking_agent_id, reservation_date, number_of_people,
        status, comments
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *`,
      args: [
        beneficiary_id,
        restaurant_id,
        association_id,
        booking_agent_id,
        reservation_date.toISOString(),
        number_of_people,
        status,
        comments
      ]
    });
    return result.rows[0] as Reservation;
  },

  async getReservationsByRestaurant(restaurantId: number) {
    const result = await db.execute({
      sql: `SELECT * FROM reservations
            WHERE restaurant_id = ?
            ORDER BY reservation_date DESC`,
      args: [restaurantId]
    });
    return result.rows as Reservation[];
  },

  // Associations
  async createAssociation(association: Omit<Association, "id" | "created_at">) {
    const {
      name,
      address,
      contact_name,
      contact_email,
      contact_phone,
      user_id
    } = association;

    const result = await db.execute({
      sql: `INSERT INTO associations (
        name, address, contact_name,
        contact_email, contact_phone, user_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *`,
      args: [name, address, contact_name, contact_email, contact_phone, user_id]
    });
    return result.rows[0] as Association;
  },

  // Bénéficiaires
  async createBeneficiary(beneficiary: Omit<Beneficiary, "id" | "created_at">) {
    const {
      first_name,
      last_name,
      email,
      phone,
      birth_year
    } = beneficiary;

    const result = await db.execute({
      sql: `INSERT INTO beneficiaries (
        first_name, last_name, email,
        phone, birth_year
      )
      VALUES (?, ?, ?, ?, ?)
      RETURNING *`,
      args: [first_name, last_name, email, phone, birth_year]
    });
    return result.rows[0] as Beneficiary;
  },

  // Utilitaires
  async transaction<T>(callback: () => Promise<T>): Promise<T> {
    return await db.transaction(async (tx) => {
      return await callback();
    });
  }
}; 