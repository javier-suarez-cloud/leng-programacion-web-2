// Dirección del backend de la Parte A
export const API_URL = 'http://localhost:3000'

// Hace una petición al backend. Si se entrega un token, lo envía en el header Authorization.
export async function apiFetch(ruta, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(API_URL + ruta, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const error = new Error(data.error || 'Error en la petición')
    error.status = res.status
    throw error
  }
  return data
}
