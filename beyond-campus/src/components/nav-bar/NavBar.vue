<template>
  <div id="navbar">
    <div id="left-links-container">
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
      <router-link
        class="link"
        v-bind:to="{ path: '/saved-properties', name: 'SavedPropertiesView' }"
        >Saved Properties</router-link
      >
      <div id="profile-link-container" v-if="isLoggedIn">
        <a id="profile-main-link" class="link no-hover">
          <img
            id="profile-icon"
            src="../nav-bar/assets/profile-icon.svg"
            alt="White user profile icon"
          />
          <span id="username">{{ userFirstName }}</span>
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
import * as Firestore from "firebase/firestore";
import database from "@/main";

export default defineComponent({
  name: "NavBar",
  data() {
    let auth: Auth = getAuth();
    let isLoggedIn = false;
    let userFirstName = "";
    let showProfileQuickLinks = false;

    return {
      auth,
      isLoggedIn,
      userFirstName,
      showProfileQuickLinks,
    };
  },
  mounted() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = user ? true : false;
      this.getUserFirstName();
    });
  },
  methods: {
    /**
     * Gets the first name of current user
     */
    getUserFirstName(): void {
      if (this.auth.currentUser) {
        if (
          this.auth.currentUser!.providerData[0].providerId === "google.com"
        ) {
          this.userFirstName =
            this.auth.currentUser!.displayName!.split(" ")[0];
        } else {
          const userDoc: Firestore.DocumentReference = Firestore.doc(
            database,
            `Users/${this.auth.currentUser!.uid}`
          );

          Firestore.getDoc(userDoc).then(
            (docSnaphot: Firestore.DocumentSnapshot) => {
              if (docSnaphot.exists()) {
                this.userFirstName = docSnaphot.data().firstName;
              }
            }
          );
        }
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
