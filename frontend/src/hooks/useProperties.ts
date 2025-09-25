import { useEffect, useMemo, useState } from 'react'

import type { Property } from '../types/property'
import { apiFetch } from '../utils/api'

type Status = 'idle' | 'loading' | 'error' | 'success'

export type PropertyFilters = {
  status?: string
  propertyType?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sellerId?: string
}

type UsePropertiesResult = {
  data: Property[]
  status: Status
  error: string | null
}

export const useProperties = (filters: PropertyFilters = {}): UsePropertiesResult => {
  const [data, setData] = useState<Property[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const queryString = useMemo(() => {
    const params = new URLSearchParams()

    if (filters.status) params.set('status', filters.status)
    if (filters.propertyType) params.set('propertyType', filters.propertyType)
    if (filters.city) params.set('city', filters.city)
    if (typeof filters.minPrice === 'number') params.set('minPrice', String(filters.minPrice))
    if (typeof filters.maxPrice === 'number') params.set('maxPrice', String(filters.maxPrice))
    if (filters.search) params.set('search', filters.search)
    if (filters.sellerId) params.set('sellerId', filters.sellerId)

    const result = params.toString()
    return result ? `?${result}` : ''
  }, [filters])

  useEffect(() => {
    setStatus('loading')

    apiFetch<{ items: Property[] }>(`/properties${queryString}`)
      .then((response) => {
        setData(response.items)
        setStatus('success')
      })
      .catch((err: Error) => {
        setStatus('error')
        setError(err.message)
      })
  }, [queryString])

  return { data, status, error }
}
