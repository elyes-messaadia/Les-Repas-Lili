import { Hono, cors, serve } from "./deps.ts";
import { RecipeSchema } from "./schemas.ts";
import { db } from "./db.ts";

const app = new Hono();

// CORS middleware
app.use("/*", cors());

// Routes
app.get("/api/recipes", async (c) => {
  try {
    const recipes = await db.getRecipes();
    return c.json(recipes);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/api/recipes", async (c) => {
  try {
    const body = await c.req.json();
    const validatedRecipe = RecipeSchema.parse(body);
    const newRecipe = await db.createRecipe(validatedRecipe);
    return c.json(newRecipe, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Start server
const port = 8000;
console.log(`Server running on http://localhost:${port}`);

serve(app.fetch, { port }); 