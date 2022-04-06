import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingView from "../views/LandingView.vue";
import PropertySearchResultsView from "../views/PropertySearchResultsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/property-search-results",
    name: "PropertySearchResultsView",
    component: PropertySearchResultsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
