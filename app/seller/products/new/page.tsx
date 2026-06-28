import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'
import { CreateProductForm } from '@/components/seller/create-product-form'

export default async function CreateProductPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const dashData = await getSellerDashboardData(session.sub).catch(() => null)

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <CreateProductForm />
    </SellerShell>
  )
}
