<template>
	<div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
		<div class="bg-white rounded-lg max-w-2xl w-full p-6">
			<div class="flex justify-between items-center">
				<h3 class="text-lg font-semibold">Edit Task</h3>
				<button @click="onClose" aria-label="Close">✕</button>
			</div>

			<form @submit.prevent="onSave" class="mt-4 space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700">Title</label>
					<input v-model="local.title" class="mt-1 block w-full rounded-md border-gray-300" />
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700">Description</label>
					<textarea v-model="local.description" class="mt-1 block w-full rounded-md border-gray-300" rows="4"></textarea>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700">Priority</label>
						<PrioritySelector v-model="local.priority" :options="priorityOptions" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Assignee</label>
						<input v-model="local.assignee" class="mt-1 block w-full rounded-md border-gray-300" />
					</div>
				</div>

				<div class="flex justify-end space-x-2">
					<button type="button" @click="onClose" class="px-3 py-1 border rounded-md">Cancel</button>
					<button type="submit" class="px-4 py-1 bg-indigo-600 text-white rounded-md">Save</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
import PrioritySelector from '@/components/PrioritySelector.vue'

const props = defineProps({
	task: { type: Object, default: null },
	visible: { type: Boolean, default: false }
})
const emit = defineEmits(['save', 'close'])

const local = reactive({ title: '', description: '', priority: '', assignee: '' })

const priorityOptions = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
	{ value: 'critical', label: 'Critical' }
]

watch(() => props.task, (t) => {
	if (t) {
		local.title = t.title || ''
		local.description = t.description || ''
		local.priority = t.priority || ''
		local.assignee = t.assignee || ''
	}
}, { immediate: true })

function onSave() {
	// Basic validation could go here
	emit('save', { ...local, id: props.task?.id })
}

function onClose() {
	emit('close')
}
</script>