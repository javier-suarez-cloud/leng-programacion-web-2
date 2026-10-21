<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { crearProducto } from '../services/productosService'

const router = useRouter()
const error = ref('')
const guardando = ref(false)

const producto = ref({
  nombre: '',
  categoria: '',
  comuna: '',
  precio: 0,
  descripcion: '',
  imagen: '',
  stock: 0,
})

async function guardar() {
  try {
    guardando.value = true
    error.value = ''

    await crearProducto({
      ...producto.value,
      precio: Number(producto.value.precio),
      stock: Number(producto.value.stock),
    })

    router.push('/productos')
  } catch (e) {
    error.value = e.message
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <main>
    <h1>Nuevo producto</h1>

    <form @submit.prevent="guardar">
      <label>Nombre</label>
      <input v-model="producto.nombre" required />

      <label>Categoría</label>
      <input v-model="producto.categoria" required />

      <label>Comuna</label>
      <input v-model="producto.comuna" required />

      <label>Precio</label>
      <input v-model.number="producto.precio" type="number" min="0" required />

      <label>Descripción</label>
      <textarea v-model="producto.descripcion" required></textarea>

      <label>Imagen</label>
      <input v-model="producto.imagen" />

      <label>Stock</label>
      <input v-model.number="producto.stock" type="number" min="0" required />

      <p v-if="error">{{ error }}</p>

      <button :disabled="guardando">
        {{ guardando ? 'Guardando...' : 'Guardar producto' }}
      </button>
    </form>
  </main>
</template>
