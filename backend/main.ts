import { serve } from "./deps.ts";
import { RecipeSchema } from "./schemas.ts";
import { db } from "./db.ts";

const handler = async (req: Request): Promise<Response> => {
  const headers = new Headers({
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  const url = new URL(req.url);

  try {
    // GET /api/recipes
    if (url.pathname === "/api/recipes" && req.method === "GET") {
      const recipes = await db.getRecipes();
      return new Response(JSON.stringify(recipes), { headers });
    }

    // POST /api/recipes
    if (url.pathname === "/api/recipes" && req.method === "POST") {
      const body = await req.json();
      const validatedRecipe = RecipeSchema.parse(body);
      const newRecipe = await db.createRecipe(validatedRecipe);
      return new Response(JSON.stringify(newRecipe), { headers });
    }

    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers }
    );
  }
};

console.log("Server running on http://localhost:8000");
await serve(handler, { port: 8000 }); 