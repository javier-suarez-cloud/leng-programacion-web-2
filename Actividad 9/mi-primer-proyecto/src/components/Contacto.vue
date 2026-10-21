<template>
  <form @submit.prevent="validarFormulario">
    <input v-model="nombre" placeholder="Nombre" />
    <input v-model="correo" placeholder="Correo" />
    <input v-model="telefono" placeholder="Teléfono" />
    <textarea v-model="mensaje" placeholder="Mensaje"></textarea>
    <label><input type="checkbox" v-model="newsletter" /> Suscribirse al boletín</label>
    <button type="submit">Enviar</button>
  </form>

  <div v-if="error" style="color:red">{{ error }}</div>
  <div v-if="enviado">
    <h3>Datos enviados:</h3>
    <p><strong>Nombre:</strong> {{ nombre }}</p>
    <p><strong>Correo:</strong> {{ correo }}</p>
    <p><strong>Teléfono:</strong> {{ telefono }}</p>
    <p><strong>Mensaje:</strong> {{ mensaje }}</p>
    <p><strong>Boletín:</strong> {{ newsletter ? 'Sí' : 'No' }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: '',
      newsletter: false,
      enviado: false,
      error: ''
    }
  },
  methods: {
    validarFormulario() {
      if (!this.nombre || !this.correo || !this.telefono || !this.mensaje) {
        this.error = 'Todos los campos son obligatorios';
        return;
      }
      this.enviado = true;
      this.error = '';
    }
  }
}
</script>
