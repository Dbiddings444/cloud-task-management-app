<template>
<div v-if="isOpen">
<TaskOverlay
    @close="isOpen = false"
    :task="selectedTask"
 />
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
                                @click=openTaskOverlay(task)
                            />
                            <p v-if="tasksByStatus(col.key).length === 0" class="text-xs text-gray-400">No tasks</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script setup>
import TaskCard from '@/components/TaskCard.vue';
import TaskOverlay from '@/components/overlays/TaskOverlay.vue';
import sampleTasks from '@/data/mockTask.js';
import columns from '@/data/columns.js';
import { ref } from 'vue';
function tasksByStatus(status) {
    return sampleTasks.filter(t => (t.status || '').toLowerCase() === status)
}
 const isOpen = ref(false);
 const selectedTask = ref(null);
 function openTaskOverlay(task) {
    isOpen.value = true;
    selectedTask.value = task;
    console.log('###', task)
 }
</script>
