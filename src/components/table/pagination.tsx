'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { IAppointment, getAppointments } from '@/services/get-appointments'
import { z } from 'zod'
import { Button } from '../ui/button'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

export function Pagination() {
  const { data: session } = useSession()
  const { data: appointments } = useQuery<IAppointment[]>({
    queryKey: ['all-appointments-from-user'],
    queryFn: () => getAppointments(session?.user.id as string),
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const totalCount = appointments?.length || 0
  const pages = Math.ceil(totalCount / 10) || 1

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  function updatePage(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    replace(`${pathname}?${params.toString()}`)
  }

  const handleFirstPage = () => updatePage(1)
  const handlePreviousPage = () => updatePage(pageIndex)
  const handleNextPage = () => updatePage(pageIndex + 2)
  const handleLastPage = () => updatePage(pages)

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
            onClick={handleFirstPage}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
            onClick={handlePreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex + 1 >= pages}
            onClick={handleNextPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex + 1 === pages}
            onClick={handleLastPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
