import { api } from "@/lib/axios";

export interface IAppointment {
  Date: Date;
  createdAt: string;
  doctor: string;
  id: string;
  patient: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  updatedAt: string;
  userId: string;
  reason: string;
  cpf: string;
  rg: string;
}

export async function getAppointments(id: string): Promise<IAppointment[]> {
  const response = await api.get(`/appointments/${id}`);

  const appointments: IAppointment[] = response.data;

  const sortedAppointments = appointments.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") {
      return -1;
    }
    if (a.status !== "pending" && b.status === "pending") {
      return 1;
    }
    return 0;
  });

  return sortedAppointments;
}
