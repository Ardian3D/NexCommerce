'use client'

import { useState } from 'react'
import { SellerSidebar } from '@/components/seller/sidebar'
import { SellerTopbar } from '@/components/seller/topbar'
import { WelcomeBanner } from '@/components/seller/welcome-banner'
import { StatCards } from '@/components/seller/stat-cards'
import { OverviewChart } from '@/components/seller/overview-chart'
import {
  TasksCard,
  NotificationsCard,
} from '@/components/seller/tasks-notifications'
import {
  RecentOrders,
  QuickActions,
  NexAiAssistant,
} from '@/components/seller/bottom-row'

export default function SellerDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f4f5f7]">
      <SellerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <SellerTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          <WelcomeBanner />
          <StatCards />

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <OverviewChart />
            <TasksCard />
            <NotificationsCard />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <RecentOrders />
            <QuickActions />
            <NexAiAssistant />
          </div>
        </main>
      </div>
    </div>
  )
}
