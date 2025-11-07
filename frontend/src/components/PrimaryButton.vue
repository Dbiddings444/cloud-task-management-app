<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
    @click="$emit('click')"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  buttonText: { type: String, default: 'Submit' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})
</script>

<style scoped>
</style>
