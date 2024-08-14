import { api } from '@/lib/axios'

export interface IAppointment {
  Date: string
  createdAt: string
  doctor: string
  id: string
  patient: string
  status: 'Pendente' | 'Confirmado' | 'Cancelado'
  updatedAt: string
  userId: string
}

export async function getAppointments(): Promise<IAppointment[]> {
  const response = await api.get('/appointments')
  return response.data
}
