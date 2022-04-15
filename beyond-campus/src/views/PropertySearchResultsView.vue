<template>
  <div class="property-search-results">
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterBar from "../components/FilterBar.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { FilterBar },
  data() {
    const route = useRoute();
    return {
      school: route.params.school,
      propertyType: route.params.propertyType,
    };
  },
});
</script>

<style scoped></style>
