<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  producto: { type: Object, default: null },
  visible: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])

function onKeydown(event) {
  if (props.visible && event.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="visible && producto" class="overlay" @click.self="emit('close')">
    <section class="modal" role="dialog" aria-modal="true">
      <header class="modal__header">
        <div>
          <small>{{ producto.categoria }}</small>
          <h2>{{ producto.nombre }}</h2>
        </div>
        <button class="modal__close" @click="emit('close')" aria-label="Cerrar">
          ×
        </button>
      </header>

      <img class="modal__img" :src="producto.imagen" :alt="producto.nombre" />

      <div class="modal__content">
        <p>{{ producto.descripcion }}</p>
        <p class="modal__price">
          Precio: ${{ Number(producto.precio).toLocaleString('es-CL') }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, .65);
}
.modal {
  width: min(680px, 100%);
  overflow: hidden;
  border-radius: 18px;
  background: white;
  box-shadow: 0 25px 80px rgba(0, 0, 0, .3);
}
.modal__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  padding: 18px;
  border-bottom: 1px solid #e5e7eb;
}
.modal__header h2 { margin: 2px 0 0; }
.modal__header small { color: #64748b; }
.modal__close {
  border: 0;
  background: transparent;
  font-size: 2rem;
  line-height: 1;
  color: #475569;
}
.modal__img { width: 100%; height: 300px; object-fit: cover; }
.modal__content { padding: 18px; }
.modal__content p { line-height: 1.55; }
.modal__price { font-size: 1.05rem; font-weight: 800; }
</style>
