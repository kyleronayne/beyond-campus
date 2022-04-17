<template>
  <div class="multi-select-options">
    <div
      v-bind:class="{
        option: !isOptionSelected(option),
        'option--selected': isOptionSelected(option),
      }"
      v-for="(option, index) in options"
      v-bind:key="index"
      v-on:click="didClickOption(option)"
    >
      <span class="option__name">{{ option }}</span>
      <span class="option__icon">{{
        isOptionSelected(option) ? "-" : "+"
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: Array,
  },
  data() {
    return {
      selectedOptions: [""],
    };
  },
  methods: {
    isOptionSelected(option: string): boolean {
      if (this.selectedOptions.includes(option)) {
        return true;
      } else {
        return false;
      }
    },
    didClickOption(option: string) {
      if (this.isOptionSelected(option)) {
        // If the option is already selected, remove from selectedOptions
        this.selectedOptions = this.selectedOptions.filter(
          (existingOption) => existingOption !== option
        );
      } else {
        // If the option is not selected, add to selectedOptions
        this.selectedOptions.push(option);
      }
    },
  },
});
</script>

<style scoped>
.multi-select-options {
  display: flex;
  gap: 1rem;
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  color: var(--theme-color-main);
  border: 2px solid var(--theme-color-main);
  border-radius: 14px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  cursor: pointer;
}

.option--selected {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  color: white;
  background-color: var(--theme-color-main);
  border: 2px solid var(--theme-color-main);
  border-radius: 14px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  cursor: pointer;
}

.option__name {
  padding-right: 0.25rem;
}
.option__icon {
  font-family: monospace;
}
</style>
