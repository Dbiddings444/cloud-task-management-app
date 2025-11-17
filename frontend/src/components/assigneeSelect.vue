<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    
    <select
      v-model="model"
      class="rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
    >
      <option disabled value="">Select assignee</option>
      <option 
        v-for="person in assignees" 
        :key="person.id" 
        :value="person.id"
      >
        {{ person.name }}
      </option>
    </select>

    <!-- Optional: show selected user -->
    <div v-if="selectedAssignee" class="mt-2 flex items-center gap-2"> 
      <img 
        v-if="selectedAssignee.avatar" 
        :src="selectedAssignee.avatar" 
        class="h-6 w-6 rounded-full object-cover" 
        alt="avatar"
      />
      <span class="text-sm text-gray-700 font-medium">{{ selectedAssignee.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: 'Assignee' }
})

const emit = defineEmits(['update:modelValue'])

// placeholder data until backend exists
const assignees = ref([
  { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 2, name: 'Taylor Smith', avatar: 'https://i.pravatar.cc/40?img=4' },
  { id: 3, name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/40?img=5' },
  { id: 4, name: 'Morgan Brown', avatar: 'https://i.pravatar.cc/40?img=6' },
])

// this makes v-model work properly with parent
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// computed to find which person is currently selected
const selectedAssignee = computed(() => 
  assignees.value.find(a => a.id === props.modelValue)
)
</script>
