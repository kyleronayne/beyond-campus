<template>
  <div class="property-card" v-if="primaryPhotoURL">
    <div class="property-card__primary-photo-container">
      <img class="property-card__primary-photo" v-bind:src="primaryPhotoURL" />
      <img
        class="property-card__save-icon"
        v-bind:src="require(`${saveIcon}`)"
        v-on:click="toggleSaveIcon"
      />
    </div>
    <div class="property-card__main-details">
      <div class="main-details__container">
        <span class="main-details__rent">{{ rentString }}</span>
        <span class="main-details__num-bedrooms">{{ numBedsString }}</span>
        <span class="main-details__num-bathrooms">{{
          numBathroomsString
        }}</span>
      </div>
      <span class="main-details__type">{{ property.specifications.type }}</span>
    </div>
    <div class="property-card__address">
      <img src="./assets/address-icon.svg" alt="" class="address__icon" />
      <div class="address__column-container">
        <div class="address__row-container">
          <span class="address__street">{{ property.address.street }}</span>
          <span
            class="address__aptUnitNum"
            v-if="property.address.aptUnitNum"
            >{{ " " + property.address.aptUnitNum }}</span
          >
        </div>
        <div class="address__row-container">
          <span class="address__city">{{ property.address.city + ", " }}</span>
          <span class="address__state">{{ property.address.state + " " }}</span>
          <span class="address__zipCode">{{ property.address.zipCode }}</span>
        </div>
      </div>
    </div>
    <div class="property-card__bottom-accent"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as FirebaseStorage from "firebase/storage";
import { Auth, getAuth, User } from "@firebase/auth";
import {
  CollectionReference,
  collection,
  addDoc,
  DocumentReference,
  doc,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";
import database from "@/main";

export default defineComponent({
  name: "PropertyCard",
  props: {
    property: Object,
  },
  data() {
    const rentString = `$${this.$props.property!.expenses.rent}/month | `;
    const numBedsString = `Beds: ${
      this.$props.property!.specifications.numBedrooms
    }, `;
    const numBathroomsString = `Baths: ${
      this.$props.property!.specifications.numBathrooms
    } `;
    const cUser: User | null = getAuth().currentUser;
    let saveIcon = "./assets/save-icon-hollow.svg";
    let isPropertySaved = false;

    return {
      primaryPhotoURL: "",
      rentString,
      numBedsString,
      numBathroomsString,
      saveIcon,
      isPropertySaved,
      cUser,
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
    toggleSaveIcon() {
      this.isPropertySaved = !this.isPropertySaved;

      if (this.isPropertySaved) {
        this.saveIcon = "./assets/save-icon-filled.svg";
        const docRef: DocumentReference = doc(
          database,
          `Users/${this.cUser?.uid}/savedProperties/${
            this.$props.property!.primaryPhotoUUID
          }`
        );
        setDoc(docRef, { numBeds: this.numBedsString });
      } else {
        this.saveIcon = "./assets/save-icon-hollow.svg";
        const docRef: DocumentReference = doc(
          database,
          `Users/${this.cUser?.uid}/savedProperties/${
            this.$props.property!.primaryPhotoUUID
          }`
        );
        deleteDoc(docRef);
      }
    },
  },
});
</script>

<style scoped>
.property-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  border: 4px solid black;
  border-radius: 12px;
}

.property-card__primary-photo-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  padding: 1rem;
}

.property-card__primary-photo {
  height: 15rem;
  width: 20rem;
}

.property-card__save-icon {
  z-index: 1;
  position: absolute;
  height: 1.5rem;
  margin-left: -0.75rem;
  margin-top: -0.5rem;
  cursor: pointer;
}

.property-card__main-details {
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
}

.main-details__rent {
  font-weight: 700;
}

.main-details__num-bedrooms {
  font-style: italic;
  font-weight: 700;
}

.main-details__num-bathrooms {
  font-style: italic;
  font-weight: 700;
}

.main-details__type {
  align-self: center;
  font-weight: 700;
}

.property-card__address {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.address__icon {
  align-self: center;
  height: 1.25rem;
}

.address__row-container {
  display: flex;
  justify-content: center;
  white-space: break-spaces;
}

.address__column-container {
  display: flex;
  flex-direction: column;
}

.property-card__bottom-accent {
  height: 1rem;
  background-color: var(--theme-color-main);
  border: 4px solid var(--theme-color-main);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
