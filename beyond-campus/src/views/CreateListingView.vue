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
                src="../assets/create-listing-view/upload-icon.svg"
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
                  v-model="address.city"
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
      <button id="create-listing-button">Create Listing</button>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  states,
  utilityAndServiceOptions,
} from "../assets/create-listing-view/listingData";
import MultiSelectOptions from "../components/MultiSelectOptions.vue";

export default defineComponent({
  name: "CreateListingView",
  components: { MultiSelectOptions },
  data() {
    return {
      states: states,
      utilityAndServiceOptions: utilityAndServiceOptions,
      primaryPhoto: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        aptUnitNum: "",
      },
      specifications: {
        squareFootage: "",
        numFloors: "",
        numBedrooms: "",
        numBathrooms: "",
      },
      expenses: {
        rent: "",
        applicationFee: "",
        securityDeposit: "",
        cleaningFee: "",
      },
      description: "",
    };
  },
  methods: {
    didClickPrimaryPhotoInputContainer(): void {
      if (!this.primaryPhoto) {
        document.getElementById("primary-photo-input")?.click();
      }
    },
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
    didClickRemovePrimaryPhotoButton(): void {
      // Set input FileList to an empty string to emulate onChange
      const primaryPhotoInput = document.getElementById(
        "primary-photo-input"
      ) as HTMLInputElement;
      primaryPhotoInput.value = "";
      this.primaryPhoto = "";
    },
    getIncludedUS(): string[] {
      return (this.$refs.includedUS as InstanceType<typeof MultiSelectOptions>)
        .selectedOptions;
    },
  },
});
</script>

<style scoped>
/* ID Selectors */
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 6rem 4rem 6rem;
}

#section-wrapper {
  display: flex;
  gap: 6rem;
  padding-bottom: 2rem;
}

#primary-photo-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  width: 35rem;
  margin-bottom: 1rem;
  border: 2px dashed #d3d3d3;
  border-radius: 8px;
  cursor: pointer;
}

#primary-photo-upload-icon {
  height: 6rem;
  width: 6rem;
}

#primary-photo-preview {
  height: 24rem;
  width: 34rem;
}

#primary-photo-input {
  display: none;
}

#remove-primary-photo-button {
  align-self: center;
  padding: 0.5rem;
  background-color: white;
  color: var(--theme-color-delete);
  border: 2px solid var(--theme-color-delete);
  border-radius: 8px;
  cursor: pointer;
}

#remove-primary-photo-button:hover {
  color: white;
  background-color: var(--theme-color-delete);
}

#section-container {
  display: flex;
  flex-direction: column;
}

#included-utilities-services-options {
  display: flex;
  flex-wrap: wrap;
  width: 32.5rem;
}

#create-listing-button {
  width: 32.5rem;
  padding: 1.5rem;
  color: var(--theme-color-main);
  background-color: white;
  border: 2px solid var(--theme-color-main);
  border-radius: 40px;
  cursor: pointer;
  font-size: 18px;
}

#create-listing-button:hover {
  background-color: var(--theme-color-main);
  color: white;
}

#street,
#city {
  width: 10rem;
}

#state,
#num-floors,
#num-bedrooms,
#num-bathrooms {
  width: 3.5rem;
}

#zip-code,
#apt-unit-num,
#square-footage,
#rent,
#application-fee,
#security-deposit,
#cleaning-fee {
  width: 5rem;
}

#description {
  width: 32.5rem;
  height: 40rem;
  padding: 1rem;
  resize: none;
}

/* Class Selectors */
.section {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-right: auto;
}

.section__heading {
  padding: 2rem 0rem 1rem 0rem;
}

.section__item {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.item__label {
  padding-bottom: 1rem;
}

.item__input {
  padding: 0.35rem;
  border: 1px solid black;
  border-radius: 4px;
  outline-color: var(--theme-color-main);
}

.item__select {
  padding: 0.35rem;
  border: 1px solid black;
  border-radius: 4px;
  outline-color: var(--theme-color-main);
}

.section__multi-item-container {
  display: flex;
  gap: 2rem;
}
</style>
