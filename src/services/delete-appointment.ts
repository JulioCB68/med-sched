import { api } from '@/lib/axios'

export async function deleteAppointment(id: string) {
  await api.delete(`/appointments/delete/${id}`)
}
