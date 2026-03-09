<template>
  <div class="px-6 py-4">
    <h1 class="text-black text-2xl font-semibold">Task Form</h1>
    <form @submit.prevent="onSubmit">
      <!-- Form fields for task creation/editing would go here -->
      <div class="rounded-md shadow-sm -space-y-px">
        <FormInput
          v-model="form.title"
          label="Task Title"
          type="text"
          placeholder="Enter task title"
          :error="errors.title"
        />
        <div class="mt-4"></div>
        Task description
        <div class="mt-4"></div>
        <textarea
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
          v-model="form.description"
        ></textarea>
        <div class="mt-4"></div>
        Assignee
        <div class="mt-4"></div>
        <AssigneeSelect v-model="form.assignee" label="Assignee" />
        <div class="mt-4"></div>
        Priority
        <div class="mt-4"></div>
        <PrioritySelector v-model="form.priority" :options="priorityOptions" label="Priority" />
        <div class="mt-4"></div>
      </div>
      <div>
        <PrimaryButton :disabled="submitting" type="submit" buttonText="Create Task" />
      </div>
    </form>
  </div>
</template>
<script setup>
import PrioritySelector from '@/components/PrioritySelector.vue'
import FormInput from '@/components/FormInput.vue'
import AssigneeSelect from '@/components/AssigneeSelect.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({ 
  title: '', 
  priority: '', 
  description: '', 
  assignee: '', 
  assignor: '' 
})

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
  { value: 'critical', label: 'Critical', color: 'bg-purple-100 text-purple-800' },
]
const errors = reactive({ title: '', priority: '', description: '', assignee: '' })
const submitting = ref(false)
  
async function onSubmit() {
  const token = localStorage.getItem('auth_token');
submitting.value = true;

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  body: JSON.stringify(form)
}

await fetch('/api/auth/createTask', options)
  .then(response => response.json())
  .then(data => {
    if (data.errors) {
      Object.assign(errors, data.errors)
    } else {
      // Handle successful task creation
        console.log(options.body)
        router.push({ name: 'dashboard' })
    }
  })
  .catch(error => {
    console.error('Error creating task:', error)
  })
  .finally(() => {
    submitting.value = false
  })
}
</script>
