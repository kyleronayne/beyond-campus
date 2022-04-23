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
      <a id="profile-link" class="link no-hover" v-if="isLoggedIn">
        <img
          id="profile-icon"
          src="../assets/navbar/images/profile-icon.svg"
          alt="White user profile icon"
        />
        <span id="username">{{ getUsername() }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  name: "NavBar",
  data() {
    let auth: Auth = getAuth();
    let isLoggedIn = false;

    return {
      auth,
      isLoggedIn,
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
  },
});
</script>

<style scoped>
/* ID Selectors */
#navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: var(--theme-color-main);
  position: sticky;
  top: 0;
  width: 100%;
}

#left-links-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

#title {
  padding: 0rem 6rem 0rem 6rem;
  text-align: center;
  font-size: 48px;
  font-weight: var(--theme-font-weight-bold);
}

#landing-link {
  color: white;
  text-decoration: none;
}

#right-links-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

#profile-link {
  display: flex;
  align-items: center;
}

#username {
  padding-left: 0.5rem;
}

/* Class Selectors */
.link {
  padding: 0.6rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: var(--theme-color-main-dark);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: 0.2s linear;
}

.link.no-hover:hover {
  transform: none;
}
.link:hover {
  transform: translateY(-5px);
}
</style>
