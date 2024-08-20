import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, id: string) {
  const appointment = await db.appointment.findUnique({
    where: {
      id,
    },
  })

  if (!appointment) {
    return NextResponse.json(
      { error: 'Appointment not found' },
      { status: 400 },
    )
  }

  const deleteAppointment = await db.appointment.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(deleteAppointment, { status: 204 })
}
