<template>
  <div id="navbar">
    <div id="left-links-container">
      <a class="link">Rent</a>
      <router-link
        class="link"
        v-bind:to="{ path: '/create-listing', name: 'CreateListingView' }"
        >List A Property</router-link
      >
    </div>
    <h1 id="title">
      <router-link
        id="landing-link"
        v-bind:to="{ path: '/', name: 'LandingView' }"
        >Beyond Campus</router-link
      >
    </h1>
    <div id="right-links-container">
      <a class="link">Saved Properties</a>
      <div id="profile-link-container" v-if="isLoggedIn">
        <a id="profile-main-link" class="link no-hover">
          <img
            id="profile-icon"
            src="../nav-bar/assets/profile-icon.svg"
            alt="White user profile icon"
          />
          <span id="username">{{ getUsername() }}</span>
        </a>
        <div id="profile-quick-links-container">
          <a class="profile-quick-link" v-on:click="didClickSignOut"
            >Sign Out</a
          >
          <a class="profile-quick-link">Manage Properties</a>
        </div>
      </div>
      <router-link
        class="link"
        v-else
        v-bind:to="{ path: '/sign-in', name: 'SignInView' }"
        >Sign In</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default defineComponent({
  name: "NavBar",
  data() {
    let auth: Auth = getAuth();
    let isLoggedIn = false;
    let showProfileQuickLinks = false;

    return {
      auth,
      isLoggedIn,
      showProfileQuickLinks,
    };
  },
  mounted() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = user ? true : false;
    });
  },
  methods: {
    /**
     * Returns the username of the current user
     */
    getUsername(): string {
      if (this.auth.currentUser!.providerData[0].providerId === "google.com") {
        return this.auth.currentUser!.displayName!.split(" ")[0];
      } else {
        return "";
      }
    },
    /**
     * Signs the user out of their account
     */
    didClickSignOut(): void {
      if (this.auth) {
        signOut(this.auth);
      }
    },
  },
});
</script>

<style scoped>
@import "../nav-bar/NavBar.css";
</style>
