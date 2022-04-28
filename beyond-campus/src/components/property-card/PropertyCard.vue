<template>
  <div class="property-card" v-if="primaryPhotoURL">
    <div class="property-card__primary-photo-container">
      <img class="property-card__primary-photo" v-bind:src="primaryPhotoURL" />
      <img
        class="property-card__save-icon"
        v-bind:src="require(`${saveIcon}`)"
        v-on:click="
          toggleSaveIcon();
          saveProperty();
        "
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
      <span class="main-details__type">{{
        property.data().specifications.type
      }}</span>
    </div>
    <div class="property-card__address">
      <img src="./assets/address-icon.svg" alt="" class="address__icon" />
      <div class="address__column-container">
        <div class="address__row-container">
          <span class="address__street">{{
            property.data().address.street + " "
          }}</span>
          <span class="address__aptUnitNum">{{
            property.data().address.aptUnitNum
          }}</span>
        </div>
        <div class="address__row-container">
          <span class="address__city">{{
            property.data().address.city + ", "
          }}</span>
          <span class="address__state"
            >{{ property.data().address.state + " " }}
          </span>
          <span class="address__zipCode">{{
            property.data().address.zipCode
          }}</span>
        </div>
      </div>
    </div>
    <div class="property-card__bottom-accent"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as FirebaseStorage from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";
import * as Firestore from "firebase/firestore";
import database from "@/main";

export default defineComponent({
  name: "PropertyCard",
  props: ["property"],
  data() {
    let saveIcon = "./assets/save-icon-hollow.svg";
    let isPropertySaved = false;
    const rentString = `$${
      this.$props.property!.data().expenses.rent
    }/month | `;
    const numBedsString = `Beds: ${
      this.$props.property!.data().specifications.numBedrooms
    }, `;
    const numBathroomsString = `Baths: ${
      this.$props.property!.data().specifications.numBathrooms
    } `;

    return {
      primaryPhotoURL: "",
      saveIcon,
      isPropertySaved,
      currentUser: getAuth().currentUser,
      rentString,
      numBedsString,
      numBathroomsString,
    };
  },
  mounted() {
    this.getPrimaryPropertyPhoto();
    this.isPreviouslySaved();
  },
  methods: {
    getPrimaryPropertyPhoto(): void {
      const primaryPhotoStorage = FirebaseStorage.ref(
        FirebaseStorage.getStorage(),
        this.$props.property!.data().primaryPhotoRef
      );

      FirebaseStorage.getDownloadURL(primaryPhotoStorage).then(
        (primaryPhotoURL: string) => {
          this.primaryPhotoURL = primaryPhotoURL;
        }
      );
    },
    isPreviouslySaved(): void {
      if (this.currentUser) {
        // If the user is signed in to an account
        const userDocPath = `Users/${this.currentUser!.uid}`;
        const userDoc: Firestore.DocumentReference = Firestore.doc(
          database,
          userDocPath
        );
        const propertyDoc: Firestore.DocumentReference = Firestore.doc(
          database,
          `Properties/${this.property.id}`
        );

        Firestore.getDoc(userDoc).then(
          (docSnapshot: Firestore.DocumentSnapshot) => {
            if (docSnapshot.exists()) {
              docSnapshot
                .data()
                .savedPropertyRefs.forEach(
                  (savedPropertyDoc: Firestore.DocumentReference) => {
                    if (savedPropertyDoc.id === propertyDoc.id) {
                      this.toggleSaveIcon();
                    }
                  }
                );
            }
          }
        );
      }
    },
    toggleSaveIcon(): void {
      if (this.currentUser) {
        // If the user is signed in to an account
        this.isPropertySaved = !this.isPropertySaved;

        if (this.isPropertySaved) {
          this.saveIcon = "./assets/save-icon-filled.svg";
        } else {
          this.saveIcon = "./assets/save-icon-hollow.svg";
        }
      } else {
        // Display message to sign in before saving a property
      }
    },
    saveProperty(): void {
      if (this.currentUser) {
        // If the user is signed in to an account
        const userDocPath = `Users/${this.currentUser!.uid}`;
        const userDoc: Firestore.DocumentReference = Firestore.doc(
          database,
          userDocPath
        );
        const propertyDocPath = `Properties/${this.property.id}`;
        const propertyDoc: Firestore.DocumentReference = Firestore.doc(
          database,
          propertyDocPath
        );

        if (this.isPropertySaved) {
          // Add the property doc reference to the user's savedPropertyRefs array
          Firestore.updateDoc(userDoc, {
            savedPropertyRefs: Firestore.arrayUnion(propertyDoc),
          });
        } else {
          // Remove the property doc reference from the user's savedPropertyRefs array
          Firestore.updateDoc(userDoc, {
            savedPropertyRefs: Firestore.arrayRemove(propertyDoc),
          });
          this.$emit("didUnSaveProperty", this.$props.property);
        }
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
  padding: 0;
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
