import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const id = params.id;
  const { quantity } = await request.json();

  const itemUpdated = await db.cart.update({
    include: {
      product: true,
    },
    data: {
      quantity,
    },
    where: {
      product_id: id,
    },
  });

  return NextResponse.json({
    message: "Actualizado con éxito",
    cartItem: itemUpdated,
  });
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const id = params.id;

  const deletedItem = await db.cart.delete({
    where: {
      product_id: id,
    },
  });

  if (deletedItem) {
    return new Response(null, { status: 204 });
  }

  return NextResponse.json({
    message: "No se eliminó el producto",
  });
}
