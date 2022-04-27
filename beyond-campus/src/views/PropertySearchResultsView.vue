<template>
  <div id="property-search-results-view">
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
    <div id="property-search-results">
      <PropertyCard
        v-for="(propertyData, index) in propertyDocData"
        v-bind:key="index"
        v-bind:propertyID="propertyDocIDs[index]"
        v-bind:propertyData="propertyData"
      ></PropertyCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterBar from "../components/FilterBar.vue";
import PropertyCard from "../components/property-card/PropertyCard.vue";
import { useRoute } from "vue-router";
import database from "../main";
import * as firestore from "firebase/firestore";

export default defineComponent({
  name: "PropertySearchResultsView",
  components: { FilterBar, PropertyCard },
  data() {
    const route = useRoute();
    const school: string = route.params.school.toString();
    const propertyType: string = route.params.propertyType.toString();
    let propertyDocData: firestore.DocumentData[] = [];
    let propertyDocIDs: string[] = [];

    return {
      school,
      propertyType,
      propertyDocData,
      propertyDocIDs,
    };
  },
  mounted() {
    this.getProperties();
  },
  methods: {
    getProperties() {
      // User-selected school document from the SchoolProperties collection
      const schoolDoc: firestore.DocumentReference = firestore.doc(
        database,
        `SchoolProperties/${this.school}`
      );

      firestore
        .getDoc(schoolDoc)
        .then((docSnapshot: firestore.DocumentSnapshot) => {
          if (docSnapshot.exists()) {
            // If the school document exists
            docSnapshot
              .data()
              .propertyRefs.forEach(
                (propertyDoc: firestore.DocumentReference) => {
                  // Get each property document targeted for the school
                  firestore.getDoc(propertyDoc).then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                      // Add the property data to the propertyDocData array
                      this.propertyDocData.push(docSnapshot.data());
                      // Add the property ID to the propertyDocIDs array
                      this.propertyDocIDs.push(propertyDoc.id);
                    }
                  });
                }
              );
          }
        });
    },
  },
});
</script>

<style scoped>
#property-search-results {
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  padding: 4rem;
}
</style>
