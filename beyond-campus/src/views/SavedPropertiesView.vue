<template>
  <div id="saved-properties">
    <div id="wrapper" v-if="properties.length > 0">
      <PropertyCard
        v-for="(property, index) in properties"
        v-bind:key="index"
        v-bind:propertyID="propertyIds[index]"
        v-bind:property="property"
      ></PropertyCard>
    </div>
    <span v-else>You haven't saved any properties</span>
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
    let properties: firestore.DocumentData[] = [];
    let propertyIds: string[] = [];
    const user: User | null = getAuth().currentUser;

    return {
      properties,
      propertyIds,
      user,
    };
  },
  mounted() {
    this.getSavedProperties();
  },
  methods: {
    getSavedProperties() {
      const userDoc: firestore.DocumentReference = firestore.doc(
        database,
        `Users/${this.user?.uid}`
      );

      firestore
        .getDoc(userDoc)
        .then((docSnapshot: firestore.DocumentSnapshot) => {
          if (docSnapshot.exists()) {
            docSnapshot
              .data()
              .savedPropertyRefs.forEach(
                (propertyDoc: firestore.DocumentReference) => {
                  firestore.getDoc(propertyDoc).then((docSnaphot) => {
                    if (docSnaphot.exists()) {
                      this.properties.push(docSnaphot.data());
                      this.propertyIds.push(propertyDoc.id);
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
#saved-properties {
  display: flex;
}
#wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5rem;
  margin: 5rem;
}
</style>
