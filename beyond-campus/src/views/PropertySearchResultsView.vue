<template>
  <div>
    <NavBar></NavBar>
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import FilterBar from "../components/FilterBar.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { NavBar, FilterBar },
  data() {
    return {
      school: "",
      propertyType: "",
    };
  },
  mounted() {
    const route = useRoute();
    this.school = route.params.school.toString();
    this.propertyType = route.params.propertyType.toString();
  },
});
</script>

<style scoped></style>
