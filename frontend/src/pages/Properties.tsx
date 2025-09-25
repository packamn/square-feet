import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'

const Properties = () => {
  const { data, status, error } = useProperties()

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Properties</h1>
        <p className="text-slate-600">
          Explore curated listings across our network. Filter by price, location, property type, and more (coming soon).
        </p>
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
        <p className="text-sm text-slate-500">No properties available yet. Check back soon!</p>
      )}
    </section>
  )
}

export default Properties
