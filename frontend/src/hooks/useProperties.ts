import { useEffect, useState } from 'react'

import type { Property } from '../../backend/src/models/property'
import { apiFetch } from '../utils/api'

type Status = 'idle' | 'loading' | 'error' | 'success'

type UsePropertiesResult = {
  data: Property[]
  status: Status
  error: string | null
}

export const useProperties = (): UsePropertiesResult => {
  const [data, setData] = useState<Property[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStatus('loading')
    apiFetch<{ items: Property[] }>('/properties')
      .then((response) => {
        setData(response.items)
        setStatus('success')
      })
      .catch((err: Error) => {
        setStatus('error')
        setError(err.message)
      })
  }, [])

  return { data, status, error }
}
