import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, doctorName, patientName, rg, cpf, reason, date } =
    await req.json()

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }

  const createNewAppointment = await db.appointment.create({
    data: {
      doctor: doctorName,
      patient: patientName,
      Date: date,
      status: 'pending',
      rg,
      cpf,
      reason,
      userId,
    },
  })

  return NextResponse.json(createNewAppointment, { status: 201 })
}
