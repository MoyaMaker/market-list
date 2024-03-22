import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";

  const products = await db.product.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json({
    message: "Productos encontrados",
    products,
  });
}
