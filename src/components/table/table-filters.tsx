'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Search, X } from 'lucide-react'

const tableFiltersSchema = z.object({
  appointmentId: z.string().optional(),
  patientName: z.string().optional(),
  status: z.string().optional(),
})

type TableFiltersSchema = z.infer<typeof tableFiltersSchema>

export function TableFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const appointmentId = searchParams.get('appointmentId')
  const patientName = searchParams.get('patientName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<TableFiltersSchema>({
      resolver: zodResolver(tableFiltersSchema),
      defaultValues: {
        appointmentId: appointmentId ?? '',
        patientName: patientName ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter({
    appointmentId,
    patientName,
    status,
  }: TableFiltersSchema) {
    const params = new URLSearchParams(searchParams)
    if (appointmentId) {
      params.set('appointmentId', appointmentId)
    } else {
      params.delete('appointmentId')
    }

    if (patientName) {
      params.set('patientName', patientName)
    } else {
      params.delete('patientName')
    }

    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams)
    if (params) {
      params.delete('appointmentId')
      params.delete('patientName')
      params.delete('status')
      params.set('page', '1')
      replace(`${pathname}?${params.toString()}`)
    }
    reset({
      appointmentId: '',
      patientName: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID da consulta"
        className="h-8 w-auto"
        {...register('appointmentId')}
      />
      <Input
        placeholder="Nome do paciente"
        className="h-8 w-[320px]"
        {...register('patientName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />
      <Button variant="secondary" size="sm" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
