<template>
  <v-card class="pa-0 d-flex flex-column fill-height" elevation="0">
    <v-card-text class="pa-6 px-md-10 fill-height flex-grow-1 d-flex flex-column overflow-y-auto">
      <template v-if="!results.length && !loading">
        <div class="container d-flex align-center pa-0 mb-2">
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" class="mr-0" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <h4 class="font-weight-bold black--text" style="font-size: 1.7rem">What are you looking for?</h4>
        <div class="white rounded-xl mt-10">
          <v-text-field
            v-model="query" @click:append="handleSearch" @keyup.enter="handleSearch"
            :hide-details="'auto'" append-icon="mdi-magnify" placeholder="Search.." filled rounded
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <img src="@/assets/images/shopping-app.svg/" alt="" style="width: 250px" class="mt-8">
        </div>
      </template>
      <template v-else>
        <div class="d-flex align-center">
          <v-text-field
            v-model="query" @click:append="handleSearch" @keyup.enter="handleSearch" dense
            :hide-details="'auto'" append-icon="mdi-magnify" placeholder="What are you looking for?" filled rounded
          ></v-text-field>
          <v-btn @click="$emit('close')" class="ml-2" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-row class="mt-6" :dense="$vuetify.breakpoint.smAndDown" v-if="!loading && results">
          <ProductsList :items="results" layout="full"/>
          <!--          <v-col v-for="item in results" :key="item.id" class="px-2 pb-0" cols="12" lg="6">-->
          <!--            <ItemCardFull v-if="item.name && item.price" :item="item" @add="$emit('add', item)"/>-->
          <!--            <ItemCardPictureOnly v-else :item="item" @add="$emit('add', item)"/>-->
          <!--          </v-col>-->
        </v-row>
        <div v-if="!page.end && !(fetching || loading)" class="d-flex justify-center mt-4">
          <v-btn @click="search()" elevation="0" px="6" rounded>Load more</v-btn>
        </div>
        <v-row class="mt-6" dense v-if="loading || fetching">
          <v-col :key="i" cols="12" lg="6" v-for="i in 2">
            <ItemCardLoading/>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import http from "@/plugins/http.js";
import ItemCardLoading from "@/components/templates/elements/ItemCardLoading.vue";
import ProductsList from "./catalogue/ProductsList.vue";

export default {
  name: "GlobalStoreSearch",
  components: { ProductsList, ItemCardLoading },
  data() {
    return {
      query: '',
      results: [],
      page: {
        count: 12,
        end: false,
        next: 1,
      },
      loading: false,
      fetching: false,
    }
  },
  methods: {
    async handleSearch() {
      this.page.next = 1;
      this.page.end = true;
      await this.search();
    },
    async search() {
      if (!this.query) return;
      const payload = { described_item: this.query };
      if (this.page.next === 1) this.loading = true;
      else this.fetching = true;
      const res = await http.post(`/shop/web`, { ...payload, show_result: true }, {
        params: { page: this.page.next },
      });
      const { data: items, count, next, end } = res.data.data.results_data;
      this.results = this.page.next === 1 ? items : [...this.results, ...items];
      this.page = { count, next, end };
      this.loading = false;
      this.fetching = false;
    }
  }
}
</script>
