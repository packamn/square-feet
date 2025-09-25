import { useMemo, useState } from 'react'

import PropertyCard from '../components/PropertyCard'
import type { PropertyFilters } from '../hooks/useProperties'
import { useProperties } from '../hooks/useProperties'

const defaultFilters: PropertyFilters = {
  status: 'approved',
}

const Properties = () => {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters)
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
    <section className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{summary.heading}</h1>
            <p className="text-slate-600">{summary.subheading}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['approved', 'pending', 'draft'].map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filters.status === statusOption
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

        <div className="grid gap-3 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search by title, city, or description"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
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
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </header>

      {status === 'loading' && <p className="text-sm text-slate-500">Loading properties...</p>}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">Failed to load properties: {error}</p>
      )}

      {status === 'success' && data.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((property) => (
            <PropertyCard key={property.propertyId} property={property} />
          ))}
        </div>
      )}

      {status === 'success' && data.length === 0 && (
        <p className="text-sm text-slate-500">No properties match the selected filters. Try adjusting your search.</p>
      )}
    </section>
  )
}

export default Properties
