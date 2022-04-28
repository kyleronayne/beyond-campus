<template>
  <div id="saved-properties">
    <div id="wrapper" v-if="properties.length > 0">
      <PropertyCard
        v-on:didUnSaveProperty="didUnSaveProperty"
        v-for="property in properties"
        v-bind:key="property.id"
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
import { Firestore } from "firebase/firestore";

export default defineComponent({
  name: "SavedPropertiesView",
  components: { PropertyCard },
  data() {
    let properties: firestore.DocumentSnapshot[] = [];
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
                      this.properties.push(docSnaphot);
                      this.propertyIds.push(docSnaphot.id);
                    }
                  });
                }
              );
          }
        });
    },
    didUnSaveProperty(unSavedProperty: firestore.DocumentSnapshot) {
      console.log(typeof unSavedProperty);
      this.properties = this.properties.filter(
        (savedProperty: firestore.DocumentSnapshot) => {
          return savedProperty.id != unSavedProperty.id;
        }
      );
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
