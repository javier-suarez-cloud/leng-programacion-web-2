const API = 'http://localhost:3000/productos'

export async function obtenerProductos() {
  const r = await fetch(API)
  if (!r.ok) throw new Error('No fue posible obtener los productos')
  return r.json()
}

export async function obtenerProducto(id) {
  const r = await fetch(`${API}/${id}`)
  if (!r.ok) throw new Error('Producto no encontrado')
  return r.json()
}

export async function crearProducto(datos) {
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

export async function actualizarProducto(id, datos) {
  const r = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!r.ok) throw new Error('Error al actualizar')
  return r.json()
}

export async function eliminarProducto(id) {
  const r = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  })

  if (!r.ok) throw new Error('Error al eliminar')
  return r.json()
}
