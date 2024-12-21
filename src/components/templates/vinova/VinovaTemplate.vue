<template>
  <div :class="{'bg-effect': $vuetify.breakpoint.smAndDown}" ref="scroller">
    <v-app-bar
      color="transparent" dark elevation="0" height="90" max-height="90" relative
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <div class="container d-flex align-center pa-0">
        <div class="nav-title">
          <v-toolbar-title>{{ $store.state.merchant.name }}</v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar>
    <Banner/>
    <div :key="section.name" v-for="(section) in theme.sections">
      <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
      <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
      <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
      <Categories v-if="section.name === 'categories' && section.enabled && $vuetify.breakpoint.mdAndUp"/>
    </div>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <Features/>
      <Footer/>
    </template>
  </div>
</template>

<script>
import BestSeller from "./BestSeller";
import Banner from "./Banner";
import Footer from "../default/Footer";
import DealsOfTheDay from "./DealsOfTheDay";
import NewArrivals from "./NewArrivals";
import Categories from "./Categories";
import Features from "../default/Features";

export default {
  name: "VinovaTemplate",
  components: {
    Features,
    Categories,
    BestSeller,
    Banner,
    Footer,
    DealsOfTheDay,
    NewArrivals
  },
  data() {
    return {
      theme: this.$store.getters['merchant/theme'],
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-effect {
  position: relative;

  &::before {
    content: '';
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 350px;
    background: var(--v-primary-darken2);
  }
}
</style>
