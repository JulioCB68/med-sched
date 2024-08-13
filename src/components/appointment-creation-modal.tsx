import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function AppointmentCreationModal() {
  return (
    <DialogContent>
      <DialogHeader className="text-muted">
        <DialogTitle>Agendar consulta</DialogTitle>
        <DialogDescription>
          Por favor preencha os seguintes dados para agendar
        </DialogDescription>
      </DialogHeader>

      <form action="" className="space-y-4 text-muted">
        <div className="space-y-2">
          <Label>Nome do paciente</Label>
          <Input />
        </div>
        <div className="space-y-2">
          <Label>Nome do Médico</Label>
          <Input />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-full space-y-2">
            <Label>RG</Label>
            <Input />
          </div>
          <div className="w-full space-y-2">
            <Label>CPF</Label>
            <Input />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Motivo</Label>
          <Input />
        </div>
        <div className="flex flex-col space-y-2 pb-2">
          <Label>Data</Label>
          <DatePicker />
        </div>
        <Button className="w-full">Agendar</Button>
      </form>
    </DialogContent>
  )
}
