<template>
  <div v-if="tags.length" class="pt-md-10">
    <v-container>
      <SectionTitle class="mb-4 mb-md-7" title="Categories"/>
      <v-row v-if="$vuetify.breakpoint.mdAndUp">
        <v-col :md="6" :order-lg="reversed ? '1' : '0'" class="pt-0" cols="12" v-if="tags[0]">
          <CategoryCard :tag="tags[0]" class="fill-height"/>
        </v-col>
        <v-col :md="6" class="py-0" cols="12">
          <v-row>
            <v-col :key="tag.id" :md="6" cols="6" v-for="(tag) in tags.slice(1).splice(0, 4)">
              <CategoryCard :tag="tag" class="fill-height"/>
            </v-col>
            <v-col :key="tag.id" :md="6" cols="6" v-for="tag in (4 - tags.slice(1).splice(0, 4).length)">
              <ItemCardLoading/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <CategoryCardSlider :items="tags" v-else/>
    </v-container>
  </div>
</template>
<script>
import ItemCardLoading from "../elements/ItemCardLoading";
import SectionTitle from "../elements/SectionTitle";
import CategoryCard from "../elements/CategoryCard";
import CategoryCardSlider from "../elements/CategoryCardSlider";

export default {
  name: 'Categories',
  components: { CategoryCardSlider, CategoryCard, SectionTitle, ItemCardLoading },
  props: {
    reversed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
				tags: this.$store.state.merchant.tags || [],
			}
		},
	}
</script>
