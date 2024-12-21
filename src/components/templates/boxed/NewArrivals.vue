<template>
  <div class="pt-md-10" v-if="items.length">
    <v-container>
      <SectionTitle class="mb-4 mb-md-7" title="New arrivals"/>
      <ItemsLayoutGrid :items="items" :reversed="reversed" v-if="$vuetify.breakpoint.mdAndUp"/>
      <ItemCardDefaultSlider :items="items" v-else/>
    </v-container>
  </div>
</template>

<script>
	import ItemsLayoutGrid from "../elements/ItemsLayoutGrid";
	import SectionTitle from "../elements/SectionTitle";
	import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";

	export default {
		name: "NewArrivals",
		components: { ItemCardDefaultSlider, SectionTitle, ItemsLayoutGrid },
		props: {
			reversed: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			items() {
				return this.$store.state.global.new_arrivals;
			},
		},
	}
</script>
