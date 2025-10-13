<template>
  <NavBar class="fixed top-0 w-full" v-if="showNav" />

  <!-- Offset content so fixed navbar doesn't overlap -->
  <div class="pt-16">
    <router-view />
  </div>
</template>

<script setup>
import NavBar from './components/navBar.vue'   // optional
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const showNav = computed(() => !route.meta?.hideNav)
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>