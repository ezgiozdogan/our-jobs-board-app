import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/JobListView.vue";
import JobDetail from "@/views/JobDetail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/jobs/:id", name: "JobDetail", component: JobDetail },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
