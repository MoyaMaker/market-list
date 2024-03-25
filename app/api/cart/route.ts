import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await db.cart.findMany({
    include: {
      product: true,
    },
  });

  return NextResponse.json({
    message: "Elementos en carrito",
    items,
  });
}

export async function POST(request: Request) {
  const { product_id, quantity } = await request.json();

  const cartItem = await db.cart.create({
    data: {
      product_id,
      quantity,
    },
  });

  return NextResponse.json({
    message: "Producto añadido",
    cartItem,
  });
}
