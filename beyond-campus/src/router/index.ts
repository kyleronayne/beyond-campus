import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingView from "../views/LandingView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import PropertySearchResultsView from "../views/PropertySearchResultsView.vue";
import CreateListingView from "../views/create-listing-view/CreateListingView.vue";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
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
    beforeEnter(to, from, next) {
      const auth: Auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          next(true);
        } else {
          next({ path: "/login" });
        }
      });
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
