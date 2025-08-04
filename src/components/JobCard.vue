<template>
  <RouterLink :to="`/jobs/${job.id}`" class="block">
    <div class="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
      <h2 class="text-xl font-bold text-gray-800">{{ job.title }}</h2>
      <p class="text-gray-600">{{ job.company }} • {{ job.location }}</p>
      <p class="mt-2 text-sm text-gray-700">{{ job.description }}</p>
      <p class="mt-4 text-xs text-gray-400">Posted on: {{ formattedDate }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  const props = defineProps<{
    job: {
      id: number;
      title: string;
      company: string;
      location: string;
      category: string;
      description: string;
      postedAt: string;
      detail: string;
      job: object;
      requirements: [];
      employmentType: string;
      experienceLevel: string;
      salaryRange: string;
    };
  }>();

  const formattedDate = new Date(props.job.postedAt).toLocaleDateString();
</script>
