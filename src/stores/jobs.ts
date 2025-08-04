import { defineStore } from "pinia";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [] as Job[],
    searchQuery: "",
    selectedCategory: "All",
    selectedLocation: "",
    selectedSort: "desc",
    currentPage: 1,
    jobsPerPage: 9,
  }),

  getters: {
    filteredJobs(state): Job[] {
      let filtered = [...state.jobs];

      if (state.selectedCategory !== "All") {
        filtered = filtered.filter(
          (job) => job.category === state.selectedCategory,
        );
      }

      if (state.selectedLocation) {
        filtered = filtered.filter(
          (job) => job.location === state.selectedLocation,
        );
      }

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query),
        );
      }

      if (state.selectedSort === "asc") {
        filtered.sort(
          (a, b) =>
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime(),
        );
      } else {
        filtered.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
        );
      }

      return filtered;
    },

    paginatedJobs(state): Job[] {
      const start = (state.currentPage - 1) * state.jobsPerPage;
      const end = start + state.jobsPerPage;
      return this.filteredJobs.slice(start, end);
    },

    totalPages(state): number {
      return Math.ceil(this.filteredJobs.length / state.jobsPerPage);
    },

    categories(state): string[] {
      const unique = new Set(state.jobs.map((job) => job.category));
      return ["All", ...Array.from(unique)];
    },
  },

  actions: {
    async fetchJobs() {
      this.jobs = await import("@/data/jobs.json").then((m) => m.default);
    },

    setSearch(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
    },

    setCategory(category: string) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },

    setLocation(location: string) {
      this.selectedLocation = location;
      this.currentPage = 1;
    },

    setSort(order: "asc" | "desc") {
      this.selectedSort = order;
      this.currentPage = 1;
    },

    setPage(page: number) {
      this.currentPage = page;
    },
  },
});

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  detail?: string;
  postedAt: string;
};
