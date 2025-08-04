<template>
  <div
    class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100 transition-colors"
  >
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>
