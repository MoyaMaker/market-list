import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request: Request) {
  const { name, unit_price } = await request.json();

  if (!name || !unit_price) {
    return NextResponse.json(
      {
        code: "BAD_REQUEST",
        message: "Faltan valores en el cuerpo",
      },
      {
        status: 400,
      }
    );
  }

  const newProduct = await db.product.create({
    data: {
      name,
      unit_price,
    },
  });

  return NextResponse.json({
    message: "Producto creado",
    product: newProduct,
  });
}
