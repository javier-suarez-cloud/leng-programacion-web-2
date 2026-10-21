<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  },
  favorito: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cambiar-favorito'])
</script>

<template>
  <article class="producto-card">
    <img :src="producto.imagen" :alt="producto.nombre" />

    <div class="contenido-producto">
      <span class="categoria">{{ producto.categoria }}</span>
      <h3>{{ producto.nombre }}</h3>
      <p>{{ producto.comuna }}</p>
      <strong>${{ producto.precio.toLocaleString('es-CL') }}</strong>

      <div class="acciones">
        <RouterLink :to="`/productos/${producto.id}`">
          Ver detalle
        </RouterLink>

        <button @click="emit('cambiar-favorito', producto.id)">
          {{ favorito ? '★ Favorito' : '☆ Agregar' }}
        </button>
      </div>
    </div>
  </article>
</template>
