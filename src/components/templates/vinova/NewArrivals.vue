<template>
  <div class="py-md-10">
    <v-container>
      <div class="position-relative">
        <SectionTitle :centered="$vuetify.breakpoint.mdAndUp" class="mb-4" hide-button title="New arrivals"/>
        <v-divider class="mt-5 mb-6" v-if="$vuetify.breakpoint.mdAndUp"></v-divider>
        <ItemCardSimpleSlider :columns="columns" :items="items" v-if="$vuetify.breakpoint.mdAndUp"/>
        <ItemCardDefaultSlider :columns="columns" :items="items" v-else/>
      </div>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";
	import ItemCardSimpleSlider from "../elements/ItemCardSimpleSlider";

	export default {
		name: "NewArrivals",
		components: { ItemCardSimpleSlider, ItemCardDefaultSlider, SectionTitle },
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
