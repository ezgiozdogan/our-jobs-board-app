<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-wrap gap-4 justify-start items-center">
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search jobs..."
        class="filter-input"
      />

      <select 
        v-model="selectedCategory"
        @change="selectCategory($event.target.value)"
        class="filter-input"
      >
        <option value="All">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <select
        v-model="selectedLocation"
        @change="onLocationChange"
        class="filter-input"
      >
        <option value="">All Locations</option>
        <option v-for="loc in locations" :key="loc" :value="loc">
          {{ loc }}
        </option>
      </select>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-700 dark:text-gray-200">Sort:</span>
        <button
          @click="setSort('desc')"
          :class="[
            'px-3 py-1 rounded-full text-sm border transition',
            selectedSort === 'desc'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600',
          ]"
        >
          Newest First
        </button>
        <button
          @click="setSort('asc')"
          :class="[
            'px-3 py-1 rounded-full text-sm border transition',
            selectedSort === 'asc'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600',
          ]"
        >
          Oldest First
        </button>
      </div>
      <button
        @click="resetFilters"
        class="text-sm px-3 py-2 rounded-md border bg-red-50 text-red-700 hover:bg-red-100 transition"
      >
        Clear Filters
      </button>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <JobCard v-for="job in paginatedJobs" :key="job.id" :job="job" />
    </div>

    <div class="flex justify-center items-center gap-2 mt-8">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="setPage(page)"
        :class="[
          'pagination-btn',
          currentPage === page
            ? 'bg-indigo-600 text-black'
            : 'bg-white hover:bg-gray-100 dark:text-black',
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useJobsStore } from "@/stores/jobs";
import { storeToRefs } from "pinia";
import JobCard from "@/components/JobCard.vue";

const store = useJobsStore();

const {
  categories,
  selectedCategory,
  selectedLocation,
  selectedSort,
  searchQuery,
  paginatedJobs,
  totalPages,
  currentPage,
} = storeToRefs(store);

const { fetchJobs, setCategory, setSearch, setLocation, setPage, setSort } =
  store;

const resetFilters = () => {
  setCategory('All')
  setLocation('')
  setSearch('')
  setSort('desc')
  setPage(1)
}

onMounted(() => {
  fetchJobs();
});

const onSearch = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  setSearch(value);
};

const selectCategory = (cat: string) => {
  setCategory(cat);
};

const onLocationChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  setLocation(value);
};

const prevPage = () => {
  if (currentPage.value > 1) setPage(currentPage.value - 1);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) setPage(currentPage.value + 1);
};

const locations = computed(() => {
  const locs = store.jobs.map((job) => job.location);
  return [...new Set(locs)];
});
</script>

<style scoped>
.filter-input {
  @apply max-w-[200px] w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-black;
}
.pagination-btn {
  @apply px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-40 dark:text-black;
}
</style>
