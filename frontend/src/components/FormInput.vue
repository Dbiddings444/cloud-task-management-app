<template>
  <label class="block">
    <span class="text-sm font-medium text-gray-700">{{ label }}</span>
    <input
      :type="type"
      v-model="internalValue"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
      @input="$emit('update:modelValue', internalValue)"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </label>
</template>

<script setup>
import { ref, watch, } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' },
})

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, v => (internalValue.value = v))
</script>

<style scoped>
input {
  padding: 0.5rem 0.75rem;
}
</style>
