import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  unit_price: z.number().default(0),
  created_at: z.date(),
  updated_at: z.date(),
});

export const FormProductSchema = ProductSchema.pick({
  name: true,
  description: true,
  unit_price: true,
});

export const CartItemSchema = z.object({
  product: ProductSchema.pick({
    id: true,
    name: true,
    unit_price: true,
  }),
  quantity: z.number().default(1),
  price: z.number().default(0),
});
