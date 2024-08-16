'use client'

import { useSession } from 'next-auth/react'

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
import { AppointmentDetails } from '../appointment-details'
import { Button } from '../ui/button'
import { AppointmentActions } from './appointment-actions'
import { AppointmentStatus } from './appointment-status'

import { Search, X } from 'lucide-react'

export default function CustomTable() {
  const session = useSession()

  const { data: appointments } = useQuery<IAppointment[]>({
    queryKey: ['all-appointments-from-user'],
    queryFn: () => getAppointments(session.data?.user?.email as string),
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
            <TableHead className="w-[180px] text-muted">Realizado em</TableHead>
            <TableHead className="w-[140px] text-muted">Status</TableHead>
            <TableHead className="text-muted">Médico</TableHead>
            <TableHead className="text-muted">Paciente</TableHead>
            <TableHead className="w-[164px] text-muted"></TableHead>
            <TableHead className="w-[132px] text-muted"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments?.map((appointment, i) => {
            return (
              <TableRow
                key={i}
                className="border-muted-foreground hover:bg-muted-foreground/30"
              >
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <span className="sr-only">Detalhes da consulta</span>
                        <Search className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <AppointmentDetails />
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
                  <AppointmentActions status={appointment.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={
                      appointment.status === 'completed' ||
                      appointment.status === 'canceled'
                    }
                  >
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
