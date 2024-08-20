import {
  cancelAppointment,
  completeAppointment,
  confirmeAppointment,
} from '@/services/update-appointments-status'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { AppointmentStatus } from './appointment-status'

export interface AppointmentStatusProps {
  id: string
  isCancelButton?: boolean
  status: AppointmentStatus
}

export function AppointmentActions({
  status,
  id,
  isCancelButton,
}: AppointmentStatusProps) {
  const queryClient = useQueryClient()

  const mutationConfig = (
    action: () => Promise<void>,
    successMessage: string,
    errorMessage: string,
  ) => ({
    mutationFn: action,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-appointments-from-user'],
      })
      toast.success(successMessage)
    },
    onError: () => {
      toast.error(errorMessage)
    },
  })

  const actionMap = {
    pending: {
      label: 'Aprovar',
      mutationFn: useMutation(
        mutationConfig(
          () => confirmeAppointment(id),
          'Consulta confirmada com sucesso!',
          'Erro ao confirmar consulta.',
        ),
      ).mutateAsync,
      icon: ArrowRight,
    },
    confirmed: {
      label: 'Concluir',
      mutationFn: useMutation(
        mutationConfig(
          () => completeAppointment(id),
          'Consulta concluída com sucesso!',
          'Erro ao concluir consulta.',
        ),
      ).mutateAsync,
      icon: ArrowRight,
    },
    cancel: {
      label: 'Cancelar',
      mutationFn: useMutation(
        mutationConfig(
          () => cancelAppointment(id),
          'Consulta cancelada com sucesso!',
          'Erro ao cancelar consulta!',
        ),
      ).mutateAsync,
      icon: X,
    },
  }

  const renderActionButton = (actionKey: keyof typeof actionMap) => {
    const action = actionMap[actionKey]
    return (
      <Button
        variant={actionKey === 'cancel' ? 'ghost' : 'outline'}
        size="sm"
        onClick={() => action.mutationFn()}
      >
        <action.icon className="mr-2 h-3 w-3" />
        {action.label}
      </Button>
    )
  }

  if (isCancelButton) {
    return status === 'confirmed' || status === 'pending'
      ? renderActionButton('cancel')
      : null
  }

  if (status === 'pending') return renderActionButton('pending')
  if (status === 'confirmed') return renderActionButton('confirmed')

  return null
}
