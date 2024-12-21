<template>
  <div class="pt-0 py-md-10">
    <v-container>
      <SectionTitle class="mb-4" title="Best sellers"/>
      <ItemCardDefaultSlider :columns="columns" :items="items"/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";

	export default {
		name: "BestSeller",
		components: { ItemCardDefaultSlider, SectionTitle },
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
