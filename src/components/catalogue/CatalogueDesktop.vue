<template>
  <div class="bottom-nav-spacing">
    <v-container style="max-width: 650px">
      <v-app-bar color="transparent" elevation="0" height="90" max-height="90">
        <div class="d-flex align-center fill-width">
          <div class="d-flex align-center font-weight-bold ma-0" style="font-size: 1rem">
            <v-avatar color="primary" class="white--text text-uppercase mr-3" size="42">
              {{ $store.state.merchant.name.substring(0, 2) }}
            </v-avatar>
            {{ $store.state.merchant.name }}
          </div>
          <v-spacer></v-spacer>
          <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
            <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </v-app-bar>
      <div class="mt-2">
        <ProductsList :items="items"/>
      </div>
    </v-container>

    <SpeedDial/>

    <BottomNavigationStore/>
  </div>
</template>

<script>
import catalogue from "../../mixins/catalogue";
import BottomNavigationStore from "@/components/nav/BottomNavigationStore.vue";
import SpeedDial from "@/components/SpeedDial.vue";
import ProductsList from "@/components/catalogue/ProductsList.vue";

export default {
  name: "CatalogueDesktop",
  mixins: [catalogue],
  components: {
    ProductsList,
    SpeedDial,
    BottomNavigationStore,
    // ItemCardLoading,
  },
  computed: {
    loading() {
      return this.$store.state.catalogue.loading;
    },
    fetching() {
      return this.$store.state.catalogue.fetching;
    },
    filter_position() {
      return this.$store.getters['merchant/theme'].filter_position;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding: 0;
}
</style>
