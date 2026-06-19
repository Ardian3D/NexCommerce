import { BuyerShell } from '@/components/buyer/shell'
import { MarketContent } from '@/components/marketplace/market-content'
import { MarketAside } from '@/components/marketplace/market-aside'

export default function MarketplacePage() {
  return (
    <BuyerShell>
      <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-start">
        <div className="min-w-0 flex-1">
          <MarketContent />
        </div>
        <aside className="w-full shrink-0 2xl:w-80">
          <MarketAside />
        </aside>
      </div>
    </BuyerShell>
  )
}
