<template>
  <v-card class="overflow-hidden rounded-lg" color="grey lighten-4" elevation="0">
    <v-responsive :aspect-ratio="4/2">
      <v-icon class="bg-category-cart" size="100">mdi-cart</v-icon>
      <v-card-text class="px-6 d-flex flex-column justify-center align-start fill-height absolute left center-y">
        <div class="text-title-md font-weight-medium">{{ tag.name }}</div>
        <v-btn class="mt-4" outlined small @click="filter(tag)">
          View products
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-text>
    </v-responsive>
  </v-card>
</template>

<script>
	export default {
		name: "CategoryCard",
		props: {
			tag: {
				type: Object,
				required: true
			},
		},
		methods: {
			filter(tag) {
				const values = this.$store.state.catalogue.filter;
				values.on_credit = 0;
				values.max_monthly_amount = 0;
				values.max_no_of_months = 0;
				values.tag_ids = [tag.id];
				values.end = false;
				values.page_number = 1;
				this.$store.dispatch('catalogue/filterItems', values);
				this.$router.push(`/${ this.$store.state.merchant.slug }/collections`)
			}
		}
	}
</script>

<style lang="scss">
  .bg-category-cart {
    position: absolute;
    top: -30px;
    left: calc(100% - 50px);
    transform: rotate(-20deg);
    opacity: .1;
  }
</style>
