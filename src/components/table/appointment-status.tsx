export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'canceled'

export interface AppointmentStatusProps {
  status: AppointmentStatus
}

export const appointmentStatusMap: Record<AppointmentStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  completed: 'Concluído',
  canceled: 'Cancelado',
}

export function AppointmentStatus({ status }: AppointmentStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {status === 'completed' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {status === 'confirmed' && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {appointmentStatusMap[status]}
      </span>
    </div>
  )
}
