<script setup>
import { computed } from 'vue'

const props = defineProps({
  producto: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['ver-detalle'])

const precioCLP = computed(() =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(props.producto.precio)
)
</script>

<template>
  <article class="card">
    <img
      class="card__img"
      :src="producto.imagen"
      :alt="producto.nombre"
      loading="lazy"
    />

    <div class="card__body">
      <span class="card__cat">{{ producto.categoria }}</span>
      <h3 class="card__title">{{ producto.nombre }}</h3>
      <p class="card__price">{{ precioCLP }}</p>

      <button class="card__btn" @click="emit('ver-detalle', producto)">
        Ver detalle
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-rows: 190px 1fr;
  overflow: hidden;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 5px 18px rgba(15, 23, 42, 0.06);
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}
.card__img { width: 100%; height: 100%; object-fit: cover; }
.card__body { display: flex; flex-direction: column; padding: 16px; }
.card__cat {
  align-self: flex-start;
  padding: 4px 9px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: .78rem;
  font-weight: 700;
}
.card__title { margin: 10px 0 6px; font-size: 1.08rem; }
.card__price { margin: auto 0 14px; font-size: 1.05rem; font-weight: 800; }
.card__btn {
  border: 0;
  border-radius: 10px;
  padding: 10px 14px;
  background: #1d4ed8;
  color: white;
  font-weight: 700;
}
.card__btn:hover { background: #1e40af; }
</style>
