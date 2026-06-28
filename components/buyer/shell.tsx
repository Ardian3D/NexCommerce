'use client'

import { useState } from 'react'
import { BuyerSidebar } from '@/components/buyer/sidebar'
import { BuyerTopbar } from '@/components/buyer/topbar'
import type { ProductAlert } from '@/lib/actions/notifications'

type Props = {
  children: React.ReactNode
  walletAddress?: string
  displayName?: string
  tier?: string
  pendingOrdersCount?: number
  productAlerts?: ProductAlert[]
}

export function BuyerShell({ children, walletAddress, displayName, tier, pendingOrdersCount, productAlerts }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <BuyerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        walletAddress={walletAddress}
        displayName={displayName}
        tier={tier}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <BuyerTopbar
          onMenuClick={() => setSidebarOpen(true)}
          walletAddress={walletAddress}
          pendingOrdersCount={pendingOrdersCount}
          productAlerts={productAlerts}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
