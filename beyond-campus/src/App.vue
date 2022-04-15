<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "/src/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
});
</script>

<style>
:root {
  --theme-font: "Rubik", sans-serif;
  --theme-font-weight-bold: 700;
  --theme-color-main: #1d4bd2;
  --theme-color-main-light: #d2dbf6;
  --theme-color-main-dark: #112d7e;
  --theme-color-delete: #c70000;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  width: 100vw;
  font-family: var(--theme-font);
}
</style>
