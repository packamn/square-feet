import PropertyCard from '../components/PropertyCard'
import { useFeaturedProperties } from '../hooks/useFeaturedProperties'

const FeaturedProperties = () => {
  const { data, status, error } = useFeaturedProperties()

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
    return (
      <section className="space-y-4 text-center">
        <header className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-slate-900">Curated Listings</h2>
          <p className="text-sm text-slate-500">
            We’re handpicking the most compelling homes for you. Check back soon or browse all properties.
          </p>
        </header>
        <a
          href="/properties"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
        >
          Explore Properties
        </a>
      </section>
    )
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
