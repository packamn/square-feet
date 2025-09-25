import { useForm } from 'react-hook-form'

const propertyTypes = ['Any', 'House', 'Apartment', 'Condo', 'Land', 'Commercial']

interface SearchFormValues {
  location: string
  minPrice: string
  maxPrice: string
  propertyType: string
  bedrooms: string
  bathrooms: string
}

const SearchBar = () => {
  const { register, handleSubmit, formState } = useForm<SearchFormValues>({
    defaultValues: {
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: 'Any',
      bedrooms: '',
      bathrooms: '',
    },
  })

  const onSubmit = (values: SearchFormValues) => {
    console.log('Search submitted', values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl bg-white p-6 shadow-card md:grid-cols-6"
    >
      <div className="md:col-span-2">
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Location</label>
        <input
          type="text"
          placeholder="City or ZIP"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('location')}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Min Price</label>
        <input
          type="number"
          placeholder="Any"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('minPrice')}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Max Price</label>
        <input
          type="number"
          placeholder="Any"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('maxPrice')}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Property Type</label>
        <select
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('propertyType')}
        >
          {propertyTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Bedrooms</label>
        <input
          type="number"
          placeholder="Any"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('bedrooms')}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">Bathrooms</label>
        <input
          type="number"
          placeholder="Any"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          {...register('bathrooms')}
        />
      </div>

      <div className="md:col-span-6">
        <button
          type="submit"
          className="w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Searching...' : 'Search Properties'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
