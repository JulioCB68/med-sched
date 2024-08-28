import { getGoogleOAuthToken } from "@/lib/google";
import { db } from "@/lib/prisma";
import { addHours, format } from "date-fns";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, doctorName, patientName, rg, cpf, reason, date } =
    await req.json();

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const createNewAppointment = await db.appointment.create({
    data: {
      doctor: doctorName,
      patient: patientName,
      Date: date,
      status: "pending",
      rg,
      cpf,
      reason,
      userId,
    },
  });

  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOAuthToken(userId),
  });

  const startDate = new Date(date);
  const endDate = addHours(startDate, 1);

  await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Appointment: ${patientName}`,
      description: reason,
      start: {
        dateTime: format(startDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      },
      end: {
        dateTime: format(endDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      },
      attendees: [{ email: user.email, displayName: patientName }],
    },
  });

  return NextResponse.json(createNewAppointment, { status: 201 });
}
