import type { Property } from '../../backend/src/models/property'

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const displayPrice = property.price.toLocaleString('en-US', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  })

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={
            property.images?.[0] ??
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
          }
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-slate-900">{property.title}</h3>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase text-brand-600">
            {property.status}
          </span>
        </div>
        <p className="text-sm text-slate-600">{property.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>
            {property.address.city}, {property.address.state}
          </span>
          <span>{displayPrice}</span>
        </div>
        {property.features.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-xs text-slate-500">
            {property.features.slice(0, 4).map((feature) => (
              <li key={feature} className="rounded-full bg-slate-100 px-3 py-1">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default PropertyCard
