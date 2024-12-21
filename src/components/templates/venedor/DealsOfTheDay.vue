<template>
  <div class="pt-md-5" v-if="items.length">
    <v-container>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <SectionTitle class="mb-7" title="Deals of the day"/>
        <ItemCardDefaultSlider :columns="columns" :items="items"/>
      </template>
      <template v-else>
        <div class="d-flex align-center justify-space-between mb-7">
          <div class="flex-grow-1 text-title font-weight-bold">Deals of the day</div>
          <v-btn v-if="$vuetify.breakpoint.mdAndDown" :to="`/${$store.state.merchant.slug}/collections`" class="px-0" icon light rounded small>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <v-row dense>
          <v-col :key="item.id" cols="6" v-for="item in [...items].slice(0, 4)">
            <ItemCardPicture :value="item" show-price/>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import ItemCardPicture from "../elements/ItemCardPicture";
import ItemCardDefaultSlider from "../elements/ItemCardDefaultSlider";
import SectionTitle from "../elements/SectionTitle";

export default {
		name: 'DealsOfTheDay',
		components: { SectionTitle, ItemCardDefaultSlider, ItemCardPicture },
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
