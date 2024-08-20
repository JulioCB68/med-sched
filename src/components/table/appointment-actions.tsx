import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  cancelAppointment,
  completeAppointment,
  confirmeAppointment,
} from '@/services/update-appointments-status'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { AppointmentStatus } from './appointment-status'

import { ArrowRight, X } from 'lucide-react'

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
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['all-appointments-from-user'],
      })
      toast.success(successMessage)
    },
    onError() {
      toast.error(errorMessage)
    },
  })

  const cancelAppointmentFn = useMutation(
    mutationConfig(
      () => cancelAppointment(id),
      'Consulta cancelada com sucesso!',
      'Erro ao cancelar consulta!',
    ),
  ).mutateAsync

  const confirmeAppointmentFn = useMutation(
    mutationConfig(
      () => confirmeAppointment(id),
      'Consulta confirmada com sucesso!',
      'Erro ao confirmar consulta.',
    ),
  ).mutateAsync

  const completeAppointmentFn = useMutation(
    mutationConfig(
      () => completeAppointment(id),
      'Consulta concluída com sucesso!',
      'Erro ao concluír consulta.',
    ),
  ).mutateAsync

  return (
    <>
      {!isCancelButton && status === 'pending' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => confirmeAppointmentFn()}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      )}

      {!isCancelButton && status === 'confirmed' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => completeAppointmentFn()}
        >
          <ArrowRight className="mr-2 h-3 w-3" />
          Concluir
        </Button>
      )}

      {!isCancelButton && status === 'completed' && null}

      {isCancelButton && (
        <Button
          variant="ghost"
          size="sm"
          disabled={status === 'completed' || status === 'canceled'}
          onClick={() => cancelAppointmentFn()}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      )}
    </>
  )
}
