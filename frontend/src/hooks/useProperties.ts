import { useEffect, useState } from 'react'

import type { Property } from '../types/property'
import { apiFetch } from '../utils/api'

type Status = 'idle' | 'loading' | 'error' | 'success'

type UsePropertiesResult = {
  data: Property[]
  status: Status
  error: string | null
}

export const useProperties = (statusFilter?: string): UsePropertiesResult => {
  const [data, setData] = useState<Property[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStatus('loading')
    const params = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : ''

    apiFetch<{ items: Property[] }>(`/properties${params}`)
      .then((response) => {
        setData(response.items)
        setStatus('success')
      })
      .catch((err: Error) => {
        setStatus('error')
        setError(err.message)
      })
  }, [statusFilter])

  return { data, status, error }
}
