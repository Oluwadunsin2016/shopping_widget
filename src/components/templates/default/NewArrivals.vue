<template>
  <div class="pt-0 py-md-10">
    <v-container>
      <SectionTitle class="mb-4" title="New arrivals"/>
      <ItemCardDefaultSlider :columns="columns" :items="items"/>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";

	export default {
		name: "NewArrivals",
		components: { ItemCardDefaultSlider, SectionTitle },
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
