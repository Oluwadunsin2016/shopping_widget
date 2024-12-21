<template>
  <div class="pt-md-5" v-if="tags.length">
    <v-container>
      <SectionTitle class="mb-7" title="Categories"/>
      <CategoryCardSlider :items="tags" v-if="$vuetify.breakpoint.mdAndUp"/>
      <v-row v-else>
        <v-col :key="tag.id" cols="12" md="6" v-for="(tag) in [...tags].splice(0, 4)">
          <CategoryCard :tag="tag"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
	import SectionTitle from "../elements/SectionTitle";
	import CategoryCardSlider from "../elements/CategoryCardSlider";
	import CategoryCard from "../elements/CategoryCard";

	export default {
		name: 'Categories',
		components: { CategoryCard, CategoryCardSlider, SectionTitle },
		data() {
			return {
				tags: this.$store.state.merchant.tags || [],
			}
		}
	}
</script>
