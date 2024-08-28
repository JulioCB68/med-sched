import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id, status, doctorName, patientName, rg, cpf, reason, date } =
    await req.json();

  const appointment = await db.appointment.findUnique({
    where: {
      id,
    },
  });

  if (!appointment) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 400 },
    );
  }

  const createNewAppointment = await db.appointment.update({
    where: {
      id,
    },
    data: {
      doctor: doctorName,
      patient: patientName,
      Date: date,
      status,
      rg,
      cpf,
      reason,
    },
  });

  return NextResponse.json(createNewAppointment, { status: 200 });
}
