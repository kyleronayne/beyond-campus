<template>
  <div class="filter-bar">
    <div class="filter-bar__filter-container">
      <button
        class="filter-bar__filter-button"
        v-on:click="showPropertyTypeOptions = !showPropertyTypeOptions"
      >
        <span class="filter-button__name"> Property Type </span>
      </button>
      <div
        class="filter-button__options-container"
        v-show="showPropertyTypeOptions"
      >
        <form class="filter-button__options-form">
          <div class="options-form__option">
            <input
              id="house-checkbox"
              class="option__checkbox"
              type="checkbox"
              v-model="propertyTypeOptions.house"
            />
            <label class="option__label" for="house-checkbox"> House</label>
          </div>
          <div class="options-form__option">
            <input
              id="townhome-checkbox"
              class="option__checkbox"
              type="checkbox"
              v-model="propertyTypeOptions.townhome"
            />
            <label class="option__label" for="townhome-checkbox">
              Townhome</label
            >
          </div>
          <div class="options-form__option">
            <input
              id="apartment-checkbox"
              class="option__checkbox"
              type="checkbox"
              v-model="propertyTypeOptions.apartment"
            />
            <label class="option__label" for="apartment-checkbox">
              Apartment</label
            >
          </div>
          <div class="options-form__submit-container">
            <button
              class="options-form__submit-button"
              v-on:click.prevent="
                showPropertyTypeOptions = !showPropertyTypeOptions;
                applyPropertyTypeFilter;
              "
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    propertyType: String,
  },
  data() {
    return {
      showPropertyTypeOptions: false,
      propertyTypeOptions: { house: false, townhome: false, apartment: false },
    };
  },
  methods: {
    applyPropertyTypeFilter() {
      console.log(this.propertyTypeOptions);
    },
  },
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding: 1rem 2rem 1rem 2rem;
  background-color: var(--theme-color-main-light);
}

.filter-bar__filter-container {
  display: flex;
  flex-direction: column;
}

.filter-bar__filter-button {
  padding: 0.5rem;
  color: var(--theme-color-main);
  background-color: white;
  border: 2px solid var(--theme-color-main);
  border-radius: 8px;
  cursor: pointer;
}

.filter-button__options-container {
  z-index: 1;
  position: absolute;
  width: fit-content;
  margin-top: 3rem;
  background-color: white;
  border: 2px solid var(--theme-color-main);
  border-radius: 3px;
}

.options-form__option:first-of-type {
  padding-top: 1rem;
}

.options-form__option {
  padding: 0rem 9rem 0.5rem 1rem;
}

.options-form__option:checked {
  background-color: var(--theme-color-main);
}

.option__label {
  padding-left: 0.5rem;
}

.options-form__submit-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3rem;
  padding-right: 1rem;
  background-color: var(--theme-color-main);
}

.options-form__submit-button {
  padding: 0.5rem;
  background-color: white;
  color: var(--theme-color-main);
  border: 2px solid var(--theme-color-main);
  border-radius: 8px;
  cursor: pointer;
}
</style>
