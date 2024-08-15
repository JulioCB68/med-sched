import { Button } from '../ui/button'
import { AppointmentStatusProps } from './appointment-status'

import { ArrowRight } from 'lucide-react'

export function AppointmentActions({ status }: AppointmentStatusProps) {
  return (
    <>
      {status === 'pending' && (
        <Button variant="outline" size="sm">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      )}

      {status === 'confirmed' && (
        <Button variant="outline" size="sm">
          <ArrowRight className="mr-2 h-3 w-3" />
          Concluir
        </Button>
      )}

      {status === 'completed' && (
        <Button variant="outline" size="sm" disabled={status === 'completed'}>
          <ArrowRight className="mr-2 h-3 w-3" />
          Concluir
        </Button>
      )}

      {status === 'canceled' && <> </>}
    </>
  )
}
