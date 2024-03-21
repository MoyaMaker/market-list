import { z } from "zod";
import { ProductSchema, FormProductSchema } from "../schemas/product";

export type Product = z.infer<typeof ProductSchema>;

export type FormProduct = z.infer<typeof FormProductSchema>;
