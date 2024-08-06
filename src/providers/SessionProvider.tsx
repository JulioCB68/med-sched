'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

export default function NextAuthProvider({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
