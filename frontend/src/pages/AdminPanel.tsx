import { useMemo, useState } from 'react'

import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'
import type { PropertyFilters } from '../hooks/useProperties'
import type { Property } from '../types/property'
import { AdminFilters } from '../sections/admin/AdminFilters'
import { AdminPropertiesTable } from '../sections/admin/AdminPropertiesTable'
import { AdminBulkActions } from '../sections/admin/AdminBulkActions'
import { AdminDetailDrawer } from '../sections/admin/AdminDetailDrawer'

const defaultFilters: PropertyFilters = {
  status: 'pending,approved,draft,rejected',
}

const AdminPanel = () => {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [detailProperty, setDetailProperty] = useState<Property | null>(null)

  const { data, status, error } = useProperties(filters)

  const toggleSelection = (propertyId: string) => {
    setSelectedIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId],
    )
  }

  const summary = useMemo(() => {
    const total = data.length
    const pending = data.filter((property) => property.status === 'pending').length
    return `${total} listings · ${pending} awaiting approval`
  }, [data])

  const runBulkAction = (action: string) => {
    console.log(`[Mock admin action] ${action} on`, selectedIds)
    setSelectedIds([])
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">Admin control center</h1>
          <p className="text-sm text-slate-600">Review, approve, and update properties across the SquareFeet network.</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          {summary}
        </div>
      </header>

      <AdminFilters filters={filters} onFiltersChange={setFilters} />
      <AdminBulkActions
        disabled={selectedIds.length === 0}
        onApprove={() => runBulkAction('approve')}
        onReject={() => runBulkAction('reject')}
        onDelete={() => runBulkAction('delete')}
        selectedCount={selectedIds.length}
      />

      {status === 'loading' && <p className="text-sm text-slate-500">Loading properties...</p>}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">Failed to load properties: {error}</p>
      )}

      {status === 'success' && data.length > 0 && (
        <AdminPropertiesTable
          properties={data}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
          onViewDetail={setDetailProperty}
        />
      )}

      {status === 'success' && data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No properties match the selected filters.
        </div>
      )}

      <AdminDetailDrawer property={detailProperty} onClose={() => setDetailProperty(null)} />

      <section className="rounded-3xl bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-slate-900">Recently approved highlights</h2>
        <p className="mt-2 text-sm text-slate-600">
          These properties moved through the approval workflow in the past 48 hours.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data
            .filter((property) => property.status === 'approved')
            .slice(0, 3)
            .map((property) => (
              <PropertyCard key={property.propertyId} property={property} />
            ))}
        </div>
      </section>
    </section>
  )
}

export default AdminPanel
