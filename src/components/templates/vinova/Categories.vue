<template>
  <div class="pt-5 py-md-10">
    <v-container>
      <div class="section-title grey--text text--darken-3 text-center font-weight-bold">Categories</div>
      <v-divider class="mt-5 mb-6"></v-divider>
      <CategoryCardSlider :items="tags"/>
    </v-container>
  </div>
</template>
<script>
	import CategoryCardSlider from "../elements/CategoryCardSlider";

	export default {
		name: 'Categories',
		components: { CategoryCardSlider },
		data() {
			return {
				tags: this.$store.state.merchant.tags,
			}
		}
	}
</script>
