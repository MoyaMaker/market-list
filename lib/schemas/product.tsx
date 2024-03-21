import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  unit_price: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export const FormProductSchema = ProductSchema.pick({
  name: true,
  unit_price: true,
});
