import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function AppointmentDetails() {
  return (
    <DialogContent>
      <DialogHeader className="text-muted">
        <DialogTitle>Consulta: 1827fy2827d6h</DialogTitle>
        <DialogDescription>Detalhes da consulta</DialogDescription>
      </DialogHeader>

      <Table className="text-muted">
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell>Status</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="font-medium">Pendente</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell>Paciente</TableCell>
            <TableCell className="flex justify-end">
              Diego Schell Fernandes
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell>Telefone</TableCell>
            <TableCell className="flex justify-end">(47) 99999-9999</TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell>E-mail</TableCell>
            <TableCell className="flex justify-end">
              diego@rocketseat.com.br
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell>Realizado em</TableCell>
            <TableCell className="flex justify-end">31/01/2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogContent>
  )
}
