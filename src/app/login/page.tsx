"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ChromeIcon } from "lucide-react";

export default function Login() {
  return (
    <section className="container my-auto flex min-h-screen max-w-[496px] items-center bg-background text-white">
      <form className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold">Bem vindo 👋</h1>
          <p className="text-dark-700">Começe a gerenciar suas consultas.</p>
        </section>

        <div className="mt-4 flex items-center justify-center space-x-2">
          <Separator className="h-px w-20 bg-gray-300" />
          <span className="text-center text-sm">
            Faça login com o Google para continar
          </span>
          <Separator className="h-px w-20 bg-gray-300" />
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Button
            size={"lg"}
            className="flex w-full items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            <ChromeIcon className="h-5 w-5 text-black/70" />
            <span className="text-black/90">Google</span>
          </Button>
        </div>
      </form>
    </section>
  );
}
