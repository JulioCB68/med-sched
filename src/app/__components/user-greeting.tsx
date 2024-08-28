"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { AppointmentCreationModal } from "@/components/appointment-creation-modal";
import { CalendarPlus } from "lucide-react";

function getFirstName(fullName: string): string {
  const nameParts = fullName.split(" ").filter(Boolean);
  return nameParts.length > 0 ? nameParts[0] : "";
}

export default function UserGreeting() {
  const [isOpenonAppointmentCreationModal, setIsOpenAppointmentCreationModal] =
    useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <section className="flex w-full items-center justify-between px-12 pt-4">
      <div className="space-y-4">
        <h1 className="semibold">
          Bem vindo, {getFirstName(session?.user?.name ?? "")}
        </h1>
        <p>Comece o dia gerenciando novas consultas.</p>
      </div>
      <Dialog
        open={isOpenonAppointmentCreationModal}
        onOpenChange={setIsOpenAppointmentCreationModal}
      >
        <DialogTrigger asChild>
          <Button>
            Nova consulta
            <CalendarPlus className="ml-3 size-5" />
          </Button>
        </DialogTrigger>
        <AppointmentCreationModal
          onCloseAppointmentCreationModal={() =>
            setIsOpenAppointmentCreationModal(false)
          }
        />
      </Dialog>
    </section>
  );
}
