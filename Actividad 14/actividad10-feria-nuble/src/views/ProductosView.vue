<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  eliminarProducto,
  obtenerProductos,
} from '../services/productosService'

const productos = ref([])
const cargando = ref(true)
const error = ref('')
const busqueda = ref('')

const productosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase()

  return productos.value.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto) ||
    p.comuna.toLowerCase().includes(texto)
  )
})

async function cargar() {
  try {
    cargando.value = true
    error.value = ''
    productos.value = await obtenerProductos()
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

async function borrar(id) {
  if (!confirm('¿Eliminar este producto?')) return

  try {
    await eliminarProducto(id)
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

onMounted(cargar)
</script>

<template>
  <main>
    <h1>Productos de la Feria</h1>

    <input
      v-model="busqueda"
      placeholder="Buscar por nombre, categoría o comuna"
    />

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>

    <section v-else>
      <article
        v-for="producto in productosFiltrados"
        :key="producto.id"
      >
        <h2>{{ producto.nombre }}</h2>
        <p>{{ producto.categoria }} · {{ producto.comuna }}</p>
        <p>{{ producto.descripcion }}</p>
        <p>Stock: {{ producto.stock }}</p>
        <strong>${{ producto.precio }}</strong>

        <RouterLink :to="`/productos/${producto.id}`">
          Ver detalle
        </RouterLink>

        <button @click="borrar(producto.id)">
          Eliminar
        </button>
      </article>
    </section>
  </main>
</template>
