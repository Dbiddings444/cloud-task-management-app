<template>
    <div class="px-6 py-4">
        <h1 class="text-black text-2xl font-semibold">Task Form</h1>
        <form>
            <!-- Form fields for task creation/editing would go here -->
                <div class="rounded-md shadow-sm -space-y-px">
                    <FormInput v-model="form.title" label="Task Title" type="text" placeholder="Enter task title" :error="errors.title" />
                    <div class="mt-4"></div>
                    Task description
                    <div class="mt-4"></div>
                    <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black" name="" id=""></textarea>
                    <div class="mt-4"></div>
                    <assigneeSelect v-model="form.assignee" label="Assignee" />
                    <div class="mt-4"></div>
                    <PrioritySelector v-model="form.priority" :options="options" label="Priority" />
                    <div class="mt-4">
                    </div>
                </div>
                                       <div>
                    <PrimaryButton :disabled="submitting" type="submit" buttonText="Create Task"/>
                </div>
        </form>
    </div>
</template>
<script setup>
import PrioritySelector from '@/components/PrioritySelector.vue'
import FormInput from '@/components/FormInput.vue'
import assigneeSelect from '@/components/assigneeSelect.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { reactive } from 'vue'

const form = reactive({title:'', priority: '', description:'', assignee:'', assignor:''})

const options = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
  { value: 'critical', label: 'Critical', color: 'bg-purple-100 text-purple-800' },
]
const errors = reactive({ title: '', email: '', password: '', confirm: '' })
</script>