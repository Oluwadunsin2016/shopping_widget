<template>
  <div class="fill-height d-flex flex-column">
    <v-list class="flex-grow-1 pa-0 fill-height">
      <v-list-item-group class="fill-height" color="primary">
        <template v-for="tag in merchant.tags">
          <v-list-item :key="tag.id" @click="filter(tag)">
            <v-list-item-icon class="mr-5">
              <v-icon>mdi-shape</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="tag.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${tag.id}`"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
	export default {
		name: 'BannerCategories',
		data() {
			return {
				merchant: this.$store.state.merchant,
				tags: this.$store.state.merchant.tags,
			}
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
