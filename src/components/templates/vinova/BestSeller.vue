<template>
  <div class="py-md-10">
    <v-container>
      <SectionTitle :centered="$vuetify.breakpoint.mdAndUp" class="mb-4" hide-button title="Best sellers"/>
      <v-divider class="mt-5 mb-6" v-if="$vuetify.breakpoint.mdAndUp"></v-divider>
      <ItemCardDefaultSlider :columns="columns" :items="items"/>
    </v-container>
  </div>
</template>

<script>
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";
	import SectionTitle from "../elements/SectionTitle";

	export default {
		name: "BestSeller",
		components: { SectionTitle, ItemCardDefaultSlider },
		computed: {
			columns() {
				const theme = this.$store.getters['merchant/theme'];
				const section = theme.sections.find(section => section.name === 'best_sellers');
				return section.columns
			},
			items() {
				return this.$store.state.global.best_seller;
			},
		},
	}
</script>
