import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import type { Property } from '../../types/property'

export type PropertyFormValues = {
  title: string
  description: string
  price: number
  bedrooms?: number
  bathrooms?: number
  squareFootage?: number
  street: string
  city: string
  state: string
  zipCode: string
  propertyType: Property['propertyType']
  status: Property['status']
  features: string
}

type SellerPropertyFormProps = {
  property?: Property | null
  onSubmit: (values: Partial<Property>) => void
  isSaving?: boolean
}

const blankValues: PropertyFormValues = {
  title: '',
  description: '',
  price: 0,
  bedrooms: undefined,
  bathrooms: undefined,
  squareFootage: undefined,
  street: '',
  city: '',
  state: '',
  zipCode: '',
  propertyType: 'house',
  status: 'draft',
  features: '',
}

export const SellerPropertyForm = ({ property, onSubmit, isSaving }: SellerPropertyFormProps) => {
  const defaultValues = useMemo<PropertyFormValues>(() => {
    if (!property) return blankValues
    return {
      title: property.title,
      description: property.description,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFootage: property.squareFootage,
      street: property.address.street,
      city: property.address.city,
      state: property.address.state,
      zipCode: property.address.zipCode,
      propertyType: property.propertyType,
      status: property.status,
      features: (property.features ?? []).join(', '),
    }
  }, [property])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const onInternalSubmit = handleSubmit((values) => {
    const payload: Partial<Property> = {
      title: values.title,
      description: values.description,
      price: Number(values.price ?? 0),
      bedrooms: values.bedrooms ? Number(values.bedrooms) : undefined,
      bathrooms: values.bathrooms ? Number(values.bathrooms) : undefined,
      squareFootage: values.squareFootage ? Number(values.squareFootage) : undefined,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: 'India',
      },
      propertyType: values.propertyType,
      // Don't send status - let backend default to "pending"
      features: values.features
        ? values.features.split(',').map((feature) => feature.trim()).filter(Boolean)
        : [],
    }

    onSubmit(payload)
  })

  return (
    <form className="space-y-4" onSubmit={onInternalSubmit}>
      <div>
        <label className="text-sm font-semibold text-slate-700">Title</label>
        <input
          {...register('title', { required: true })}
          placeholder="Premium Plot in Nagole"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {errors.title && <p className="text-xs text-red-500">Provide a listing title.</p>}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">Description</label>
        <textarea
          {...register('description', { required: true })}
          rows={4}
          placeholder="Describe location, plot features, legal status, and investment potential."
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {errors.description && <p className="text-xs text-red-500">Add a short property description.</p>}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-slate-700">Price (INR ₹)</label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="1500000"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Square Footage</label>
          <input
            type="number"
            {...register('squareFootage', { valueAsNumber: true })}
            placeholder="1200"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Bedrooms</label>
          <input
            type="number"
            {...register('bedrooms', { valueAsNumber: true })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">Bathrooms</label>
          <input
            type="number"
            {...register('bathrooms', { valueAsNumber: true })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">Street</label>
          <input
            {...register('street')}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">City</label>
          <input
            {...register('city')}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">State</label>
          <input
            {...register('state')}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Pin code</label>
          <input
            {...register('zipCode')}
            placeholder="500032"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">Property type</label>
        <select
          {...register('propertyType')}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">Features</label>
        <input
          {...register('features')}
          placeholder="Corner Plot, Legal Verified, Gated Community"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          {property ? 'Save changes' : 'Create property'}
        </button>
      </div>
    </form>
  )
}
