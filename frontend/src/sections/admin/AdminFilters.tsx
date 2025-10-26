import type { PropertyFilters } from '../../hooks/useProperties'

const propertyTypeOptions = ['house', 'apartment', 'condo', 'land', 'commercial'] as const
const statusOptions = ['pending', 'approved', 'rejected', 'sold', 'expired'] as const

export type AdminFiltersProps = {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
}

export const AdminFilters = ({ filters, onFiltersChange }: AdminFiltersProps) => {
  const setFilter = (key: keyof PropertyFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value && value.length > 0 ? value : undefined,
    })
  }

  const toggleStatus = (value: string) => {
    const existing = filters.status?.split(',').filter(Boolean) ?? []
    const next = existing.includes(value)
      ? existing.filter((status) => status !== value)
      : [...existing, value]

    setFilter('status', next.join(','))
  }

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title, seller, or location"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 md:col-span-2"
          value={filters.search ?? ''}
          onChange={(event) => setFilter('search', event.target.value || undefined)}
        />
        <input
          type="text"
          placeholder="Seller ID"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          value={filters.sellerId ?? ''}
          onChange={(event) => setFilter('sellerId', event.target.value || undefined)}
        />
        <select
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          value={filters.propertyType ?? ''}
          onChange={(event) => setFilter('propertyType', event.target.value || undefined)}
        >
          <option value="">All property types</option>
          {propertyTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min price"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            value={filters.minPrice ?? ''}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                minPrice: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          />
          <input
            type="number"
            placeholder="Max price"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            value={filters.maxPrice ?? ''}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                maxPrice: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((statusOption) => {
          const isActive = filters.status?.split(',').includes(statusOption)
          return (
            <button
              key={statusOption}
              type="button"
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => toggleStatus(statusOption)}
            >
              {statusOption}
            </button>
          )
        })}
      </div>
    </div>
  )
}
