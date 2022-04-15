<template>
  <div class="landing">
    <main class="main">
      <img
        class="main-image"
        src="../assets/landing-view/images/main-image.png"
        alt="Blue nighttime city skyline"
      />
      <section class="search-section">
        <form class="search-section__search-form">
          <div class="search-form__form-items">
            <div class="form-item">
              <label class="form-item__label" for="school">School</label>
              <input
                class="form-item__school-input"
                id="school"
                type="text"
                v-model="school"
              />
            </div>
            <div class="form-item">
              <label class="form-item__label" for="propertyType"
                >Property Type</label
              >
              <select
                class="form-item__property-type-select"
                id="propertyType"
                v-model="propertyType"
              >
                <option value="House">House</option>
                <option value="Townhome">Townhome</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>
          </div>
          <button
            class="search-form__search-button"
            type="submit"
            v-on:click.prevent="search"
          >
            Search
            <img
              class="search-button__icon"
              src="../assets/landing-view/images/search-icon.svg"
              alt="White magnifying glass focusing on a white house"
            />
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingView",
  data() {
    return {
      school: "",
      propertyType: "House",
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "PropertySearchResultsView",
        params: { school: this.school, propertyType: this.propertyType },
      });
    },
  },
});
</script>

<style scoped>
.main-image {
  height: auto;
  width: 100%;
  opacity: 0.65;
}

.search-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 6rem;
  padding-right: 6rem;
}

.search-section__search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 1;
  margin-top: -7rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.search-form__form-items {
  display: flex;
  gap: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-item__label {
  padding-bottom: 1rem;
  font-size: 32px;
}

.form-item__school-input {
  height: 3.5rem;
  width: auto;
  padding: 1rem;
  font-size: 18px;
  border: 2px solid black;
  border-radius: 8px;
}

.form-item__school-input:focus {
  outline-color: var(--theme-color-main);
}

.form-item__property-type-select {
  height: 3.5rem;
  width: auto;
  padding: 0.15rem;
  font-size: 18px;
  border: 2px solid black;
  border-radius: 8px;
}

.form-item__property-type-select:focus {
  outline-color: var(--theme-color-main);
}

.search-form__search-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-size: 20px;
  color: white;
  background-color: var(--theme-color-main);
  border: 2px solid var(--theme-color-main);
  border-radius: 24px;
}

.search-form__search-button:hover {
  cursor: pointer;
  box-shadow: 0px 0px 0px 3px var(--theme-color-main-light);
}

.search-button__icon {
  margin-left: 0.5rem;
}
</style>
