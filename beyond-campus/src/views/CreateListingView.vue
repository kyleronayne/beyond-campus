<template>
  <div class="create-listing-view">
    <main class="main">
      <!-- Listing Photos Section -->
      <section class="section">
        <h2 class="section__heading">Listing Photos</h2>
        <div class="section__item">
          <label class="item__label">Primary Photo</label>
          <div
            class="item__primary-photo-input-container"
            v-on:click="didClickPrimaryPhotoInputContainer"
          >
            <img
              class="primary-photo-input-container__upload-icon"
              src="../assets/create-listing-view/upload-icon.svg"
              v-show="!primaryPhoto"
              alt="Grey upload icon"
            />
            <img
              class="primary-photo-input-container__photo-preview"
              v-bind:src="primaryPhoto"
              v-show="primaryPhoto"
              alt="Listing primary photo preview"
            />
            <input
              id="primary-photo-input-container__input"
              class="primary-photo-input-container__input"
              type="file"
              v-on:change="didUploadPrimaryPhoto($event)"
            />
          </div>
          <button
            class="item__remove-primary-photo-button"
            v-on:click.prevent="didClickRemovePrimaryPhotoButton"
            v-show="primaryPhoto"
          >
            Remove Photo
          </button>
        </div>
      </section>
      <div class="section-container">
        <!-- Address Section -->
        <section class="section">
          <h2 class="section__heading">Address</h2>
          <div class="section__multi-item-container">
            <div class="section__item">
              <label for="street" class="item__label">Street</label>
              <input
                class="item__input"
                id="street"
                type="text"
                v-model="address.street"
              />
            </div>
            <div class="section__item">
              <label for="city" class="item__label">City</label>
              <input
                class="item__input"
                id="city"
                type="text"
                v-model="address.city"
              />
            </div>
            <div class="section__item">
              <label for="state" class="item__label">State</label>
              <select class="item__select" id="state" v-model="address.state">
                <option v-for="(state, index) in states" v-bind:key="index">
                  {{ state }}
                </option>
              </select>
            </div>
            <div class="section__item">
              <label for="zip-code" class="item__label">Zip Code</label>
              <input
                class="item__input"
                id="zip-code"
                type="text"
                v-model="address.zipCode"
              />
            </div>
          </div>
          <div class="section__item">
            <label for="apt-unit-num" class="item__label">Apt/Unit #</label>
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
                <option
                  class="select__option"
                  v-for="index in 5"
                  v-bind:key="index"
                >
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
                <option
                  class="select__option"
                  v-for="index in 5"
                  v-bind:key="index"
                >
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
                <option
                  class="select__option"
                  v-for="index in 5"
                  v-bind:key="index"
                >
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
            <label class="item__label" for="rent">Per Month Rental Cost</label>
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
              <label class="item__label" for="cleaning-fee">Cleaning Fee</label>
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
              class="item__multiSelectOptions"
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
        document
          .getElementById("primary-photo-input-container__input")
          ?.click();
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
        "primary-photo-input-container__input"
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
.main {
  display: flex;
  padding: 4rem 6rem 0rem 6rem;
}

.section {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-right: auto;
}

h2 {
  padding-bottom: 2rem;
}

.section__item {
  padding-bottom: 1rem;
}

div[class$="section__item"] {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
}

.item__label {
  padding-bottom: 1rem;
}

.item__primary-photo-input-container {
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

.primary-photo-input-container__upload-icon {
  height: 6rem;
  width: 6rem;
}

.primary-photo-input-container__photo-preview {
  height: 24rem;
  width: 34rem;
}

input[type="file"] {
  display: none;
}

.item__remove-primary-photo-button {
  align-self: center;
  padding: 0.5rem;
  background-color: white;
  color: var(--theme-color-delete);
  border: 2px solid var(--theme-color-delete);
  border-radius: 8px;
  cursor: pointer;
}

.item__remove-primary-photo-button:hover {
  color: white;
  background-color: var(--theme-color-delete);
}

.section-container {
  display: flex;
  flex-direction: column;
}

.section__multi-item-container {
  display: flex;
  gap: 2rem;
}

.item__multiSelectOptions {
  display: flex;
  flex-wrap: wrap;
  width: 32.5rem;
}

#description {
  width: 32.5rem;
  height: 40rem;
  padding: 1rem;
  resize: none;
}

#street,
#city {
  width: 10rem;
}

#state,
#num-floors,
#num-bedrooms,
#num-bathrooms {
  width: 3rem;
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
</style>
