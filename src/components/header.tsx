import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

export default function Header() {
  return (
    <header className="admin-header">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/logo.svg"
          height={50}
          width={50}
          alt="logo"
          className="size-10"
        />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-black">JC</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer space-x-2">
            <LogOut className="size-4" /> <p>Sair</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
