import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const deleteAppointment = await db.appointment.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(deleteAppointment, { status: 200 })
}
