<template>
  <div id="app">
    <Padre />
    <Contacto />
  </div>
</template>

<script>
import Padre from './components/Padre.vue'
import Contacto from './components/Contacto.vue'

export default {
  components: {
    Padre,
    Contacto
  }
}
</script>
