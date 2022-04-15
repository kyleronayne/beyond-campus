<template>
  <div class="create-listing-view">
    <form class="form">
      <div class="form__property-photos-section">
        <div class="form__form-item">
          <label class="form-item__label">Primary Listing Photo</label>
          <div
            class="form-item__primary-photo-input-container"
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
            class="form-item__remove-primary-photo-button"
            v-on:click.prevent="didClickRemovePrimaryPhotoButton"
            v-show="primaryPhoto"
          >
            Remove Photo
          </button>
        </div>
      </div>
    </form>
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
      this.primaryPhoto = "";
    },
  },
});
</script>

<style scoped>
.form {
  display: flex;
  padding: 4rem 4rem 0rem 4rem;
}

.form__property-photos-section {
  display: flex;
  flex-direction: column;
}

.form__form-item {
  display: flex;
  flex-direction: column;
}

.form-item__label {
  font-size: 32px;
}

.form-item__primary-photo-input-container {
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

.form-item__remove-primary-photo-button {
  align-self: center;
  padding: 0.5rem;
  background-color: white;
  color: var(--theme-color-delete);
  border: 2px solid var(--theme-color-delete);
  border-radius: 8px;
  cursor: pointer;
}

.form-item__remove-primary-photo-button:hover {
  color: white;
  background-color: var(--theme-color-delete);
}
</style>
