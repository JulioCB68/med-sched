import { api } from "@/lib/axios";

export async function confirmeAppointment(id: string) {
  await api.patch("/appointments/update-status/confirmed", {
    id,
  });
}

export async function completeAppointment(id: string) {
  await api.patch("/appointments/update-status/completed", {
    id,
  });
}

export async function cancelAppointment(id: string) {
  await api.patch("/appointments/update-status/canceled", {
    id,
  });
}
