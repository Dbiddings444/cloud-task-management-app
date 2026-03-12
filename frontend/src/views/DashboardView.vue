<template>
  <div v-if="isOpen">
    <TaskOverlay @close="isOpen = false" @save="updateTask" :task="selectedTask" />
  </div>
  <div class="px-6 py-4">
    <h1 class="text-black text-2xl font-semibold">Dashboard</h1>
    <p class="mt-2 text-gray-700">Welcome to the dashboard view!</p>
    <div class="mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="col in columns" :key="col.key" class="bg-gray-50 rounded-md p-3">
          <h3 class="text-sm font-semibold mb-2">{{ col.title }}</h3>
          <div class="space-y-3">
            <TaskCard
              v-for="task in tasksByStatus(col.key)"
              :key="task.id"
              :task="task"
              @click="openTaskOverlay(task)"
            />
            <p v-if="tasksByStatus(col.key).length === 0" class="text-xs text-gray-400">No tasks</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TaskCard from '@/components/TaskCard.vue'
import TaskOverlay from '@/components/overlays/TaskOverlay.vue'
import { ref, onMounted } from 'vue'

const columns = [
  { key: 'backlog', title: 'Backlog' },
  { key: 'todo', title: 'To Do' },
  { key: 'in-progress', title: 'In Progress' },
  { key: 'review', title: 'Review' },
  { key: 'done', title: 'Done' },
]
const isOpen = ref(false)
const selectedTask = ref(null)
const tasks = ref([])

function tasksByStatus(status) {
  return tasks.value.filter((t) => (t.status || '').toLowerCase() === status)
}

function openTaskOverlay(task) {
  isOpen.value = true
  selectedTask.value = task
}
async function loadTasks() {
  const jsonToken = localStorage.getItem('auth_token')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jsonToken}`
    },
  }
  return fetch('/api/auth/getAllTasks', options)
    .then(res => res.json())
    .then(data => {
      console.log('Fetched tasks:', data);
      tasks.value = data
    })
    .catch(error => {
      console.error('Error fetching task:', error)
    })
}

  async function updateTask(updatedTask) {
  const token = localStorage.getItem('auth_token');

  const options = {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  body: JSON.stringify(updatedTask)
  }

  await fetch(`/api/auth/updateTask/${updatedTask.id}`, options)
    .then(res => res.json())
    .then(data => {
      console.log('Updated task:', data);
      loadTasks()
    })
    .catch(error => {
      console.error('Error updating task:', error)
    })
}


onMounted(loadTasks)
</script>
