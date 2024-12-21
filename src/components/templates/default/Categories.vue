<template>
  <div v-if="tags.length" class="pt-0 py-md-10">
    <v-container>
      <SectionTitle class="mb-4" title="Categories"/>
      <CategoryCardSlider :items="tags"/>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "../elements/SectionTitle";
import CategoryCardSlider from "../elements/CategoryCardSlider";

export default {
  name: 'Categories',
  components: { CategoryCardSlider, SectionTitle },
  data() {
    return {
      tags: this.$store.state.merchant.tags || [],
    }
  }
}
</script>
