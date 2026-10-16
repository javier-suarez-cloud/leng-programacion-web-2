<template>
  <div>
    <Hijo mensaje="Hola desde el padre" />
  </div>
</template>
<script>
import Hijo from './Hijo.vue'
export default {
  components: {
    Hijo
  }
}
</script>
