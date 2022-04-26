<template>
  <div id="property-search-results-view">
    <FilterBar v-bind:propertyType="propertyType"></FilterBar>
    <div id="property-search-results">
      <PropertyCard
        v-for="(property, index) in properties"
        v-bind:key="index"
        v-bind:property="property"
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
    let properties: firestore.DocumentData[] = [];

    return {
      school,
      propertyType,
      properties,
    };
  },
  mounted() {
    this.getProperties();
  },
  methods: {
    getProperties() {
      // SchoolProperties school document for the user-selected school
      const schoolPropertiesDoc: firestore.DocumentReference = firestore.doc(
        database,
        `SchoolProperties/${this.school}`
      );

      firestore
        .getDoc(schoolPropertiesDoc)
        .then((docSnapshot: firestore.DocumentSnapshot) => {
          if (docSnapshot.exists()) {
            // If the school document exists
            docSnapshot
              .data()
              .properties.forEach(
                (propertyDocument: firestore.DocumentReference) => {
                  // Get each property document for the school
                  firestore.getDoc(propertyDocument).then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                      const docData: firestore.DocumentData =
                        docSnapshot.data();

                      this.properties.push(docData);
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
  gap: 5rem;
  padding: 4rem;
}
</style>
