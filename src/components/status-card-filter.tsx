import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideProps } from 'lucide-react'

interface IStatusCardFilterProps {
  type: 'appointments' | 'pending' | 'cancelled'
  total: number
  icon: React.FC<LucideProps>
}

const STATUS_CLASSES = {
  appointments: 'bg-appointments',
  pending: 'bg-pending',
  cancelled: 'bg-cancelled',
}

const STATUS_LABEL = {
  appointments: 'Confirmadas',
  pending: 'Pendentes',
  cancelled: 'Canceladas',
}

const STATUS_COLORS = {
  appointments: 'text-amber-500',
  pending: 'text-blue-500',
  cancelled: 'text-red-500',
}

export default function StatusCardFilter({
  type,
  total,
  icon: Icon,
}: IStatusCardFilterProps) {
  return (
    <div className={`${STATUS_CLASSES[type]} status-card`}>
      <Card className="border-none bg-transparent">
        <CardHeader className="flex-row items-center space-x-2 space-y-0 pb-2">
          <Icon className={`h-4 w-4 ${STATUS_COLORS[type]}`} />
          <CardTitle className="text-base font-semibold text-muted">
            {total}
          </CardTitle>
        </CardHeader>
        <CardContent className="w-5 space-y-1 text-muted">
          Consultas {STATUS_LABEL[type]}(mês)
        </CardContent>
      </Card>
    </div>
  )
}
