import { BuyerShell } from '@/components/buyer/shell'
import { BuyerWelcomeBanner } from '@/components/buyer/welcome-banner'
import { BuyerStatCards } from '@/components/buyer/stat-cards'
import { BuyerMainColumn } from '@/components/buyer/main-column'
import { BuyerSideColumn } from '@/components/buyer/side-column'

export default function BuyerDashboardPage() {
  return (
    <BuyerShell>
      <div className="space-y-6">
        <BuyerWelcomeBanner />
        <BuyerStatCards />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <BuyerMainColumn />
          </div>
          <div className="xl:col-span-1">
            <BuyerSideColumn />
          </div>
        </div>
      </div>
    </BuyerShell>
  )
}
