<template>
  <div class="px-6 py-10 max-w-5xl mx-auto">
    <div v-if="job" class="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
      <button
        @click="goBack"
        class="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
      >
        ← Back to All Listings
      </button>

      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold text-gray-900">{{ job.title }}</h1>
        <p class="text-lg text-gray-700">
          <span class="font-semibold">{{ job.company }}</span> - {{ job.location }}
        </p>
        <p class="text-sm text-gray-400">Publishing Date: {{ formattedDate }}</p>
      </div>

      <div class="flex flex-wrap gap-2 text-sm">
        <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          #{{ job.category }}
        </span>
        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          📍 {{ job.location }}
        </span>
        <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          💼 {{ job.employmentType }}
        </span>
        <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          🎯 {{ job.experienceLevel }}
        </span>
        <span class="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
          💰 {{ job.salaryRange }}
        </span>
      </div>

      <div class="prose max-w-none text-gray-800">
        <p>{{ job.detail }}</p>
      </div>

      <div v-if="job.requirements?.length" class="space-y-3">
        <h2 class="text-xl font-semibold text-gray-900 mt-6">Requirements</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
          <li v-for="(req, i) in job.requirements" :key="i">
            {{ req }}
          </li>
        </ul>
      </div>

      <div>
        <button
          class="mt-6 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
        >
          Apply Now
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 text-lg mt-20">
      Job not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"
import { useJobsStore } from "@/stores/jobs"

const route = useRoute()
const router = useRouter()
const store = useJobsStore()

const jobId = Number(route.params.id)
const job = computed(() => store.jobs.find((j) => j.id === jobId))

const formattedDate = computed(() =>
  job.value
    ? new Date(job.value.postedAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      })
    : ""
)

const goBack = () => {
  router.back()
}
</script>
