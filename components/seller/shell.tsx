'use client'

import { useState } from 'react'
import { SellerSidebar } from '@/components/seller/sidebar'
import { SellerTopbar } from '@/components/seller/topbar'

type Props = {
  children: React.ReactNode
  walletAddress?: string
  storeName?: string
  tier?: string
  pendingOrdersCount?: number
}

export function SellerShell({
  children,
  walletAddress,
  storeName,
  tier,
  pendingOrdersCount,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <SellerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        walletAddress={walletAddress}
        storeName={storeName}
        tier={tier}
        pendingOrdersCount={pendingOrdersCount}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <SellerTopbar
          onMenuClick={() => setSidebarOpen(true)}
          walletAddress={walletAddress}
          pendingOrdersCount={pendingOrdersCount}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
