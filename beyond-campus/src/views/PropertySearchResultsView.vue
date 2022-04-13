<template>
  <div>
    <Navbar></Navbar>
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
  </div>
</template>

<script lang="ts">
import Navbar from "../components/Navbar.vue";
import FilterBar from "../components/FilterBar.vue";
import { useRoute } from "vue-router";

export default {
  components: { Navbar, FilterBar },
  data() {
    return {
      school: "",
      propertyType: "",
    };
  },
  mounted() {
    const route = useRoute();
    this.school = route.params.school;
    this.propertyType = route.params.propertyType;
  },
};
</script>

<style scoped></style>
