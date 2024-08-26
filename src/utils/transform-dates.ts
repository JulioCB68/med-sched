import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function geDateInfo(date: Date): string {
  const currentDate = new Date()
  const today = format(currentDate, 'P', { locale: ptBR })
  const appointmentDate = format(date, 'P', { locale: ptBR })

  if (appointmentDate < today) {
    return 'Realizado em'
  } else {
    return 'Agendado para'
  }
}
