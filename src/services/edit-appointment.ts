import { api } from "@/lib/axios";

interface EditAppointmentParams {
  id: string;
  status: string;
  doctorName: string;
  patientName: string;
  rg: string;
  cpf: string;
  reason: string;
  date: Date;
}

export async function editAppointment({
  id,
  status,
  doctorName,
  patientName,
  rg,
  cpf,
  reason,
  date,
}: EditAppointmentParams) {
  await api.patch(`/appointments/update/${id}`, {
    id,
    doctorName,
    status,
    patientName,
    rg,
    cpf,
    reason,
    date,
  });
}
