<template>
  <div>
    <div id="property-saved-array">
      <PropertyCard
        v-for="(propertyData, index) in propertyDocs"
        v-bind:key="index"
        v-bind:propertyID="propertyIds[index]"
        v-bind:propertyData="propertyDocs"
      ></PropertyCard>
    </div>
  </div>
</template>

<script lang="ts">
import database from "@/main";
import * as firestore from "firebase/firestore";
import { defineComponent } from "vue";
import PropertyCard from "../components/property-card/PropertyCard.vue";
import { Auth, getAuth, User } from "firebase/auth";

export default defineComponent({
  name: "SavedPropertiesView",
  components: { PropertyCard },
  data() {
    let propertyDocs: firestore.DocumentData[] = [];
    let propertyIds: string[] = [];
    const user: User | null = getAuth().currentUser;

    return {
      propertyDocs,
      propertyIds,
      user,
    };
  },
  mounted() {
    this.getSavedProps();
  },
  methods: {
    getSavedProps() {
      const savedPropReference: firestore.DocumentReference = firestore.doc(
        database,
        `Users/${this.user?.uid}/`
      );

      firestore
        .getDoc(savedPropReference)
        .then((docShot: firestore.DocumentSnapshot) => {
          if (docShot.exists()) {
            docShot
              .data()
              .savedPropertyRefs.forEach(
                (propertyDocument: firestore.DocumentReference) => {
                  firestore.getDoc(propertyDocument).then((docShot) => {
                    if (docShot.exists()) {
                      this.propertyDocs.push(docShot.data());
                      console.log(this.propertyDocs);
                      this.propertyIds.push(propertyDocument.id);
                      console.log(this.propertyIds);
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

<style>
#property-saved-array {
  display: flex;
  gap: 5rem;
  padding: 4rem;
}
</style>
