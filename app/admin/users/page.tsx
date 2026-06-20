'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/shell'
import { getAllUsers, type AdminUserRow } from '@/lib/actions/admin'
import { Search, Users, Store, ShoppingCart } from 'lucide-react'

const statusStyle: Record<string, string> = {
  approved: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  unverified: 'bg-slate-100 text-slate-600',
}

const roleStyle: Record<string, string> = {
  buyer: 'bg-blue-100 text-blue-700',
  seller: 'bg-violet-100 text-violet-700',
  admin: 'bg-rose-100 text-rose-700',
}

function shortenWallet(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  const filtered = users.filter((u) => {
    const q = query.trim().toLowerCase()
    const matchQuery =
      !q ||
      u.walletAddress.toLowerCase().includes(q) ||
      (u.fullName ?? '').toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q)
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchStatus = statusFilter === 'all' || u.verificationStatus === statusFilter
    return matchQuery && matchRole && matchStatus
  })

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground">{users.length} total users registered</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-xl bg-card border border-border px-3 py-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-violet-500" />
              {users.length} Users
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by wallet, name, or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
          >
            <option value="all">All Roles</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Wallet</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
                            {u.role === 'seller' ? <Store className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                          </span>
                          <div className="min-w-0 leading-tight">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {u.storeName ?? u.fullName ?? '—'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{u.email ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {shortenWallet(u.walletAddress)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${roleStyle[u.role] ?? 'bg-slate-100 text-slate-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusStyle[u.verificationStatus] ?? 'bg-slate-100 text-slate-600'}`}>
                          {u.verificationStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
