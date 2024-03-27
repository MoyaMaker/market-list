import { z } from "zod";
import { CartItemSchema } from "../schemas/cart-item-schema";

export type CartItemType = z.infer<typeof CartItemSchema>;
