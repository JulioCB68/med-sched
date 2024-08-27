import { getGoogleOAuthToken } from '@/lib/google'
import { db } from '@/lib/prisma'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const user = await db.user.findFirstOrThrow({
    where: {
      Appointment: {
        some: {
          id,
        },
      },
    },
  })

  async function listEvents() {
    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user.id),
    })

    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        maxResults: 50,
        orderBy: 'startTime',
        singleEvents: true,
      })

      const events = response.data.items
      if (events && events.length) {
        events.forEach((event) => {
          console.log(`Event ID: ${event.id}, Summary: ${event.summary}`)
        })
      } else {
        console.log('No events found.')
      }
    } catch (error) {
      console.error('Error listing events:', error)
    }
  }

  await listEvents()

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: '33crlllr5jq9cht60o63c5oev4',
    })

    const deleteAppointment = await db.appointment.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(deleteAppointment, { status: 200 })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 },
    )
  }
}
