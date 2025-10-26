import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'
import type { PropertyFilters } from '../hooks/useProperties'
import type { Property } from '../types/property'
import { AdminFilters } from '../sections/admin/AdminFilters'
import { AdminPropertiesTable } from '../sections/admin/AdminPropertiesTable'
import { AdminBulkActions } from '../sections/admin/AdminBulkActions'
import { AdminDetailDrawer } from '../sections/admin/AdminDetailDrawer'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { TableRowSkeleton } from '../components/Skeletons'
import { apiFetch } from '../utils/api'

const defaultFilters: PropertyFilters = {
  status: 'pending,approved,draft,rejected',
}

const AdminPanel = () => {
  usePageMetadata({
    title: 'Admin Control Center · SquareFeet',
    description: 'Review, approve, and update listings across the SquareFeet network with the admin control center.',
  })
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [detailProperty, setDetailProperty] = useState<Property | null>(null)
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)

  const { data, status, error, refetch } = useProperties(filters)

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

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return

    // Filter out already-approved properties
    const selectedProperties = data.filter((p) => selectedIds.includes(p.propertyId))
    const approvableProperties = selectedProperties.filter((p) => p.status !== 'approved')

    if (approvableProperties.length === 0) {
      toast.error('Selected properties are already approved')
      return
    }

    const confirmed = window.confirm(`Approve ${approvableProperties.length} properties?`)
    if (!confirmed) return

    setIsBulkProcessing(true)

    let successCount = 0
    let failCount = 0

    for (const property of approvableProperties) {
      try {
        await apiFetch(`/properties/${property.propertyId}`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'approved' }),
        })
        successCount++
      } catch (error) {
        console.error(`Failed to approve ${property.propertyId}:`, error)
        failCount++
      }
    }

    setIsBulkProcessing(false)

    if (failCount === 0) {
      toast.success(`Successfully approved ${successCount} properties!`)
    } else {
      toast.error(`Approved ${successCount}, failed ${failCount}`)
    }

    setSelectedIds([])
    refetch()
  }

  const handleBulkReject = async () => {
    if (selectedIds.length === 0) return

    // Filter out already-rejected properties
    const selectedProperties = data.filter((p) => selectedIds.includes(p.propertyId))
    const rejectableProperties = selectedProperties.filter((p) => p.status !== 'rejected')

    if (rejectableProperties.length === 0) {
      toast.error('Selected properties are already rejected')
      return
    }

    const reason = window.prompt(
      `Provide rejection reason for ${rejectableProperties.length} properties (optional):`
    )

    if (reason === null) return

    setIsBulkProcessing(true)

    let successCount = 0
    let failCount = 0

    for (const property of rejectableProperties) {
      try {
        await apiFetch(`/properties/${property.propertyId}`, {
          method: 'PUT',
          body: JSON.stringify({
            status: 'rejected',
            rejectionReason: reason || 'No reason provided',
          }),
        })
        successCount++
      } catch (error) {
        console.error(`Failed to reject ${property.propertyId}:`, error)
        failCount++
      }
    }

    setIsBulkProcessing(false)

    if (failCount === 0) {
      toast.success(`Successfully rejected ${successCount} properties.`)
    } else {
      toast.error(`Rejected ${successCount}, failed ${failCount}`)
    }

    setSelectedIds([])
    refetch()
  }

  const handleBulkDelete = () => {
    console.log('[TODO] Delete functionality not implemented yet')
    toast.error('Delete functionality coming soon')
  }

  return (
    <section className="space-y-6">
      <motion.header
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">Admin control center</h1>
          <p className="text-sm text-slate-600">Review, approve, and update properties across the SquareFeet network.</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          {summary}
        </div>
      </motion.header>

      <AdminFilters filters={filters} onFiltersChange={setFilters} />
      <AdminBulkActions
        disabled={selectedIds.length === 0 || isBulkProcessing}
        onApprove={handleBulkApprove}
        onReject={handleBulkReject}
        onDelete={handleBulkDelete}
        selectedCount={selectedIds.length}
      />

      {status === 'loading' && <p className="text-sm text-slate-500">Loading properties...</p>}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">Failed to load properties: {error}</p>
      )}

      <AnimatePresence>
        {status === 'loading' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </motion.div>
        )}
        {status === 'success' && data.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminPropertiesTable
              properties={data}
              selectedIds={selectedIds}
              onToggleSelection={toggleSelection}
              onViewDetail={setDetailProperty}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'success' && data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No properties match the selected filters.
        </div>
      )}

      <AdminDetailDrawer property={detailProperty} onClose={() => setDetailProperty(null)} onRefresh={refetch} />

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
