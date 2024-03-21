import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
  const products = await db.product.findMany();

  return NextResponse.json({
    message: "Productos encontrados",
    products,
  });
}
