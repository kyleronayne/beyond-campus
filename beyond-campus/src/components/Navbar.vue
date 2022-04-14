<template>
  <div class="navbar">
    <div class="navbar__left-links">
      <a class="navbar__link">Rent</a>
      <a class="navbar__link">List A Property</a>
    </div>
    <h1 class="navbar__title">
      <router-link
        class="title__router-link"
        v-bind:to="{ path: '/', name: 'LandingView' }"
        >Beyond Campus</router-link
      >
    </h1>
    <div class="navbar__right-links">
      <a class="navbar__link">Saved Properties</a>
      <a class="navbar__link profile-link">
        <img
          class="profile-link__icon"
          src="../assets/navbar/images/profile-icon.svg"
          alt="White user profile icon"
        />
        <span class="profile-link__username"></span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: var(--theme-color-main);
}

.navbar__left-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar__title {
  padding: 0rem 6rem 0rem 6rem;
  text-align: center;
  font-size: 48px;
  font-weight: var(--theme-font-weight-bold);
}

.title__router-link {
  color: white;
  text-decoration: none;
}

.navbar__right-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar__link {
  padding: 0.6rem;
  text-align: center;
  color: white;
  background-color: var(--theme-color-main-dark);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: 0.2s linear;
}

.navbar__link:hover {
  transform: translateY(-5px);
}

[class*="profile-link"] {
  display: flex;
  align-items: center;
}
</style>
