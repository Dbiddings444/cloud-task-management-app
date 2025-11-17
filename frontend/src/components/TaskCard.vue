<template>
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
  <div class="md:flex">
    <div class="p-8 w-full">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{{ task.title }}</div>
      <div class="mt-6 text-xs leading-5 font-semibold flex items-center space-x-2">
        <img 
        :src="task.assigneeAvatar" 
        class="h-6 w-6 rounded-full object-cover" 
        alt="avatar"
      />
      <span class="text-sm text-gray-700 font-medium">{{ task.assignee }}</span>
      </div>
      <div class="mt-2 text-xs leading-5 font-semibold">
        Priority:
        <span
          :class="{
            'bg-green-100 text-green-800': task.priority === 'low',
            'bg-yellow-100 text-yellow-800': task.priority === 'medium',
            'bg-red-100 text-red-800': task.priority === 'high'
          }"
          class="px-2 inline-flex rounded-full"
        >
           {{ task.priority }}
        </span>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>  
const props = defineProps({
  task: {
    type: Object,
    required: false,
  }
})
</script>