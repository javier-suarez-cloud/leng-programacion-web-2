<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const producto = ref(null)
const cargando = ref(true)

// El detalle ahora se consulta a la API: GET /productos/:id
onMounted(async () => {
  try {
    const respuesta = await fetch(`http://localhost:3000/productos/${route.params.id}`)
    producto.value = respuesta.ok ? await respuesta.json() : null
  } catch (e) {
    console.error(e)
    producto.value = null
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <section class="pagina">
    <p v-if="cargando">Cargando producto...</p>

    <div v-else-if="producto" class="detalle-producto">
      <img :src="producto.imagen" :alt="producto.nombre" />

      <div>
        <span>{{ producto.categoria }}</span>
        <h1>{{ producto.nombre }}</h1>
        <p>Comuna: {{ producto.comuna }}</p>
        <p>{{ producto.descripcion }}</p>
        <h2>${{ producto.precio.toLocaleString('es-CL') }}</h2>
        <RouterLink to="/productos">← Volver al catálogo</RouterLink>
      </div>
    </div>

    <div v-else>
      <h2>Producto no encontrado</h2>
      <RouterLink to="/productos">Volver</RouterLink>
    </div>
  </section>
</template>
