import { z } from "./deps.ts";

export const RecipeSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  createdAt: z.date().optional()
});

export type Recipe = z.infer<typeof RecipeSchema>; 