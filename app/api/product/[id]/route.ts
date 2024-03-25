import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleteProduct = await db.product.delete({
    where: {
      id: params.id,
    },
  });

  if (deleteProduct) {
    return new Response(null, { status: 204 });
  }

  return NextResponse.json({
    message: "No se eliminó ningún dato",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { name, unit_price } = await request.json();

  const updatedProduct = await db.product.update({
    data: {
      name,
      unit_price,
    },
    where: {
      id: params.id,
    },
  });

  if (!updatedProduct) {
    return NextResponse.json(
      {
        message: "No puedo actualizar este producto",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    message: "Producto actualizado",
    product: updatedProduct,
  });
}
