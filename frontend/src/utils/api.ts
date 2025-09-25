const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!response.ok) {
    const message = `API error ${response.status}`
    throw new Error(message)
  }

  return response.json() as Promise<T>
}
