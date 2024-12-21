<template>
  <div>
    <h5 style="font-size: 1.2rem">Related Items</h5>
    <v-row class="mt-10" dense>
      <template v-if="loading">
        <v-col :key="i" :md="3" cols="6" v-for="i in 3">
          <ItemCardLoading/>
        </v-col>
      </template>
      <template v-else>
        <v-col :key="item.id" :md="cols" cols="6" v-for="item in items.slice(0, 4)">
          <ItemCardDefault :value="item"/>
        </v-col>
      </template>
    </v-row>
    <p v-if="!loading && !items.length">No related items</p>
  </div>
</template>

<script>
	import ItemCardDefault from "../templates/elements/ItemCardDefault";
	import ItemCardLoading from "../templates/elements/ItemCardLoading";

	export default {
		name: "RelatedItems",
		components: { ItemCardLoading, ItemCardDefault },
		props: {
			item: {
				type: Object,
				required: true
			},
			cols: {
				type: Number,
				default: 6
			}
		},
  data() {
    return {
      items: [],
      loading: false
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true
      try {
        const res = await this.$http.get(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/item/${ this.item.id }/related`)
        this.items = res.data.data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false
    }
  },
  watch: {
    item() {
      this.fetch();
    }
  }
}
</script>
