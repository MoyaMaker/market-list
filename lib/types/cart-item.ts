import { z } from "zod";
import { CartItemSchema } from "../schemas/cart-item";

export type CartItem = z.infer<typeof CartItemSchema>;
