<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      v-model="model"
      class="rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
    >
      <option disabled value="">Select priority</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>

    <!-- Optional: show selected badge -->
    <div v-if="selectedOption" class="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold" :class="selectedOption.color">
      {{ selectedOption.label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: { type: String, default: 'Priority' },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const options = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
  { value: 'critical', label: 'Critical', color: 'bg-purple-100 text-purple-800' },
]

const selectedOption = computed(() => options.find(o => o.value === props.modelValue))
</script>
