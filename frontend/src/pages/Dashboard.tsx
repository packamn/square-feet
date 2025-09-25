import { useMemo, useState } from 'react'

import PropertyCard from '../components/PropertyCard'
import type { Property } from '../types/property'
import type { PropertyFilters } from '../hooks/useProperties'
import { useProperties } from '../hooks/useProperties'
import { SellerPropertyForm } from '../sections/dashboard/SellerPropertyForm'
import { SellerPropertiesToolbar } from '../sections/dashboard/SellerPropertiesToolbar'
import { SellerPropertyModal } from '../sections/dashboard/SellerPropertyModal'

const SellerDashboard = () => {
  const [filters, setFilters] = useState<PropertyFilters>({ status: 'draft,pending,approved' })
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const { data, status, error } = useProperties({ ...filters })

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

  const handleSubmit = (values: Partial<Property>) => {
    // Placeholder for API integration; would call POST/PUT here.
    console.log('TODO submit listing payload', values)
    setModalOpen(false)
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-slate-900">Seller dashboard</h1>
          <p className="text-sm text-slate-600">Monitor drafts, track approval status, and publish listings instantly.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-600"
        >
          Create new listing
        </button>
      </header>

      <SellerPropertiesToolbar filters={filters} onFiltersChange={setFilters} />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">{summary}</div>

      {status === 'loading' && <p className="text-sm text-slate-500">Loading your listings...</p>}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">Failed to load properties: {error}</p>
      )}

      {status === 'success' && data.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((property) => (
            <button
              key={property.propertyId}
              type="button"
              className="text-left"
              onClick={() => openEdit(property)}
            >
              <PropertyCard property={property} />
            </button>
          ))}
        </div>
      )}

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
        <SellerPropertyForm property={selectedProperty ?? undefined} onSubmit={handleSubmit} isSaving={false} />
      </SellerPropertyModal>
    </section>
  )
}

export default SellerDashboard
