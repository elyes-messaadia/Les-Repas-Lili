import { createClient } from "https://esm.sh/@libsql/client@0.5.6/web";

// Initialisation de la connexion LibSQL
const db = createClient({
  url: "file:recipes.db",
});

// Création de la table si elle n'existe pas
await db.execute(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  created_at?: string;
}

export const dbClient = {
  async getRecipes(): Promise<Recipe[]> {
    const result = await db.execute("SELECT * FROM recipes ORDER BY created_at DESC");
    return result.rows as Recipe[];
  },

  async getRecipeById(id: number): Promise<Recipe | undefined> {
    const result = await db.execute({
      sql: "SELECT * FROM recipes WHERE id = ?",
      args: [id]
    });
    return result.rows[0] as Recipe | undefined;
  },

  async createRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
    const result = await db.execute({
      sql: "INSERT INTO recipes (title, description, ingredients, instructions) VALUES (?, ?, ?, ?) RETURNING *",
      args: [recipe.title, recipe.description, recipe.ingredients, recipe.instructions]
    });
    return result.rows[0] as Recipe;
  }
}; 