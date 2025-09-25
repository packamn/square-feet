import type { Property } from '../../types/property'

export type AdminPropertiesTableProps = {
  properties: Property[]
  selectedIds: string[]
  onToggleSelection: (id: string) => void
  onViewDetail: (property: Property) => void
}

export const AdminPropertiesTable = ({ properties, selectedIds, onToggleSelection, onViewDetail }: AdminPropertiesTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <tr>
            <th className="px-4 py-3">
              <span className="sr-only">Select</span>
            </th>
            <th className="px-4 py-3">Listing</th>
            <th className="px-4 py-3">Seller</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
          {properties.map((property) => {
            const isSelected = selectedIds.includes(property.propertyId)
            return (
              <tr key={property.propertyId} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelection(property.propertyId)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-400"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  <div>{property.title}</div>
                  <p className="text-xs text-slate-500">{property.propertyType}</p>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{property.sellerId}</td>
                <td className="px-4 py-3">
                  {property.address.city}, {property.address.state}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                    {property.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {property.price.toLocaleString('en-US', { style: 'currency', currency: property.currency })}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetail(property)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-brand-400 hover:text-brand-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
