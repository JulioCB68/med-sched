import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id } = await req.json();

  const appointment = await db.appointment.findUnique({
    where: {
      id,
    },
  });

  if (!appointment) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 },
    );
  }

  const updateAppointment = await db.appointment.update({
    where: {
      id,
    },
    data: {
      status: "canceled",
    },
  });

  return NextResponse.json(updateAppointment, { status: 200 });
}
