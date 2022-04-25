<template>
  <div class="property">
    {{ property }}
  </div>
</template>

<script land="ts">
import { defineComponent } from "vue";
import { DocumentData } from "firebase/firestore";

export default defineComponent({
  /* eslint-disable vue/multi-word-component-names */
  // eslint-disable-next-line vue/multi-word-component-names
  props: {
    property: DocumentData,
  },
});
</script>

<style scoped></style>
