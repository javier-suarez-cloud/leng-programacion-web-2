<template>
  <div id="app">
    <Padre />
    <Atractivos />
  </div>
</template>

<script>
import Padre from './components/Padre.vue'
import Atractivos from './components/Atractivos.vue'

export default {
  components: {
    Padre,
    Atractivos
  }
}
</script>
