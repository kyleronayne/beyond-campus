import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingView from "../views/LandingView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/sign-up-view/SignUpView.vue";
import PropertySearchResultsView from "../views/PropertySearchResultsView.vue";
import CreateListingView from "../views/create-listing-view/CreateListingView.vue";
import SavedPropertiesView from "../views/SavedPropertiesView.vue";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/sign-in",
    name: "SignInView",
    component: SignInView,
  },
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/sign-up",
    name: "SignUpView",
    component: SignUpView,
  },
  {
    path: "/property-search-results/:school/:propertyType",
    name: "PropertySearchResultsView",
    component: PropertySearchResultsView,
    props: true,
  },
  {
    path: "/saved-properties",
    name: "SavedPropertiesView",
    component: SavedPropertiesView,
    beforeEnter(to, from, next) {
      const auth: Auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          next(true);
        } else {
          next({ path: "/sign-in" });
        }
      });
    },
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
          next({ path: "/sign-in" });
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
