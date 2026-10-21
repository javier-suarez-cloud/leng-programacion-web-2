<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { actualizarProducto, obtenerProducto } from '../services/productosService'

const route = useRoute()

const producto = ref(null)
const cargando = ref(true)
const error = ref('')
const editando = ref(false)

async function cargar() {
  try {
    cargando.value = true
    error.value = ''
    producto.value = await obtenerProducto(route.params.id)
  } catch (e) {
    error.value = e.message
    producto.value = null
  } finally {
    cargando.value = false
  }
}

async function guardarCambios() {
  try {
    await actualizarProducto(route.params.id, {
      nombre: producto.value.nombre,
      categoria: producto.value.categoria,
      comuna: producto.value.comuna,
      precio: Number(producto.value.precio),
      descripcion: producto.value.descripcion,
      imagen: producto.value.imagen,
      stock: Number(producto.value.stock),
    })

    editando.value = false
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

function cancelar() {
  editando.value = false
  cargar()
}

onMounted(cargar)
</script>

<template>
  <section class="pagina">
    <p v-if="cargando">Cargando producto...</p>

    <div v-else-if="!producto">
      <h2>{{ error || 'Producto no encontrado' }}</h2>
      <RouterLink to="/productos">Volver</RouterLink>
    </div>

    <!-- Modo lectura -->
    <div v-else-if="!editando" class="detalle-producto">
      <img v-if="producto.imagen" :src="producto.imagen" :alt="producto.nombre" />

      <div>
        <span>{{ producto.categoria }}</span>
        <h1>{{ producto.nombre }}</h1>
        <p>Comuna: {{ producto.comuna }}</p>
        <p>{{ producto.descripcion }}</p>
        <p>Stock: {{ producto.stock }}</p>
        <h2>${{ Number(producto.precio).toLocaleString('es-CL') }}</h2>
        <p v-if="error" class="error">{{ error }}</p>
        <button @click="editando = true">Editar</button>
        <RouterLink to="/productos">← Volver al catálogo</RouterLink>
      </div>
    </div>

    <!-- Modo edición -->
    <form v-else class="formulario" @submit.prevent="guardarCambios">
      <h1>Editar producto</h1>

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

      <p v-if="error" class="error">{{ error }}</p>

      <div class="acciones">
        <button type="submit">Guardar cambios</button>
        <button type="button" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </section>
</template>
