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
