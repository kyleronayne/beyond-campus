import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import LandingView from "../views/LandingView.vue";
import PropertySearchResultsView from "../views/PropertySearchResultsView.vue";
import CreateListingView from "../views/CreateListingView.vue";
import SignupView from "../views/SignupView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/landing",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/signup",
    name: "SignupView",
    component: SignupView,
  },
  {
    path: "/property-search-results",
    name: "PropertySearchResultsView",
    component: PropertySearchResultsView,
  },
  {
    path: "/create-listing",
    name: "CreateListingView",
    component: CreateListingView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
