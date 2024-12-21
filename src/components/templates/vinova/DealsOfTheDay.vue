<template>
  <div class="py-md-10" v-if="items.length">
    <v-container>
      <SectionTitle :centered="$vuetify.breakpoint.mdAndUp" class="mb-4" hide-button title="Deals of the day"/>
      <v-divider class="mt-5 mb-6" v-if="$vuetify.breakpoint.mdAndUp"></v-divider>
      <ItemCardSimpleSlider :columns="columns" :items="items" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardDefaultSlider :columns="columns" :items="items" v-else/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";
	import ItemCardSimpleSlider from "../elements/ItemCardSimpleSlider";

	export default {
		name: 'DealsOfTheDay',
		components: { ItemCardSimpleSlider, ItemCardDefaultSlider, SectionTitle },
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
