import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import type { Property } from '../../types/property'
import { HYDERABAD_AREAS, TELANGANA_STATE, HYDERABAD_CITY } from '../../constants/locations'

export type PropertyFormValues = {
  title: string
  description: string
  price: number
  bedrooms?: number
  bathrooms?: number
  squareFootage?: number
  street: string
  locality: string
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

const validationRules = {
  title: {
    required: 'Property title is required',
    minLength: {
      value: 3,
      message: 'Title must be at least 3 characters',
    },
    maxLength: {
      value: 100,
      message: 'Title is too long (max 100 characters)',
    },
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Description must be at least 10 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Description is too long (max 1000 characters)',
    },
  },
  price: {
    required: 'Price is required',
    min: {
      value: 1,
      message: 'Price must be greater than ₹0',
    },
    max: {
      value: 100000000,
      message: 'Price seems unrealistic (max ₹10 crore)',
    },
  },
  squareFootage: {
    min: {
      value: 100,
      message: 'Square footage seems too small (min 100 sq.ft)',
    },
    max: {
      value: 50000,
      message: 'Square footage unrealistic (max 50,000 sq.ft)',
    },
  },
  street: {
    required: 'Street address is required',
    minLength: {
      value: 5,
      message: 'Street address is too short',
    },
  },
  locality: {
    required: 'Locality/Area is required',
  },
  zipCode: {
    required: 'Pin code is required',
    pattern: {
      value: /^\d{6}$/,
      message: 'Pin code must be exactly 6 digits',
    },
    validate: {
      hyderabadCode: (value: string) =>
        value.startsWith('5') || 'Hyderabad pin codes start with 5',
    },
  },
  bedrooms: {
    min: {
      value: 0,
      message: 'Bedrooms cannot be negative',
    },
    max: {
      value: 20,
      message: 'Too many bedrooms (max 20)',
    },
  },
  bathrooms: {
    min: {
      value: 0,
      message: 'Bathrooms cannot be negative',
    },
    max: {
      value: 20,
      message: 'Too many bathrooms (max 20)',
    },
  },
}

const blankValues: PropertyFormValues = {
  title: '',
  description: '',
  price: 0,
  bedrooms: undefined,
  bathrooms: undefined,
  squareFootage: undefined,
  street: '',
  locality: '',
  zipCode: '',
  propertyType: 'land',
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
      locality: property.address.locality,
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
    watch,
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
        locality: values.locality,
        city: HYDERABAD_CITY,
        state: TELANGANA_STATE,
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
        <label className={`text-sm font-semibold transition-colors ${errors.title ? 'text-red-600' : 'text-slate-700'}`}>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title', validationRules.title)}
          placeholder="Premium Plot in Nagole"
          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.title
              ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
          }`}
        />
        {errors.title && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <span>⚠</span> {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className={`text-sm font-semibold transition-colors ${errors.description ? 'text-red-600' : 'text-slate-700'}`}>
            Description <span className="text-red-500">*</span>
          </label>
          <span className={`text-xs ${(watch('description')?.length || 0) >= 10 ? 'text-green-600' : 'text-slate-400'}`}>
            {watch('description')?.length || 0}/10 minimum
          </span>
        </div>
        <textarea
          {...register('description', validationRules.description)}
          rows={4}
          placeholder="Describe location, plot features, legal status, and investment potential."
          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.description
              ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
          }`}
        />
        {errors.description && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <span>⚠</span> {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.price ? 'text-red-600' : 'text-slate-700'}`}>
            Price (INR ₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('price', { ...validationRules.price, valueAsNumber: true })}
            placeholder="1500000"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.price
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.price && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.price.message}
            </p>
          )}
        </div>
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.squareFootage ? 'text-red-600' : 'text-slate-700'}`}>
            {watch('propertyType') === 'land' ? 'Plot Size' : 'Built-up Area'} (sq.ft)
          </label>
          <input
            type="number"
            {...register('squareFootage', { ...validationRules.squareFootage, valueAsNumber: true })}
            placeholder="1200"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.squareFootage
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.squareFootage && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.squareFootage.message}
            </p>
          )}
        </div>
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.bedrooms ? 'text-red-600' : 'text-slate-700'}`}>
            Bedrooms
          </label>
          <input
            type="number"
            {...register('bedrooms', { ...validationRules.bedrooms, valueAsNumber: true })}
            placeholder="2"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.bedrooms
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.bedrooms && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.bedrooms.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.bathrooms ? 'text-red-600' : 'text-slate-700'}`}>
            Bathrooms
          </label>
          <input
            type="number"
            {...register('bathrooms', { ...validationRules.bathrooms, valueAsNumber: true })}
            placeholder="2"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.bathrooms
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.bathrooms && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.bathrooms.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.street ? 'text-red-600' : 'text-slate-700'}`}>
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('street', validationRules.street)}
            placeholder="Plot No. 123, Road 5"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.street
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          />
          {errors.street && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.street.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">City</label>
          <input
            value={HYDERABAD_CITY}
            disabled
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600 cursor-not-allowed"
          />
        </div>
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.locality ? 'text-red-600' : 'text-slate-700'}`}>
            Locality/Area <span className="text-red-500">*</span>
          </label>
          <select
            {...register('locality', validationRules.locality)}
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.locality
                ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
            }`}
          >
            <option value="">Select locality</option>
            {HYDERABAD_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.locality && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.locality.message}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-500">Select the neighborhood/locality</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">State</label>
          <input
            value={TELANGANA_STATE}
            disabled
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600 cursor-not-allowed"
          />
        </div>
        <div>
          <label className={`text-sm font-semibold transition-colors ${errors.zipCode ? 'text-red-600' : 'text-slate-700'}`}>
            Pin Code <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('zipCode', validationRules.zipCode)}
              placeholder="500032"
              maxLength={6}
              inputMode="numeric"
              className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.zipCode
                  ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100'
                  : watch('zipCode')?.match(/^\d{6}$/)
                  ? 'border-green-300 bg-green-50/30 focus:border-green-500 focus:ring-green-100'
                  : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-brand-100'
              }`}
            />
            {watch('zipCode')?.match(/^\d{6}$/) && !errors.zipCode && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">✓</span>
            )}
          </div>
          {errors.zipCode && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <span>⚠</span> {errors.zipCode.message}
            </p>
          )}
          {!errors.zipCode && watch('zipCode')?.length > 0 && watch('zipCode')?.length < 6 && (
            <p className="mt-1 text-xs text-slate-500">
              {6 - watch('zipCode').length} more digits needed
            </p>
          )}
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
