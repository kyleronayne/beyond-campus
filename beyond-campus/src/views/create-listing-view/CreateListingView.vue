<template>
  <div id="create-listing-view">
    <main id="main">
      <div id="section-wrapper">
        <!-- Listing Photos Section -->
        <section class="section">
          <h2 class="section__heading">Listing Photos</h2>
          <div class="section__item">
            <label class="item__label">Primary Photo</label>
            <div
              id="primary-photo-input-container"
              v-on:click="didClickPrimaryPhotoInputContainer"
            >
              <img
                id="primary-photo-upload-icon"
                src="../create-listing-view/assets/upload-icon.svg"
                v-show="!primaryPhoto"
                alt="Grey upload icon"
              />
              <img
                id="primary-photo-preview"
                v-bind:src="primaryPhoto"
                v-show="primaryPhoto"
                alt="Listing primary photo preview"
              />
              <input
                id="primary-photo-input"
                type="file"
                v-on:change="didUploadPrimaryPhoto($event)"
              />
            </div>
            <button
              id="remove-primary-photo-button"
              v-on:click.prevent="didClickRemovePrimaryPhotoButton"
              v-show="primaryPhoto"
            >
              Remove Photo
            </button>
          </div>
        </section>
        <div id="section-container">
          <!-- Address Section -->
          <section class="section">
            <h2 class="section__heading">Address</h2>
            <div class="section__multi-item-container">
              <div class="section__item">
                <label class="item__label" for="street">Street</label>
                <input
                  class="item__input"
                  id="street"
                  type="text"
                  v-model="address.street"
                />
              </div>
              <div class="section__item">
                <label class="item__label" for="city">City</label>
                <input
                  class="item__input"
                  id="city"
                  type="text"
                  v-model.lazy="address.city"
                />
              </div>
              <div class="section__item">
                <label class="item__label" for="state">State</label>
                <select class="item__select" id="state" v-model="address.state">
                  <option v-for="(state, index) in states" v-bind:key="index">
                    {{ state }}
                  </option>
                </select>
              </div>
              <div class="section__item">
                <label class="item__label" for="zip-code">Zip Code</label>
                <input
                  class="item__input"
                  id="zip-code"
                  type="text"
                  v-model="address.zipCode"
                />
              </div>
            </div>
            <div class="section__item">
              <label class="item__label" for="apt-unit-num">Apt/Unit #</label>
              <input
                class="item__input"
                id="apt-unit-num"
                type="text"
                v-model="address.aptUnitNum"
              />
            </div>
            <div class="section__item">
              <span class="item__label"
                >Students at these schools will see your property:</span
              >
              <span
                class="item__eligible-university"
                v-for="(school, index) in targetedSchools"
                v-bind:key="index"
                >{{ school }}</span
              >
            </div>
          </section>
          <!-- Specifications Section -->
          <section class="section">
            <h2 class="section__heading">Specifications</h2>
            <div class="section__multi-item-container">
              <div class="section__item">
                <label class="item__label" for="square-footage"
                  >Square Footage</label
                >
                <input
                  class="item__input"
                  id="square-footage"
                  type="text"
                  v-model="specifications.squareFootage"
                />
              </div>
              <div class="section__item">
                <label class="item__label" for="num-floors">Floors</label>
                <select
                  class="item__select"
                  id="num-floors"
                  v-model="specifications.numFloors"
                >
                  <option v-for="index in 5" v-bind:key="index">
                    {{ index }}
                  </option>
                </select>
              </div>
              <div class="section__item">
                <label class="item__label" for="num-bedrooms">Bedrooms</label>
                <select
                  class="item__select"
                  id="num-bedrooms"
                  v-model="specifications.numBedrooms"
                >
                  <option v-for="index in 5" v-bind:key="index">
                    {{ index }}
                  </option>
                </select>
              </div>
              <div class="section__item">
                <label class="item__label" for="num-bathrooms">Bathrooms</label>
                <select
                  class="item__select"
                  id="num-bathrooms"
                  v-model="specifications.numBathrooms"
                >
                  <option v-for="index in 5" v-bind:key="index">
                    {{ index }}
                  </option>
                </select>
              </div>
            </div>
          </section>
          <!-- Expenses Section -->
          <section class="section">
            <h2 class="section__heading">Expenses</h2>
            <div class="section__item">
              <label class="item__label" for="rent"
                >Per Month Rental Cost</label
              >
              <input
                class="item__input"
                id="rent"
                type="text"
                v-model="expenses.rent"
              />
            </div>
            <div class="section__multi-item-container">
              <div class="section__item">
                <label class="item__label" for="application-fee"
                  >Application Fee</label
                >
                <input
                  class="item__input"
                  id="application-fee"
                  type="text"
                  v-model="expenses.applicationFee"
                />
              </div>
              <div class="section__item">
                <label class="item__label" for="security-deposit"
                  >Security Deposit</label
                >
                <input
                  class="item__input"
                  id="security-deposit"
                  type="text"
                  v-model="expenses.securityDeposit"
                />
              </div>
              <div class="section__item">
                <label class="item__label" for="cleaning-fee"
                  >Cleaning Fee</label
                >
                <input
                  class="item__input"
                  id="cleaning-fee"
                  type="text"
                  v-model="expenses.cleaningFee"
                />
              </div>
            </div>
            <div class="section__item">
              <span class="item__label">Included Utilities and Services</span>
              <MultiSelectOptions
                id="included-utilities-services-options"
                ref="includedUS"
                v-bind:options="utilityAndServiceOptions"
              ></MultiSelectOptions>
            </div>
          </section>
          <!-- Description Section -->
          <section class="section">
            <h2 class="section__heading">Description</h2>
            <div class="section__item">
              <label class="item__label" for="description"
                >Tell renters more about the property</label
              >
              <textarea
                class="item__input"
                id="description"
                v-model="description"
              ></textarea>
            </div>
          </section>
        </div>
      </div>
      <button
        id="create-listing-button"
        v-on:click="didClickCreateListingButton"
      >
        Create Listing
      </button>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Address,
  Specifications,
  Expenses,
  Property,
} from "./assets/DataTypes";
import { States, UtilityAndServiceOptions } from "./assets/Data";
import MultiSelectOptions from "../../components/MultiSelectOptions.vue";
import { User, getAuth } from "firebase/auth";
import database from "../../main";
import * as firestore from "firebase/firestore";

