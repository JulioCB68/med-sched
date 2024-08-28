"use client";

import Image from "next/image";
import Link from "next/link";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { data: session } = useSession();

  function getInitialsName(fullName: string): string {
    const nameParts = fullName.split(" ").filter(Boolean);
    if (nameParts.length === 0) {
      return "";
    }
    const firstInitial = nameParts[0][0].toUpperCase();
    const secondInitial =
      nameParts.length > 1 ? nameParts[1][0].toUpperCase() : "";

    return firstInitial + secondInitial;
  }

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
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback className="text-black">
              {getInitialsName(session?.user?.name ?? "")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer space-x-2"
            onClick={() => signOut()}
          >
            <LogOut className="size-4" /> <p>Sair</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
