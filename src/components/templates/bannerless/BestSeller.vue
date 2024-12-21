<template>
  <div v-if="items.length">
    <v-container class="py-md-10">
      <SectionTitle centered class="mb-7" hide-button title="Best sellers" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardDefaultSlider :columns="columns" :items="items" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardSquareSlider :columns="columns" :gap="10" :items="items" v-else/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardSquareSlider from "../elements/ItemCardSquareSlider";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";

	export default {
		name: "BestSeller",
		components: { ItemCardDefaultSlider, ItemCardSquareSlider, SectionTitle },
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
