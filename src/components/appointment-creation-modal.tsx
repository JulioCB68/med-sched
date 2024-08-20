'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { Controller, useForm } from 'react-hook-form'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createNewAppointment } from '@/services/create-appointment'
import { toast } from 'sonner'
import { z } from 'zod'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const createNewAppointmentSchema = z.object({
  doctorName: z.string(),
  patientName: z.string(),
  rg: z.string(),
  cpf: z.string(),
  reason: z.string(),
  date: z.date(),
})

type CreateNewAppointmentSchema = z.infer<typeof createNewAppointmentSchema>

export function AppointmentCreationModal() {
  const { data: session } = useSession()

  const { mutateAsync: crateAppointment } = useMutation({
    mutationFn: createNewAppointment,
    onSuccess() {
      toast.success('Consulta agendada com sucesso.')
    },
    onError() {
      toast.error('Erro ao agendar consulta.')
    },
  })

  const { register, control, handleSubmit } =
    useForm<CreateNewAppointmentSchema>()

  function handleCreateNewAppointment(data: CreateNewAppointmentSchema) {
    crateAppointment({ userId: session?.user.id as string, ...data })
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
            <Input {...register('rg')} />
          </div>
          <div className="w-full space-y-2">
            <Label>CPF</Label>
            <Input {...register('cpf')} />
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

        <Button type="submit" className="w-full">
          Agendar
        </Button>
      </form>
    </DialogContent>
  )
}
