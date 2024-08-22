'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { createNewAppointment } from '@/services/create-appointment'
import { deleteAppointment } from '@/services/delete-appointment'
import { IAppointment } from '@/services/get-appointments'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AppointmentSchema } from '../appointment-creation-modal'
import { DatePicker } from '../date-picker'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { AppointmentStatus } from './appointment-status'

interface IAppointmentDetailsProps {
  appointment: IAppointment
  onCloseAppointmentDetailsModal: () => void
}

export function AppointmentDetails({
  appointment,
  onCloseAppointmentDetailsModal,
}: IAppointmentDetailsProps) {
  const [isEditForm, setIsEditForm] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const { mutateAsync: editAppointment } = useMutation({
    mutationFn: createNewAppointment,
    onSuccess() {
      toast.success('Consulta editada com sucesso.')
      onCloseAppointmentDetailsModal()
    },
    onError() {
      toast.error('Erro ao editar consulta.')
    },
  })

  const { mutateAsync: deleteAppointmentFn } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess() {
      onCloseAppointmentDetailsModal()
      toast.success('Consulta deletada com sucesso.')
      queryClient.invalidateQueries({
        queryKey: ['all-appointments-from-user'],
      })
    },
    onError() {
      toast.error('Erro ao deletar consulta.')
    },
  })

  const { register, control, handleSubmit } = useForm<AppointmentSchema>()

  function handleEditAppointment(data: AppointmentSchema) {
    editAppointment(data)
  }

  function geDateInfo(date: Date): string {
    const currentDate = new Date()
    const today = format(currentDate, 'P', { locale: ptBR })
    const appointmentDate = format(date, 'P', { locale: ptBR })

    if (appointmentDate < today) {
      return 'Realizado em'
    } else {
      return 'Agendado para'
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="text-muted">
        <DialogTitle>Consulta: {appointment.id}</DialogTitle>
        <DialogDescription>Detalhes da consulta</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleEditAppointment)}>
        <Table className="text-muted">
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell>Status</TableCell>
              <TableCell className="flex justify-end disabled:text-right">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select onValueChange={onChange} disabled={!isEditForm}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            <AppointmentStatus status={appointment.status} />
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <AppointmentStatus status="pending" />
                        </SelectItem>
                        <SelectItem value="confirmed">
                          <AppointmentStatus status="confirmed" />
                        </SelectItem>
                        <SelectItem value="completed">
                          <AppointmentStatus status="completed" />
                        </SelectItem>
                        <SelectItem value="canceled">
                          <AppointmentStatus status="canceled" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>Médico</TableCell>
              <TableCell className="flex justify-end">
                <Input
                  placeholder={appointment.doctor}
                  className="placeholder:text-white disabled:disabled:text-right"
                  {...register('doctorName')}
                  disabled={!isEditForm}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>Paciente</TableCell>
              <TableCell className="flex justify-end">
                <Input
                  placeholder={appointment.patient}
                  className="placeholder:text-white disabled:text-right"
                  {...register('patientName')}
                  disabled={!isEditForm}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>RG</TableCell>
              <TableCell className="flex justify-end">
                <Input
                  placeholder={appointment.rg}
                  className="placeholder:text-white disabled:text-right"
                  {...register('rg')}
                  disabled={!isEditForm}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>CPF</TableCell>
              <TableCell className="flex justify-end">
                <Input
                  placeholder={appointment.cpf}
                  className="placeholder:text-white disabled:text-right"
                  {...register('cpf')}
                  disabled={!isEditForm}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>Descrição</TableCell>
              <TableCell className="flex justify-end">
                <Textarea
                  placeholder={appointment.reason}
                  className="placeholder:text-white disabled:border-none disabled:text-right"
                  {...register('reason')}
                  disabled={!isEditForm}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>{geDateInfo(appointment.Date)}</TableCell>
              <TableCell className="flex justify-end">
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { name, onChange, onBlur, ref } }) => (
                    <DatePicker
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={onChange}
                      value={appointment.Date}
                      disabled={!isEditForm}
                    />
                  )}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
      {isEditForm === false ? (
        <Button onClick={() => setIsEditForm(true)} variant={'secondary'}>
          Editar
        </Button>
      ) : (
        <Button>Salvar</Button>
      )}
      <Button
        variant={'destructive'}
        onClick={() => deleteAppointmentFn(appointment.id)}
      >
        Excluir
      </Button>
    </DialogContent>
  )
}
