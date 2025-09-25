import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'

const FeaturedProperties = () => {
  const { data, status, error } = useProperties()

  if (status === 'loading') {
    return <p className="text-center text-sm text-slate-500">Loading properties...</p>
  }

  if (status === 'error') {
    return (
      <p className="rounded-2xl bg-red-50 p-4 text-center text-sm text-red-600">
        Failed to load properties: {error}
      </p>
    )
  }

  if (!data.length) {
    return <p className="text-center text-sm text-slate-500">No properties available yet.</p>
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900">Featured Listings</h2>
        <p className="text-sm text-slate-500">
          Explore curated properties with premium finishes, prime locations, and strong investment potential.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.slice(0, 6).map((property) => (
          <PropertyCard key={property.propertyId} property={property} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProperties
