<template>
  <div class="flex flex-col gap-1">
    <select
      v-model="model"
      class="rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
    >
      <option disabled value="">Select priority</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  options: Array,
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

</script>
