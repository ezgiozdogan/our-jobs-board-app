<script setup lang="ts">
import { useJobsStore } from "../stores/jobs";
import JobCard from "../components/JobCard.vue";
import { storeToRefs } from "pinia";

const jobsStore = useJobsStore();
const { jobs } = storeToRefs(jobsStore);
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold text-indigo-600 mb-6">
      Job Board Anasayfa 🚀
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </div>
</template>
