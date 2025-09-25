import { useMemo, useState } from 'react'

import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'
import type { PropertyFilters } from '../hooks/useProperties'
import { SellerPropertyModal } from '../sections/dashboard/SellerPropertyModal'
import type { Property } from '../types/property'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { PropertyCardSkeleton } from '../components/Skeletons'

const defaultFilters: PropertyFilters = {
  status: 'approved',
}

const filterOptions = {
  propertyType: ['house', 'apartment', 'condo', 'land', 'commercial'] as const,
  status: ['approved', 'pending', 'draft'] as const,
}

const Properties = () => {
  usePageMetadata({
    title: 'Properties · SquareFeet',
    description: 'Explore curated real estate listings from the SquareFeet network, complete with data-rich previews.',
  })

  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const { data, status, error } = useProperties(filters)

  const summary = useMemo(() => {
    const parts: string[] = []

    if (filters.city) parts.push(filters.city)
    if (filters.propertyType) parts.push(filters.propertyType)
    if (filters.minPrice) parts.push(`$${Number(filters.minPrice).toLocaleString()}+`)

    if (parts.length === 0) {
      return { heading: 'Properties', subheading: 'Explore curated listings across our network.' }
    }

    return {
      heading: `Showing ${filters.status ?? 'all'} properties`,
      subheading: parts.join(' • '),
    }
  }, [filters])

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{summary.heading}</h1>
            <p className="text-slate-600">{summary.subheading}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.status.map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filters.status?.includes(statusOption)
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: prev.status === statusOption ? undefined : statusOption,
                  }))}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search by title, city, or description"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 md:col-span-2"
            value={filters.search ?? ''}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                search: event.target.value || undefined,
              }))}
          />
          <input
            type="text"
            placeholder="City"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            value={filters.city ?? ''}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                city: event.target.value || undefined,
              }))}
          />
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            value={filters.propertyType ?? ''}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                propertyType: event.target.value || undefined,
              }))}
          >
            <option value="">All property types</option>
            {filterOptions.propertyType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">Need a dedicated agent?</h2>
            <p className="text-sm text-slate-600">Schedule a personalized tour or listing consultation in minutes.</p>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Talk to an advisor
          </a>
        </div>
      </div>

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

      {status === 'success' && data.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((property) => (
            <button
              key={property.propertyId}
              type="button"
              className="text-left"
              onClick={() => setSelectedProperty(property)}
            >
              <PropertyCard property={property} />
            </button>
          ))}
        </div>
      )}

      {status === 'success' && data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No properties match the selected filters. Try adjusting your search.
        </div>
      )}

      <SellerPropertyModal isOpen={Boolean(selectedProperty)} property={selectedProperty} onClose={() => setSelectedProperty(null)}>
        {selectedProperty ? (
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              {selectedProperty.address.street}, {selectedProperty.address.city}, {selectedProperty.address.state}{' '}
              {selectedProperty.address.zipCode}
            </p>
            <p>{selectedProperty.description}</p>
            <p>
              {selectedProperty.bedrooms ?? 0} Bed · {selectedProperty.bathrooms ?? 0} Bath ·{' '}
              {selectedProperty.squareFootage ? `${selectedProperty.squareFootage.toLocaleString()} sq.ft` : 'Size TBD'}
            </p>
            <p>Status: {selectedProperty.status}</p>
            <p>Price: {selectedProperty.price.toLocaleString('en-US', { style: 'currency', currency: selectedProperty.currency })}</p>
          </div>
        ) : null}
      </SellerPropertyModal>
    </section>
  )
}

export default Properties
