<template>
  <div v-if="tags.length">
    <v-container class="py-md-10">
      <SectionTitle :centered="$vuetify.breakpoint.mdAndUp" class="mb-7" hide-button title="Categories"/>
      <CategoryCardSlider :items="tags"/>
    </v-container>
  </div>
</template>
<script>
	import CategoryCardSlider from "../elements/CategoryCardSlider";
	import SectionTitle from "../elements/SectionTitle";

	export default {
		name: 'Categories',
		components: { SectionTitle, CategoryCardSlider },
		data() {
			return {
				tags: this.$store.state.merchant.tags || [],
			}
		}
	}
</script>
