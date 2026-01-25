<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold">{{ task?.title || 'Untitled' }}</h3>
          <div class="text-xs text-gray-500">
            {{ task ? new Date(task.createdAt).toLocaleString() : '' }}
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button @click="onClose" aria-label="Close" class="px-2">✕</button>
        </div>
      </div>

      <div class="mt-4">
        <!-- View mode -->
        <div v-if="!editing" class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img
                v-if="task?.assigneeAvatar"
                :src="task.assigneeAvatar"
                class="h-8 w-8 rounded-full object-cover"
                :alt="task.assignee"
              />
              <div>
                <div class="text-xs text-gray-500">Assignee</div>
                <div class="text-sm font-medium">{{ task?.assignee || 'Unassigned' }}</div>
              </div>
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500">Priority</div>
            <span
              :class="{
                'bg-green-100 text-green-800': task?.priority === 'low',
                'bg-yellow-100 text-yellow-800': task?.priority === 'medium',
                'bg-red-100 text-red-800': task?.priority === 'high',
                'bg-purple-100 text-purple-800': task?.priority === 'critical',
              }"
              class="px-2 inline-flex rounded-full text-xs font-semibold"
            >
              {{ task?.priority || 'none' }}
            </span>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-700">Description</h4>
            <p class="mt-1 text-sm text-gray-800">{{ task?.description || 'No description' }}</p>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="startEdit"
              class="px-4 py-1 bg-indigo-600 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </div>

        <!-- Edit mode -->
        <form v-else @submit.prevent="onSave" class="space-y-4">
          <div>
            <label class="text-xs text-gray-500">Title</label>
            <input
              v-model="local.title"
              placeholder="Title"
              class="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div>
            <label class="text-xs text-gray-500">Description</label>
            <textarea
              v-model="local.description"
              placeholder="Description"
              class="mt-1 block w-full rounded-md border-gray-300"
              rows="4"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500">Priority</label>
              <PrioritySelector v-model="local.priority" :options="priorityOptions" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Assignee</label>
              <AssigneeSelect :model-value="local.assignee" v-model="local.assignee" />
            </div>
          </div>

          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelEdit" class="px-3 py-1 border rounded-md">
              Cancel
            </button>
            <button type="submit" class="px-4 py-1 bg-indigo-600 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'
import PrioritySelector from '@/components/PrioritySelector.vue'
import AssigneeSelect from '@/components/AssigneeSelect.vue'

const props = defineProps({
  task: { type: Object, default: null },
})
const emit = defineEmits(['save', 'close'])

const local = reactive({ title: '', description: '', priority: '', assignee: '' })
const editing = ref(false)

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

watch(
  () => props.task,
  (t) => {
    if (t) {
      local.title = t.title || ''
      local.description = t.description || ''
      local.priority = t.priority || ''
      local.assignee = t.assignee || ''
    }
  },
  { immediate: true }
)

function startEdit() {
  editing.value = true
}

function cancelEdit() {
  // reset local to the prop values
  const t = props.task
  if (t) {
    local.title = t.title || ''
    local.description = t.description || ''
    local.priority = t.priority || ''
    local.assignee = t.assignee || ''
  }
  editing.value = false
}

function onSave() {
  // Basic validation could go here
  emit('save', { ...local, id: props.task?.id })
  editing.value = false
}

function onClose() {
  emit('close')
}
</script>