export default defineComponent({
  name: "CreateListingView",
  components: { MultiSelectOptions },
  data() {
    const currentUser: User | null = getAuth().currentUser;
    const states: string[] = States;
    let targetedSchools: string[] = [];
    let address: Address = {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      aptUnitNum: "",
    };
    let specifications: Specifications = {
      squareFootage: "",
      numFloors: "",
      numBedrooms: "",
      numBathrooms: "",
    };
    let expenses: Expenses = {
      rent: "",
      applicationFee: "",
      securityDeposit: "",
      cleaningFee: "",
    };

    return {
      currentUser,
      primaryPhoto: "",
      states,
      address,
      targetedSchools,
      specifications,
      expenses,
      utilityAndServiceOptions: UtilityAndServiceOptions,
      description: "",
    };
  },
  watch: {
    address: {
      /**
       * Sets the targetedSchools array based on the user-provided location
       */
      handler() {
        if (this.address.city && this.address.state) {
          // If the user has entered a state and city
          this.targetedSchools = [];
          const state: string = this.address.state.toString();
          const city: string = this.address.city.toString();
          const stateDocPath: string = `SchoolLocations/${state}`.toString();
          const stateDoc: firestore.DocumentReference = firestore.doc(
            database,
            stateDocPath
          );

          firestore.getDoc(stateDoc).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              for (const school in docSnapshot.data()) {
                if (docSnapshot.data()[school].includes(city)) {
                  // If school array contains the user-provided city
                  this.targetedSchools.push(school);
                }
              }
            }
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Clicks the primary photo input to open the file selector
     */
    didClickPrimaryPhotoInputContainer(): void {
      if (!this.primaryPhoto) {
        // If the user has not selected a primary photo
        document.getElementById("primary-photo-input")?.click();
      }
    },
    /**
     * Sets the primaryPhoto string to the selected photo's BLOB
     */
    didUploadPrimaryPhoto(event: { target: { files: any[] } }): void {
      const file = event.target.files[0];
      if (file) {
        if (
          file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png"
        ) {
          this.primaryPhoto = URL.createObjectURL(file);
        }
      }
    },
    /**
     * Sets the primary photo input value and primaryPhoto string to empty
     */
    didClickRemovePrimaryPhotoButton(): void {
      // Set input FileList to an empty string to emulate onChange event
      const primaryPhotoInput = document.getElementById(
        "primary-photo-input"
      ) as HTMLInputElement;
      primaryPhotoInput.value = "";
      this.primaryPhoto = "";
    },
    /**
     * Returns the selected included utilities and services
     */
    getIncludedUS(): string[] {
      return (this.$refs.includedUS as InstanceType<typeof MultiSelectOptions>)
        .selectedOptions;
    },
    didClickCreateListingButton(): void {
      const property: Property = {
        address: this.address,
        specifications: this.specifications,
        expenses: this.expenses,
        includedUtilitiesAndServices: this.getIncludedUS(),
        description: this.description,
      };

      const propertiesColl: firestore.CollectionReference =
        firestore.collection(database, "Properties");

      firestore
        // Add property to the Properties collection
        .addDoc(propertiesColl, property)
        .then((propertyDoc: firestore.DocumentReference) => {
          // Build the SchoolProperties document reference for each targeted school
          this.targetedSchools.forEach((school: string) => {
            const schoolDocPath: string =
              `SchoolProperties/${school}`.toString();
            const schoolDoc: firestore.DocumentReference = firestore.doc(
              database,
              schoolDocPath
            );

            // Add the propertyDoc reference to the targeted school's properties array
            firestore.updateDoc(schoolDoc, {
              properties: firestore.arrayUnion(propertyDoc),
            });
          });
        });
    },
  },
});
</script>

<style scoped>
@import "../create-listing-view/CreateListingView.css";
</style>
