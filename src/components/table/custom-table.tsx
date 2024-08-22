'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAppointments, IAppointment } from '@/services/get-appointments'
import { Button } from '../ui/button'
import { AppointmentActions } from './appointment-actions'
import { AppointmentDetails } from './appointment-details'
import { AppointmentStatus } from './appointment-status'

import { Search } from 'lucide-react'

export default function CustomTable() {
  const [
    isOpenonCloseAppointmentDetailsModal,
    setIsOpenonCloseAppointmentDetailsModal,
  ] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const appointmentId = searchParams.get('appointmentId')
  const patientName = searchParams.get('patientName')
  const status = searchParams.get('status')

  const { data } = useQuery<IAppointment[]>({
    queryKey: ['all-appointments-from-user'],
    queryFn: () => getAppointments(session?.user.id as string),
  })

  const filteredData = data?.filter((item) => {
    const matchesAppointmentId = appointmentId
      ? item.id === appointmentId
      : true
    const matchesPatientName = patientName
      ? item.patient.includes(patientName)
      : true
    const matchesStatus =
      status && status !== 'all' ? item.status === status : true

    return matchesAppointmentId && matchesPatientName && matchesStatus
  })

  return (
    <div className="rounded-md border border-muted-foreground">
      <Table>
        <TableHeader>
          <TableRow className="border-muted-foreground hover:bg-transparent">
            <TableHead className="w-[64px] text-muted"></TableHead>
            <TableHead className="w-[140px] text-muted">
              Identificador
            </TableHead>
            <TableHead className="w-[180px] text-muted">Agendado</TableHead>
            <TableHead className="w-[140px] text-muted">Status</TableHead>
            <TableHead className="text-muted">Médico</TableHead>
            <TableHead className="text-muted">Paciente</TableHead>
            <TableHead className="w-[164px] text-muted"></TableHead>
            <TableHead className="w-[132px] text-muted"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((appointment, i) => {
            return (
              <TableRow
                key={i}
                className="border-muted-foreground hover:bg-muted-foreground/30"
              >
                <TableCell>
                  <Dialog
                    open={isOpenonCloseAppointmentDetailsModal}
                    onOpenChange={setIsOpenonCloseAppointmentDetailsModal}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <span className="sr-only">Detalhes da consulta</span>
                        <Search className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <AppointmentDetails
                      appointment={appointment}
                      onCloseAppointmentDetailsModal={() =>
                        setIsOpenonCloseAppointmentDetailsModal(false)
                      }
                    />
                  </Dialog>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-xs font-medium">
                  {appointment.id}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(appointment.Date, 'P', { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <AppointmentStatus status={appointment.status} />
                </TableCell>
                <TableCell className="font-medium">
                  {appointment.doctor}
                </TableCell>
                <TableCell className="font-medium">
                  {appointment.patient}
                </TableCell>
                <TableCell>
                  <AppointmentActions
                    id={appointment.id}
                    status={appointment.status}
                  />
                </TableCell>
                <TableCell>
                  <AppointmentActions
                    id={appointment.id}
                    status={appointment.status}
                    isCancelButton
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
