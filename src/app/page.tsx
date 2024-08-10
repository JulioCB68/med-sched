import Header from '@/components/header'
import StatusCard from '@/components/status-card'

import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-muted">
      <Header />
      <section className="w-full space-y-4 px-12 pt-4">
        <h1 className="semibold">Bem vindo, John</h1>
        <p className="">Comece o dia gerenciando novas consultas.</p>
      </section>

      <div className="grid grid-cols-3 gap-4 px-12 pt-8">
        <StatusCard type="appointments" total={4} icon={CalendarCheck2} />
        <StatusCard type="pending" total={4} icon={Hourglass} />
        <StatusCard type="cancelled" total={4} icon={TriangleAlert} />
      </div>
    </div>
  )
}
