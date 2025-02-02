import { Application, Router } from "./deps.ts";
import { CreateUserSchema, CreateRestaurantSchema, CreateReservationSchema } from "./schemas.ts";
import { dbClient } from "./db.ts";

const app = new Application();
const router = new Router();

// Middleware CORS
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

// Routes Utilisateurs
router.post("/api/users", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    const userData = CreateUserSchema.parse(body);
    const user = await dbClient.createUser(userData);
    ctx.response.body = user;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
  }
});

// Routes Restaurants
router.get("/api/restaurants", async (ctx) => {
  try {
    const restaurants = await dbClient.getRestaurants();
    ctx.response.body = restaurants;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

router.post("/api/restaurants", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    const restaurantData = CreateRestaurantSchema.parse(body);
    const restaurant = await dbClient.createRestaurant(restaurantData);
    ctx.response.body = restaurant;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
  }
});

// Routes Réservations
router.post("/api/reservations", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    const reservationData = CreateReservationSchema.parse(body);
    const reservation = await dbClient.createReservation(reservationData);
    ctx.response.body = reservation;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
  }
});

router.get("/api/restaurants/:id/reservations", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const reservations = await dbClient.getReservationsByRestaurant(id);
    ctx.response.body = reservations;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// Configuration de l'application
app.use(router.routes());
app.use(router.allowedMethods());

// Démarrage du serveur
const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port }); 