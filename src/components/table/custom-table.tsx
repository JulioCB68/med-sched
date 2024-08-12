import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { Button } from '../ui/button'

export default function CustomTable() {
  return (
    <div className="rounded-md border border-muted-foreground">
      <Table>
        <TableHeader>
          <TableRow className="border-muted-foreground hover:bg-transparent">
            <TableHead className="w-[64px] text-muted"></TableHead>
            <TableHead className="w-[140px] text-muted">
              Identificador
            </TableHead>
            <TableHead className="w-[180px] text-muted">Realizado há</TableHead>
            <TableHead className="w-[140px] text-muted">Status</TableHead>
            <TableHead className="text-muted">Médico</TableHead>
            <TableHead className="text-muted">Paciente</TableHead>
            <TableHead className="w-[164px] text-muted"></TableHead>
            <TableHead className="w-[132px] text-muted"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <TableRow
                key={i}
                className="border-muted-foreground hover:bg-muted-foreground/30"
              >
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Search className="h-3 w-3" />
                    <span className="sr-only">Detalhes da consulta</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  821e78f7asdhdf128h
                </TableCell>
                <TableCell className="text-muted-foreground">
                  há 15 minutos
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  Andrew Russell Garfield
                </TableCell>
                <TableCell className="font-medium">
                  George Timothy Clooney
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
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
