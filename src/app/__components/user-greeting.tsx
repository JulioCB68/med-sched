'use client'

import { useSession } from 'next-auth/react'

function getFirstName(fullName: string): string {
  const nameParts = fullName.split(' ').filter(Boolean)
  return nameParts.length > 0 ? nameParts[0] : ''
}

export default function UserGreeting() {
  const { data: session } = useSession()

  return (
    <section className="w-full space-y-4 px-12 pt-4">
      <h1 className="semibold">
        Bem vindo, {getFirstName(session?.user?.name ?? '')}
      </h1>
      <p>Comece o dia gerenciando novas consultas.</p>
    </section>
  )
}
