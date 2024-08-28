import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const appointments = await db.appointment.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(appointments, { status: 200 });
}
