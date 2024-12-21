<template>
  <div v-if="items.length">
    <v-container class="py-md-10">
      <SectionTitle centered class="mb-7" hide-button title="New arrivals" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardDefaultSlider :columns="columns" :items="items" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardSquareSlider :columns="columns" :gap="10" :items="items" v-else/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";
	import ItemCardSquareSlider from "../elements/ItemCardSquareSlider";

	export default {
		name: "NewArrivals",
		components: { ItemCardSquareSlider, ItemCardDefaultSlider, SectionTitle },
		computed: {
			columns() {
				const theme = this.$store.getters['merchant/theme'];
				const section = theme.sections.find(section => section.name === 'new_arrivals');
				return section.columns
			},
			items() {
				return this.$store.state.global.new_arrivals;
			},
		},
	}
</script>
