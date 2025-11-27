<template>
  <button>
    <slot name="text" />
  </button>
</template>
<script lang="ts">

export default defineComponent({

})
</script>
<style scoped>
button {
  background-color: var(--green-500);
  color: var(--white);
}
</style>
