import { z } from "zod";
import { ProductSchema } from "./product-schema";

export const CartItemSchema = z.object({
  selected: z.boolean().default(false),
  product: ProductSchema.pick({
    id: true,
    name: true,
    unit_price: true,
  }),
  quantity: z.number().default(1),
});
