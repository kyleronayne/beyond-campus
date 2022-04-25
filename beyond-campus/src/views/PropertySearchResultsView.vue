<template>
  <div id="property-search-results-view">
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterBar from "../components/FilterBar.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PropertySearchResultsView",
  components: { FilterBar },
  data() {
    const route = useRoute();
    const school: string = route.params.school.toString();
    const propertyType: string = route.params.propertyType.toString();

    return {
      school,
      propertyType,
    };
  },
  mounted() {
    this.getProperties();
  },
  methods: {
    getProperties() {
      console.log("Getting Properties");
    },
  },
});
</script>

<style scoped></style>
