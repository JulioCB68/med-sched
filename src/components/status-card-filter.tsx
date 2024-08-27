'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IAppointment, getAppointments } from '@/services/get-appointments'

interface IStatusCardFilterProps {
  type: 'completed' | 'pending' | 'canceled'
  icon: React.ReactNode
}

const STATUS_CLASSES = {
  completed: 'bg-appointments',
  pending: 'bg-pending',
  canceled: 'bg-cancelled',
}

const STATUS_LABEL = {
  completed: 'Concluídas',
  pending: 'Pendentes',
  canceled: 'Canceladas',
}

const STATUS_COLORS = {
  completed: 'text-emerald-500',
  pending: 'text-slate-400',
  canceled: 'text-rose-500',
}

export default function StatusCardFilter({
  type,
  icon,
}: IStatusCardFilterProps) {
  const { data: session } = useSession()

  const { data: appointments } = useQuery<IAppointment[]>({
    queryKey: ['all-appointments-from-user'],
    queryFn: () => getAppointments(session?.user.id as string),
    enabled: !!session,
  })

  function totalAppointments(status: string): number | undefined {
    const appointment = appointments?.filter((item) => item.status === status)
    return appointment?.length
  }

  return (
    <div className={`${STATUS_CLASSES[type]} status-card`}>
      <Card className="border-none bg-transparent">
        <CardHeader className="flex-row items-center space-x-2 space-y-0 pb-2">
          <div className={`h-4 w-4 ${STATUS_COLORS[type]}`}>{icon}</div>
          <CardTitle className="text-base font-semibold text-muted">
            {totalAppointments(type)}
          </CardTitle>
        </CardHeader>
        <CardContent className="w-5 space-y-1 text-muted">
          Consultas {STATUS_LABEL[type]}(mês)
        </CardContent>
      </Card>
    </div>
  )
}
