<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-12 w-auto" src="/vite.svg" alt="Workflow" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">Or <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">create a new account</a></p>
			</div>
			<form class="mt-8 space-y-6" @submit.prevent="onSubmit">
				<div class="rounded-md shadow-sm -space-y-px">
					<FormInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" :error="errors.email" />
					<div class="mt-4"></div>
					<FormInput v-model="form.password" label="Password" type="password" placeholder="Enter your password" :error="errors.password" />
				</div>

				<div>
					<PrimaryButton :disabled="submitting" type="submit">Sign in</PrimaryButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormInput from '@/components/FormInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const submitting = ref(false)

function validate() {
	errors.email = ''
	errors.password = ''
	let ok = true
	if (!form.email) { errors.email = 'Email is required'; ok = false }
	if (!form.password) { errors.password = 'Password is required'; ok = false }
	return ok
}

async function onSubmit() {
	if (!validate()) return
	submitting.value = true
	// Mock async auth
	await new Promise(r => setTimeout(r, 600))
	submitting.value = false
	// On success navigate to dashboard
	router.push({ name: 'dashboard' })
}
</script>

<style scoped>
</style>

