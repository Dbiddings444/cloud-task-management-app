<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
        <router-link
		class="flex items-center space-x-3"
          :to="{ name: 'dashboard' }"
        >
            <img src="/vite.svg" alt="logo" class="h-8 w-8" />
            <span class="font-semibold text-lg">TaskCloud</span>
        </router-link>
        </div>

        <div class="hidden md:flex md:items-center md:space-x-6">
          <a href="#" class="text-gray-700 hover:text-gray-900">Projects</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
          <router-link
		  	v-if="!hideCreateTaskButton"
            :to="{ name: 'taskForm' }"
            class="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
          >
            Create Task
          </router-link>
        </div>

        <div class="flex items-center md:hidden">
          <button
            @click="open = !open"
            aria-label="Toggle menu"
            class="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg
              v-if="!open"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-show="open" class="md:hidden border-t border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >Home</a
        >
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >Projects</a
        >
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >About</a
        >
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >Sign in</a
        >
        <router-link
          v-if="!hideCreateTaskButton"
          :to="{ name: 'taskForm' }"
          class="block mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Task
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideCreateTaskButton = computed(() => route.meta?.hideCreateTaskButton)
const open = ref(false)
</script>

<!-- Tailwind utility classes are used; no local styles required -->
