import { api } from '@/lib/axios'

export interface IAppointment {
  Date: string
  createdAt: string
  doctor: string
  id: string
  patient: string
  status: 'pending' | 'confirmed' | 'completed' | 'canceled'
  updatedAt: string
  userId: string
}

export async function getAppointments(): Promise<IAppointment[]> {
  const response = await api.get('/appointments')

  const appointments: IAppointment[] = response.data

  const sortedAppointments = appointments.sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') {
      return -1
    }
    if (a.status !== 'pending' && b.status === 'pending') {
      return 1
    }
    return 0
  })

  return sortedAppointments
}
