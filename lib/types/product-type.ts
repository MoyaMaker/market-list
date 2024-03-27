import { z } from "zod";
import { ProductSchema, FormProductSchema } from "../schemas/product-schema";

export type ProductType = z.infer<typeof ProductSchema>;

export type FormProductType = z.infer<typeof FormProductSchema>;
