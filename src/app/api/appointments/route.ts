import { NextResponse } from 'next/server'

import { db } from '@/lib/prisma'

export async function GET() {
  const appointments = await db.appointment.findMany()

  return NextResponse.json(appointments, {
    status: 200,
  })
}
