<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default {};
</script>

<style>
:root {
  --theme-font: "Rubik", sans-serif;
  --theme-font-weight-bold: 700;
  --theme-color-main: #1d4bd2;
  --theme-color-main-light: #d2dbf6;
  --theme-color-main-dark: #112d7e;
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
