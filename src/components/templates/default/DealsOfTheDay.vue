<template>
  <div class="pt-0 py-md-10" v-if="items.length">
    <v-container>
      <SectionTitle class="mb-4" title="Deals of the day"/>
      <ItemCardDefaultSlider :columns="columns" :items="items"/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";

	export default {
		name: 'DealsOfTheDay',
		components: { ItemCardDefaultSlider, SectionTitle },
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
