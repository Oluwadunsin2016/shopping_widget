<template>
  <div>
    <ProductListVerticalCards
      :items="items" v-if="layout === 'grid'"
      @details="current = $event; views.details = true"
      @plans="current = $event; views.plans = true"
    />
    <ProductListHorizontalCards
      :items="items" v-if="layout === 'full'"
      @details="current = $event; views.details = true"
      @plans="current = $event; views.plans = true"
    />

    <div v-if="!items.length && !loading && !fetching">
      <div class="text-center py-10 py-md-16 d-flex flex-column align-center">
        <img src="@/assets/images/shopping-app.svg/" alt="" style="width: 250px"/>
        <h1 class="mt-10 black--text" style="font-size: 1.5rem">
          {{ 'No products added yet' }}
        </h1>
        <p class="black--text mt-4" style="max-width: 300px">
          {{ $store.state.merchant.name }} has not added any product to their store yet
        </p>
      </div>
    </div>

    <v-container v-if="items.length && !loading && !fetching && !end" class="my-8">
      <v-btn @click="loadMore()" outlined rounded block class="d-flex align-center">
        Load more
        <v-icon class="ml-3">mdi-chevron-down</v-icon>
      </v-btn>
    </v-container>

    <div class="floating-btn text-center">
      <v-btn @click="cancelSearch" color="red lighten-4" elevation="0" rounded type="primary" v-if="searching">
        <v-icon left>mdi-close</v-icon>
        Cancel search
      </v-btn>
    </div>

    <v-dialog
      v-if="$vuetify.breakpoint.mdAndDown" v-model="views.details"
      fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <QuickAddToCart
        v-if="current" :item="current" @plans="views.details = false; views.plans = true"
        @close="views.details = false"
      />
    </v-dialog>
    <v-navigation-drawer v-else v-model="views.details" fixed right temporary width="550" style="z-index: 9999999">
      <QuickAddToCart
        v-if="current" :item="current" @plans="views.details = false; views.plans = true"
        @close="views.details = false"
      />
    </v-navigation-drawer>

    <v-dialog
      v-if="$vuetify.breakpoint.mdAndDown" v-model="views.plans"
      fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <ProductPlans v-if="current" :item="current" @close="views.plans = false"/>
    </v-dialog>
    <v-navigation-drawer v-else v-model="views.plans" fixed right temporary width="550" style="z-index: 9999999">
      <ProductPlans v-if="current" :item="current" @close="views.plans = false"/>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ProductListVerticalCards from "./ProductListVerticalCards";
import ProductListHorizontalCards from "./ProductListHorizontalCards";
import QuickAddToCart from "./QuickAddToCart.vue";
import ProductPlans from "./ProductPlans.vue";

export default {
  name: "ProductsList",
  components: { ProductPlans, QuickAddToCart, ProductListHorizontalCards, ProductListVerticalCards },
  props: {
    items: {
      type: Array,
      required: true
    },
    layout: {
      type: String,
      default: 'grid'
    }
  },
  data: () => ({
    selected: {},
    views: {
      plans: false,
      details: false,
    },
    current: null
  }),
  created() {
    const { p } = this.$route.query;
    if (p) this.getItem(p);
  },
  metaInfo() {
    return {
      title: this.current ? this.current.name : 'Products',
    }
  },
  methods: {
    cancelSearch() {
      this.$store.commit('catalogue/cancelSearch');
    },
    async getItem(pid) {
      try {
        const id = await this.$store.dispatch('catalogue/resolveItemId', pid);
        // eslint-disable-next-line no-unused-vars
        const { data: { data: { merchant, ...item } } } = await this.$http.get(`/item/${ id || pid }`);
        this.current = item;
        this.views.details = true;
      } catch (e) {
        console.log({ e });
      }
    },
    loadMore() {
      const { filter, globalItems, search, merchantItems, page } = this.$store.state.catalogue;
      if (this.$store.state.merchant.reseller === 1) {
        if (merchantItems.length && !globalItems.length) {
          if (page.end) {
            this.$store.commit('catalogue/set', { page: { ...page, end: false, next: 1 } });
            this.$store.dispatch('catalogue/globalItems');
          } else {
            this.$store.dispatch('catalogue/merchantItems');
          }
        } else if (globalItems.length) {
          this.$store.dispatch('catalogue/globalItems');
        } else {
          console.log('Oops!');
        }
      } else {
        if (this.searching) {
          this.$store.dispatch('catalogue/searchItems', search);
        } else if (this.filtering) {
          this.$store.dispatch('catalogue/filterItems', filter);
        } else if (merchantItems.length) {
          this.$store.dispatch('catalogue/merchantItems');
        } else if (globalItems.length) {
          this.$store.dispatch('catalogue/globalItems');
        }
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.catalogue.loading;
    },
    fetching() {
      return this.$store.state.catalogue.fetching;
    },
    searching() {
      return this.$store.state.catalogue.searching
    },
    end() {
      const { globalItems, page, merchantItems } = this.$store.state.catalogue;
      if (this.$store.state.merchant.reseller === 1) {
        return merchantItems.length && globalItems.length && page.end
      } else {
        return merchantItems.length && page.end
      }
    }
  },
  watch: {
    views: {
      handler(v) {
        if (!v.plans && !v.details) {
          this.current = null;
        }
      },
      deep: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.floating-btn {
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 100px;
  z-index: 1;
}
</style>
