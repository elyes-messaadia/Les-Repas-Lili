import { Client } from "./deps.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Charge les variables d'environnement
const env = await config();

const client = new Client({
  user: env.POSTGRES_USER || "postgres",
  database: env.POSTGRES_DB || "recipes_db",
  hostname: env.POSTGRES_HOST || "localhost",
  port: Number(env.POSTGRES_PORT) || 5432,
  password: env.POSTGRES_PASSWORD,
});

await client.connect();

export const db = {
  async getRecipes() {
    const result = await client.queryObject`
      SELECT * FROM recipes ORDER BY created_at DESC
    `;
    return result.rows;
  },

  async getRecipeById(id: number) {
    const result = await client.queryObject`
      SELECT * FROM recipes WHERE id = ${id}
    `;
    return result.rows[0];
  },

  async createRecipe(recipe: Omit<Recipe, "id">) {
    const result = await client.queryObject`
      INSERT INTO recipes (title, description, ingredients, instructions)
      VALUES (${recipe.title}, ${recipe.description}, ${recipe.ingredients}, ${recipe.instructions})
      RETURNING *
    `;
    return result.rows[0];
  }
}; 