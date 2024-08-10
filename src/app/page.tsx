import Header from '@/components/header'
import StatusCardFilter from '@/components/status-card-filter'
import CustomTable from '@/components/table/custom-table'
import UserGreeting from './__components/user-greeting'

import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-muted">
      <Header />
      <UserGreeting />

      <div className="grid grid-cols-3 gap-4 px-12 pt-8">
        <StatusCardFilter type="appointments" total={4} icon={CalendarCheck2} />
        <StatusCardFilter type="pending" total={4} icon={Hourglass} />
        <StatusCardFilter type="cancelled" total={4} icon={TriangleAlert} />
      </div>

      <section className="px-12 py-8">
        <CustomTable />
      </section>
    </div>
  )
}
