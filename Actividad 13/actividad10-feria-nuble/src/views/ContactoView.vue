<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const mensaje = ref('')
const error = ref('')
const enviado = ref(false)

function enviar() {
  if (!nombre.value || !correo.value || !mensaje.value) {
    error.value = 'Debe completar todos los campos.'
    enviado.value = false
    return
  }

  error.value = ''
  enviado.value = true
}
</script>

<template>
  <section class="pagina">
    <h1>Contacto</h1>

    <form class="formulario" @submit.prevent="enviar">
      <label>Nombre</label>
      <input v-model="nombre" type="text" />

      <label>Correo electrónico</label>
      <input v-model="correo" type="email" />

      <label>Mensaje</label>
      <textarea v-model="mensaje" rows="5"></textarea>

      <button type="submit">Enviar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="enviado" class="correcto">Mensaje registrado correctamente.</p>
  </section>
</template>
