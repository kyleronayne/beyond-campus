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
            />
            <img
              class="primary-photo-input-container__photo-preview"
              v-bind:src="primaryPhoto"
              v-show="primaryPhoto"
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
              <input class="item__input" id="street" type="text" />
            </div>
            <div class="section__item">
              <label for="city" class="item__label">City</label>
              <input class="item__input" id="city" type="text" />
            </div>
            <div class="section__item">
              <label for="state" class="item__label">State</label>
              <select class="item__select" id="state"></select>
            </div>
            <div class="section__item">
              <label for="zip-code" class="item__label">Zip Code</label>
              <input class="item__input" id="zip-code" type="text" />
            </div>
          </div>
          <div class="section__item">
            <label for="apt-unit-num" class="item__label">Apt/Unit #</label>
            <input class="item__input" id="apt-unit-num" type="text" />
          </div>
        </section>
        <!-- Expenses Section -->
        <section class="section">
          <h2 class="section__heading">Expenses</h2>
          <div class="section__item">
            <label for="rent" class="item__label">Per Month Rental Cost</label>
            <input class="item__input" id="rent" type="text" />
          </div>
          <div class="section__multi-item-container">
            <div class="section__item">
              <label for="application-fee" class="item__label"
                >Application Fee</label
              >
              <input class="item__input" id="application-fee" type="text" />
            </div>
            <div class="section__item">
              <label for="security-deposit" class="item__label"
                >Security Deposit</label
              >
              <input class="item__input" id="security-deposit" type="text" />
            </div>
            <div class="section__item">
              <label for="cleaning-fee" class="item__label">Cleaning Fee</label>
              <input class="item__input" id="cleaning-fee" type="text" />
            </div>
          </div>
          <div class="section__item">
            <span class="item__label">Included Utilities and Services</span>
            <MultiSelectOptions
              class="item__multiSelectOptions"
              ref="includedUS"
              v-bind:options="[
                'Electricity',
                'Gas',
                'Water',
                'Sewage',
                'Garbage Removal',
                'Snow Removal',
                'Lawn Care',
                'Internet',
                'Cable',
              ]"
            ></MultiSelectOptions>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultiSelectOptions from "../components/MultiSelectOptions.vue";

export default defineComponent({
  name: "CreateListingView",
  components: { MultiSelectOptions },
  data() {
    return {
      primaryPhoto: "",
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
  width: 30rem;
}
</style>
