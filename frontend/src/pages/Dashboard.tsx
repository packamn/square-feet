import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

import PropertyCard from '../components/PropertyCard'
import { PropertyCardSkeleton } from '../components/Skeletons'
import type { Property } from '../types/property'
import type { PropertyFilters } from '../hooks/useProperties'
import { useProperties } from '../hooks/useProperties'
import { SellerPropertyForm } from '../sections/dashboard/SellerPropertyForm'
import { SellerPropertiesToolbar } from '../sections/dashboard/SellerPropertiesToolbar'
import { SellerPropertyModal } from '../sections/dashboard/SellerPropertyModal'
import { MOCK_SELLER_ID } from '../constants/mockSeller'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { apiFetch } from '../utils/api'

const SellerDashboard = () => {
  usePageMetadata({
    title: 'Seller Dashboard · SquareFeet',
    description: 'Manage drafts, monitor approvals, and publish listings instantly from the SquareFeet seller dashboard.',
  })
  const [filters, setFilters] = useState<PropertyFilters>({ status: 'pending,approved' })
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const { data, status, error, refetch } = useProperties({ sellerId: MOCK_SELLER_ID, ...filters })

  const summary = useMemo(() => {
    if (!filters.status) return 'All listings'
    return `Showing ${filters.status.replace(/,/g, ', ')} listings`
  }, [filters])

  const openCreate = () => {
    setSelectedProperty(null)
    setModalOpen(true)
  }

  const openEdit = (property: Property) => {
    setSelectedProperty(property)
    setModalOpen(true)
  }

  const handleSubmit = async (values: Partial<Property>) => {
    setIsSaving(true)

    try {
      await apiFetch<Property>('/properties', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          currency: 'INR',
        }),
      })

      toast.success('Property listing created! Pending admin approval.')
      setModalOpen(false)
      
      // Refresh the property list to show new listing
      refetch()
    } catch (error) {
      console.error('Failed to create property:', error)
      toast.error('Failed to create property. Please check all fields and try again.')
    } finally {
      setIsSaving(false)
    }
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
          <h1 className="text-3xl font-semibold text-slate-900">Seller dashboard</h1>
          <p className="text-sm text-slate-600">Monitor drafts, track approval status, and publish listings instantly.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Create new listing
        </button>
      </motion.header>

      <SellerPropertiesToolbar filters={filters} onFiltersChange={setFilters} />

      <div className="card-surface p-4 text-sm text-slate-600">{summary}</div>

      {status === 'loading' && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      )}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">Failed to load properties: {error}</p>
      )}

      <AnimatePresence>
        {status === 'success' && data.length > 0 && (
          <motion.div
            layout
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.map((property) => (
              <motion.button
                key={property.propertyId}
                type="button"
                className="text-left focus:outline-none focus:ring-2 focus:ring-brand-200"
                onClick={() => openEdit(property)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <PropertyCard property={property} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'success' && data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No listings match the selected filters. Create a new property to get started.
        </div>
      )}

      <SellerPropertyModal
        isOpen={isModalOpen}
        property={selectedProperty}
        onClose={() => setModalOpen(false)}
      >
        <SellerPropertyForm property={selectedProperty ?? undefined} onSubmit={handleSubmit} isSaving={isSaving} />
      </SellerPropertyModal>
    </section>
  )
}

export default SellerDashboard
