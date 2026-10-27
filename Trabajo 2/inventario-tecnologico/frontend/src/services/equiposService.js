const API = 'http://localhost:3000/equipos'

export async function obtenerEquipos() {
  const r = await fetch(API)
  if (!r.ok) throw new Error('No fue posible obtener los equipos')
  return r.json()
}

export async function obtenerEquipo(id) {
  const r = await fetch(`${API}/${id}`)
  if (!r.ok) throw new Error('Equipo no encontrado')
  return r.json()
}

export async function crearEquipo(datos) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!r.ok) {
    const error = await r.json()
    const mensaje = Array.isArray(error.message)
      ? error.message.join(', ')
      : error.message

    throw new Error(mensaje || 'Error al crear')
  }

  return r.json()
}

export async function actualizarEquipo(id, datos) {
  const r = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!r.ok) {
    const error = await r.json()
    const mensaje = Array.isArray(error.message)
      ? error.message.join(', ')
      : error.message

    throw new Error(mensaje || 'Error al actualizar')
  }

  return r.json()
}

export async function eliminarEquipo(id) {
  const r = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  })

  if (!r.ok) throw new Error('Error al eliminar')
  return r.json()
}