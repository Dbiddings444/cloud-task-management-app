<template>
  <div class="flex flex-col gap-1">
    <select
      v-model="model"
      class="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
    >
      <option disabled value="">Select assignee</option>
      <option v-for="person in assignees" :key="person.id" :value="person.name">
        {{ person.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
const props = defineProps({
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

const assignees = ref([])

async function loadAssignees() {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }
    await fetch('/api/auth/getUsers', options)
    .then(res => res.json())
    .then(body => {
      if (body && Array.isArray(body.users)) {
        // Map backend users to the assignee shape
        assignees.value = body.users.map((u, idx) => ({
        id: u.id,
        name: u.name,
        avatar: `https://i.pravatar.cc/40?img=${(u.id % 70) + 1}`,
      }))
    }
  })
  .catch(err => {console.log(err)});
}
    //When component is loaded loadAssignees should be called.
onMounted(() => {
  loadAssignees()
})

// this makes v-model work properly with parent
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
