import { api } from "@/lib/axios";

interface CreateAppointmentParams {
  userId: string;
  doctorName: string;
  patientName: string;
  rg: string;
  cpf: string;
  reason: string;
  date: Date;
}

export async function createNewAppointment({
  userId,
  doctorName,
  patientName,
  rg,
  cpf,
  reason,
  date,
}: CreateAppointmentParams) {
  await api.post("/appointments/create", {
    userId,
    doctorName,
    patientName,
    rg,
    cpf,
    reason,
    date,
  });
}
