'use client'

import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { deleteAppointment } from '@/services/delete-appointment'
import { editAppointment } from '@/services/edit-appointment'
import { IAppointment } from '@/services/get-appointments'
import { geDateInfo } from '@/utils/transform-dates'
import { toast } from 'sonner'
import {
  CPFmask,
  CPFmaskForPlaceholder,
  RGmask,
  RGmaskForPlaceholder,
} from '../../utils/inputMask'
import { DatePicker } from '../date-picker'
import { Loading } from '../loading-state'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { AppointmentStatus } from './appointment-status'

export const appointmentDetailsSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'canceled']),
  doctorName: z.string(),
  patientName: z.string(),
  cpf: z.string(),
  rg: z.string(),
  reason: z.string(),
  date: z.date(),
})

export type AppointmentDetailsSchema = z.infer<typeof appointmentDetailsSchema>
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

  const { mutateAsync: editAppointmentFn } = useMutation({
    mutationFn: editAppointment,
    onSuccess() {
      onCloseAppointmentDetailsModal()
      toast.success('Consulta editada com sucesso.')
      queryClient.invalidateQueries({
        queryKey: ['all-appointments-from-user'],
      })
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

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<AppointmentDetailsSchema>({
    defaultValues: {
      doctorName: appointment.doctor,
      patientName: appointment.patient,
      date: appointment.Date,
      cpf: appointment.cpf,
      rg: appointment.rg,
      reason: appointment.reason,
      status: appointment.status,
    },
  })

  function handleEditAppointment(data: AppointmentDetailsSchema) {
    editAppointmentFn({ id: appointment.id, ...data })
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
                  placeholder={RGmaskForPlaceholder(appointment.rg)}
                  className="placeholder:text-white disabled:text-right"
                  {...register('rg')}
                  disabled={!isEditForm}
                  onChange={(e) => setValue('rg', RGmask(e))}
                />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableCell>CPF</TableCell>
              <TableCell className="flex justify-end">
                <Input
                  placeholder={CPFmaskForPlaceholder(appointment.cpf)}
                  className="placeholder:text-white disabled:text-right"
                  {...register('cpf')}
                  disabled={!isEditForm}
                  onChange={(e) => setValue('cpf', CPFmask(e))}
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
                  render={({
                    field: { name, onChange, onBlur, ref, value },
                  }) => (
                    <DatePicker
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={onChange}
                      value={value}
                      disabled={!isEditForm}
                    />
                  )}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {!isEditForm && (
          <Button
            type="button"
            className="w-full"
            onClick={() => setIsEditForm(true)}
            variant={'secondary'}
          >
            Editar
          </Button>
        )}
        {isEditForm && (
          <Button type="submit" className="w-full">
            Salvar
          </Button>
        )}
        {isEditForm && isSubmitting && <Loading text="salvar" />}
      </form>
      <Button
        variant={'destructive'}
        onClick={() => deleteAppointmentFn(appointment.id)}
      >
        Excluir
      </Button>
    </DialogContent>
  )
}
