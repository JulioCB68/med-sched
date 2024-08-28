'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { Controller, useForm } from 'react-hook-form'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createNewAppointment } from '@/services/create-appointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { CPFmask, RGmask } from '../utils/inputMask'
import { DatePicker } from './date-picker'
import { Loading } from './loading-state'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const appointmentSchema = z.object({
  doctorName: z.string(),
  patientName: z.string(),
  cpf: z.string(),
  rg: z.string(),
  reason: z.string(),
  date: z.date(),
})

export type AppointmentSchema = z.infer<typeof appointmentSchema>

interface IAppointmentCreationModalProps {
  onCloseAppointmentCreationModal: () => void
}

export function AppointmentCreationModal({
  onCloseAppointmentCreationModal,
}: IAppointmentCreationModalProps) {
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const { mutateAsync: crateAppointment } = useMutation({
    mutationFn: createNewAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-appointments-from-user'],
      })
      toast.success('Consulta agendada com sucesso.')
      onCloseAppointmentCreationModal()
      reset()
    },
    onError() {
      toast.error('Erro ao agendar consulta.')
    },
  })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  })

  function handleCreateNewAppointment(data: AppointmentSchema) {
    const newData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ''),
      rg: data.rg.replace(/\D/g, ''),
    }
    crateAppointment({
      userId: session?.user.id as string,
      ...newData,
    })
  }

  return (
    <DialogContent>
      <DialogHeader className="text-muted">
        <DialogTitle>Agendar consulta</DialogTitle>
        <DialogDescription>
          Por favor preencha os seguintes dados para agendar
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(handleCreateNewAppointment)}
        className="space-y-4 text-muted"
      >
        <div className="space-y-2">
          <Label>Nome do paciente</Label>
          <Input {...register('patientName')} />
        </div>
        <div className="space-y-2">
          <Label>Nome do Médico</Label>
          <Input {...register('doctorName')} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-full space-y-2">
            <Label>RG</Label>
            <Input
              {...register('rg')}
              onChange={(e) => setValue('rg', RGmask(e))}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>CPF</Label>
            <Input
              {...register('cpf')}
              onChange={(e) => setValue('cpf', CPFmask(e))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Motivo</Label>
          <Input {...register('reason')} />
        </div>
        <div className="flex flex-col space-y-2 pb-2">
          <Label>Data</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
        </div>

        {!isSubmitting && (
          <Button type="submit" className="w-full">
            Agendar
          </Button>
        )}
        {isSubmitting && <Loading text="agendar" />}
      </form>
    </DialogContent>
  )
}
