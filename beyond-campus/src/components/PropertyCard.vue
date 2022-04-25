<template>
  <div class="property-card" v-if="primaryPhotoURL">
    <div class="property-card__primary-photo-wrapper">
      <img class="property-card__primary-photo" v-bind:src="primaryPhotoURL" />
    </div>
    <div class="property-card__main-details">
      <span class="main-details__rent">{{
        "$" + property.expenses.rent + "/month"
      }}</span>
      <span class="main-details__num-bedrooms">{{
        "Beds: " + property.specifications.numBedrooms
      }}</span>
      <span class="main-details__num-bathrooms">{{
        "Baths: " + property.specifications.numBathrooms
      }}</span>
    </div>
    <div class="property-card__address">
      <span class="address__street">{{ property.address.street }}</span>
      <div class="address__container">
        <span class="address__city">{{ property.address.city + ", " }}</span>
        <span class="address__state">{{ property.address.state + " " }}</span>
        <span class="address__zipCode">{{ property.address.zipCode }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as FirebaseStorage from "firebase/storage";

export default defineComponent({
  name: "PropertyCard",
  props: {
    property: Object,
  },
  data() {
    return {
      primaryPhotoURL: "",
    };
  },
  mounted() {
    this.getPrimaryPropertyPhoto();
  },
  methods: {
    getPrimaryPropertyPhoto() {
      const primaryPhotoRef = FirebaseStorage.ref(
        FirebaseStorage.getStorage(),
        `primary-property-photos/${this.$props.property!.primaryPhotoUUID}`
      );
      FirebaseStorage.getDownloadURL(primaryPhotoRef).then(
        (primaryPhotoURL: string) => {
          console.log(primaryPhotoURL);
          this.primaryPhotoURL = primaryPhotoURL;
        }
      );
    },
  },
});
</script>

<style scoped>
.property-card {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 12px;
}

.property-card__primary-photo {
  height: 15rem;
  width: 20rem;
}

.property-card__main-details {
  align-self: center;
  display: flex;
  gap: 0.5rem;
  padding-bottom: 1rem;
}

.main-details__rent {
  font-weight: 700;
}

.main-details__num-bedrooms {
  font-style: italic;
}

.main-details__num-bathrooms {
  font-style: italic;
}

.property-card__address {
  display: flex;
  flex-direction: column;
}
</style>
