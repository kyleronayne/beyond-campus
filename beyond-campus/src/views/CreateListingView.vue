<template>
  <div class="create-listing-view">
    <main class="main">
      <section class="listing-photos-section">
        <h2 class="listing-photos-section__section-heading">Listing Photos</h2>
        <div class="listing-photos-section__section-item">
          <label class="section-item__label">Primary Photo</label>
          <div
            class="section-item__primary-photo-input-container"
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
            class="section-item__remove-primary-photo-button"
            v-on:click.prevent="didClickRemovePrimaryPhotoButton"
            v-show="primaryPhoto"
          >
            Remove Photo
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateListingView",
  data() {
    return {
      primaryPhoto: "",
    };
  },
  methods: {
    didClickPrimaryPhotoInputContainer() {
      if (!this.primaryPhoto) {
        document
          .getElementById("primary-photo-input-container__input")
          ?.click();
      }
    },
    didUploadPrimaryPhoto(event: { target: { files: any[] } }) {
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
    didClickRemovePrimaryPhotoButton() {
      // Set input FileList to an empty string to emulate onChange
      const primaryPhotoInput = document.getElementById(
        "primary-photo-input-container__input"
      ) as HTMLInputElement;
      primaryPhotoInput.value = "";
      this.primaryPhoto = "";
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  padding: 4rem 4rem 0rem 4rem;
}

.listing-photos-section {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-right: auto;
}

h2 {
  padding-bottom: 2rem;
}

.listing-photos-section__section-item {
  display: flex;
  flex-direction: column;
}

.section-item__primary-photo-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem 1rem 0rem;
  height: 25rem;
  width: 35rem;
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

.section-item__remove-primary-photo-button {
  align-self: center;
  padding: 0.5rem;
  background-color: white;
  color: var(--theme-color-delete);
  border: 2px solid var(--theme-color-delete);
  border-radius: 8px;
  cursor: pointer;
}

.section-item__remove-primary-photo-button:hover {
  color: white;
  background-color: var(--theme-color-delete);
}
</style>
