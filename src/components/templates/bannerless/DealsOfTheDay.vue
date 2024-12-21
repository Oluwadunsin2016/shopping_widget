<template>
  <div v-if="items.length">
    <v-container class="py-md-10 px-1">
      <SectionTitle centered class="mb-7" hide-button title="Deals of the day" v-if="$vuetify.breakpoint.mdAndUp"/>
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
		name: 'DealsOfTheDay',
		components: { ItemCardDefaultSlider, ItemCardSquareSlider, SectionTitle },
		computed: {
			columns() {
				const theme = this.$store.getters['merchant/theme'];
				const section = theme.sections.find(section => section.name === 'top_deals');
				return section.columns
			},
			items() {
				return this.$store.state.global.best_deals;
			},
		},
	}
</script>
