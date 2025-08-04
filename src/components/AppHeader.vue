<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition-colors"
  >
    <router-link to="/" class="text-2xl font-bold hover:underline">
      <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Careerly
      </h1>
    </router-link>
    <button
      @click="toggleDark"
      class="text-2xl px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span v-if="isDark">🌞</span>
      <span v-else>🌙</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  isDark.value = saved === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>
