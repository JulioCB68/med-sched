import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { ChromeIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-white">
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold">Bem vindo, ...</h1>
        <p>Começe já com suas consultas.</p>
        <p className="mt-2 text-sm">
          <Link
            href="#"
            className="text-sm text-primary-foreground/80 underline underline-offset-4 hover:text-primary-foreground"
          >
            Ainda não tem uma conta?
          </Link>
        </p>
        <div className="mt-8 w-2/5 space-y-4">
          <div>
            <Label htmlFor="terms" className="text-sm">
              Nome completo
            </Label>
            <Input
              id="first-name"
              placeholder="First name"
              defaultValue="Fletcher"
            />
          </div>
          <div>
            <Label htmlFor="terms" className="text-sm">
              Nome completo
            </Label>
            <Input
              id="first-name"
              placeholder="First name"
              defaultValue="Fletcher"
            />
          </div>
          <div>
            <Label htmlFor="terms" className="text-sm">
              Nome completo
            </Label>
            <Input
              id="first-name"
              placeholder="First name"
              defaultValue="Fletcher"
            />
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
          <Button className="w-full">Entrar</Button>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Separator className="h-px w-14 bg-gray-300" />
            <span className="text-sm">Ou continue com o Google</span>
            <Separator className="h-px w-14 bg-gray-300" />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant="secondary"
              className="flex w-full items-center space-x-2"
            >
              <ChromeIcon className="h-5 w-5" />
              <span>Google</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden w-1/3 flex-col items-center justify-center"></div>
    </div>
  )
}
