import Header from '@/components/header'
import StatusCardFilter from '@/components/status-card-filter'
import CustomTable from '@/components/table/custom-table'
import { Pagination } from '@/components/table/pagination'
import { TableFilters } from '@/components/table/table-filters'
import UserGreeting from './__components/user-greeting'

import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 text-muted">
      <Header />
      <UserGreeting />

      <div className="grid grid-cols-3 gap-4 px-12 pt-8">
        <StatusCardFilter
          type="completed"
          icon={<CalendarCheck2 className="h-4 w-4" />}
        />
        <StatusCardFilter
          type="pending"
          icon={<Hourglass className="h-4 w-4" />}
        />
        <StatusCardFilter
          type="canceled"
          icon={<TriangleAlert className="h-4 w-4" />}
        />
      </div>

      <section className="space-y-4 px-12 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <TableFilters />
          <CustomTable />
          <Pagination />
        </Suspense>
      </section>
    </div>
  )
}
