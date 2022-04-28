<template>
  <div id="property-search-results">
    <PropertyCard
      v-for="(property, index) in properties"
      v-bind:key="index"
      v-bind:property="property"
    ></PropertyCard>
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
  components: { PropertyCard },
  data() {
    const route = useRoute();
    const school: string = route.params.school.toString();
    const propertyType: string = route.params.propertyType.toString();
    let properties: firestore.DocumentSnapshot[] = [];

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
                      // Add the property data to the properties array
                      this.properties.push(docSnapshot);
                      this.filterByPropertyType();
                    }
                  });
                }
              );
          }
        });
    },
    filterByPropertyType() {
      this.properties = this.properties.filter(
        (property: firestore.DocumentSnapshot) => {
          if (property.exists()) {
            let propertyType = property.data().specifications.type;
            if (
              propertyType === "Single Unit House" ||
              propertyType === "Duplex"
            ) {
              propertyType = "House";
            }

            if (this.propertyType.includes(propertyType)) {
              return property;
            }
          }
        }
      );
    },
  },
});
</script>

<style scoped>
#property-search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 5rem;
}
</style>
