import type { PropertyFilters } from '../../hooks/useProperties'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid'

const statusOptions = [
  { label: 'Pending', value: 'pending', icon: ClockIcon },
  { label: 'Approved', value: 'approved', icon: CheckCircleIcon },
]

const viewOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'Table', value: 'table' },
]

type SellerPropertiesToolbarProps = {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
}

export const SellerPropertiesToolbar = ({ filters, onFiltersChange }: SellerPropertiesToolbarProps) => {
  const toggleStatus = (value: string) => {
    const existing = filters.status?.split(',').filter(Boolean) ?? []
    const next = existing.includes(value)
      ? existing.filter((status) => status !== value)
      : [...existing, value]

    onFiltersChange({
      ...filters,
      status: next.length > 0 ? next.join(',') : undefined,
    })
  }

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => {
          const isActive = filters.status?.split(',').includes(option.value)
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleStatus(option.value)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <input
          type="text"
          placeholder="Search your listings"
          className="w-full min-w-[200px] rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 md:w-auto"
          value={filters.search ?? ''}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              search: event.target.value || undefined,
            })
          }
        />
        <select
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          value={filters.propertyType ?? ''}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              propertyType: event.target.value || undefined,
            })
          }
        >
          <option value="">All property types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>

        <div className="flex gap-1 rounded-full border border-slate-200 p-1">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                option.value === 'grid'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
