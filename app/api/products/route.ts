import { NextResponse } from "next/server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "No estás autorizado",
        },
        {
          status: 401,
        }
      );
    }

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
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Couldn't find products",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
