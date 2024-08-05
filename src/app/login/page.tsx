import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { ChromeIcon } from 'lucide-react'

export default function Home() {
  return (
    <section className="container my-auto flex min-h-screen max-w-[496px] items-center bg-background text-white">
      <form className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="text-3xl font-bold">Bem vindo 👋</h1>
          <p className="text-dark-700">Começe já com seus agendamentos.</p>
          <p className="mt-2 text-sm">
            <Link
              href="#"
              className="text-sm text-primary-foreground/80 underline underline-offset-4 hover:text-primary-foreground"
            >
              Ainda não tem uma conta?
            </Link>
          </p>
        </section>

        <div className="space-y-4">
          <Label htmlFor="full-name" className="text-sm">
            Nome completo
          </Label>
          <Input id="full-name" placeholder="Nome completo" />
        </div>

        <div className="space-y-4">
          <Label htmlFor="email" className="text-sm">
            E-mail
          </Label>
          <Input id="email" placeholder="Seu melhor e-mail" />
        </div>

        <div className="space-y-4">
          <Label htmlFor="password" className="text-sm">
            Senha
          </Label>
          <Input id="password" placeholder="**********" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{' '}
            <Link
              href="#"
              className="text-sm text-primary-foreground/80 underline underline-offset-4 hover:text-primary-foreground"
            >
              Terms & Conditions
            </Link>
          </Label>
        </div>
        <Button className="w-full" size={'lg'}>
          Entrar
        </Button>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Separator className="h-px w-14 bg-gray-300" />
          <span className="text-sm">Ou continue com o Google</span>
          <Separator className="h-px w-14 bg-gray-300" />
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Button
            variant="secondary"
            size={'lg'}
            className="flex w-full items-center space-x-2"
          >
            <ChromeIcon className="h-5 w-5" />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </section>
  )
}
