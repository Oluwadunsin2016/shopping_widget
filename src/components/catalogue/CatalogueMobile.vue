<template>
  <div class="mx-auto bottom-nav-spacing" style="max-width: 550px">
    <v-app-bar
      :dark="theme.collection_banner"
      absolute color="transparent" elevation="0" height="90" max-height="90" v-if="$vuetify.breakpoint.smAndDown"
    >
      <div class="container d-flex align-center pa-0">
        <v-spacer></v-spacer>
        <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
          <v-btn @click="$store.dispatch('cart/show')" class="mr-0" elevation="1" rounded>
            <v-icon class="mr-3">mdi-cart</v-icon>
            Cart
          </v-btn>
        </v-badge>
      </div>
    </v-app-bar>

    <v-card class="border-bottom pt-10 pb-5 overflow-hidden" elevation="0" rounded="0">
      <v-container class="pt-10 overflow-hidden">
        <!-- <div class="text-h5 font-weight-bold">Buy on credit</div> -->
        <div class="text-h5 font-weight-bold">Buy and make swift payment</div>
        <p class="ma-0 mt-2">You do not need to worry</p>
        <div class="absolute right top" style="transform: translate(40%, 10px); opacity: .7">
          <img src="/img/instagram-phone-half.png" alt="ig phone"/>
        </div>
      </v-container>
    </v-card>

    <v-container class="py-4 flex-grow-1 overflow-hidden">
      <div v-if="items.length" class="d-flex align-center">
        <v-btn @click="layout = 'grid'" class="mr-1" :color="layout !== 'full' ? 'primary' : 'grey'" dark icon>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn @click="layout = 'full'" class="mr-1" :color="layout !== 'grid' ? 'primary' : 'grey'" dark icon>
          <v-icon>mdi-view-agenda</v-icon>
        </v-btn>
        <v-btn @click="views = {...views, search: true }" class="ml-auto" color="grey darken-3" text rounded>
          <v-icon left size="18">mdi-magnify</v-icon>
          Search
        </v-btn>
      </div>
    </v-container>

    <ProductsList :items="items" :layout="layout"/>

    <!-- Search & Filter -->
    <v-bottom-sheet inset max-width="500" v-model="views.search">
      <v-sheet class="pa-8 py-6">
        <v-tabs background-color="transparent" grow v-model="searchTab">
          <v-tab>Search</v-tab>
          <v-tab>Filter</v-tab>
        </v-tabs>
        <v-tabs-items v-model="searchTab">
          <v-tab-item class="py-10">
            <br><br><br>
            <SearchItems @close="views = { ...views, search: false }"/>
            <br><br><br>
          </v-tab-item>
          <v-tab-item class="py-10">
            <FilterItemsSide @close="views = { ...views, search: false }"/>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet inset max-width="500" v-model="views.about">
      <About @close="views = { ...views, about: false }"/>
    </v-bottom-sheet>

    <v-bottom-sheet inset max-width="500" v-model="views.referral">
      <Referral @close="views = { ...views, referral: false }"/>
    </v-bottom-sheet>

    <SpeedDial/>

    <BottomNavigationStore/>
  </div>
</template>

<script>
import FilterItemsSide from "../FilterItemsSide"
import ProductsList from "./ProductsList"
import SearchItems from "../SearchItems"
import catalogue from "../../mixins/catalogue";
import About from "../../views/About";
import Referral from "../referral/Referral";
import BottomNavigationStore from "@/components/nav/BottomNavigationStore.vue";
import SpeedDial from "@/components/SpeedDial.vue";

export default {
  name: 'CatalogueMobile',
  mixins: [catalogue],
  components: { SpeedDial, BottomNavigationStore, Referral, About, FilterItemsSide, ProductsList, SearchItems },
  data() {
    return {
      theme: this.$store.getters['merchant/theme']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/variables';

.parent {
  margin-top: var(--nav-spacing);
  height: calc((var(--vh, 1vh) * 100) - var(--nav-spacing));
}
</style>
