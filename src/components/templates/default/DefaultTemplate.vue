<template>
  <div ref="scroller">
    <v-app-bar
      absolute color="transparent" dark elevation="0" height="90" max-height="90"
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <div class="container d-flex align-center pa-0">
        <v-spacer></v-spacer>
        <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <Banner/>
      <div
        :class="{'white': i % 2 !== 0, 'grey lighten-5': i % 2 === 0}" :key="section.name"
        v-for="(section, i) in theme.sections"
      >
        <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
        <v-divider v-if="section.name === 'top_deals' && section.enabled"/>
        <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
        <v-divider v-if="section.name === 'best_sellers' && section.enabled"/>
        <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
        <v-divider v-if="section.name === 'new_arrivals' && section.enabled"/>
        <Categories v-if="section.name === 'categories' && section.enabled"/>
        <v-divider v-if="section.name === 'categories' && section.enabled"/>
      </div>
      <Features/>
      <Footer/>
    </template>
    <template v-else>
      <Banner class="mb-4"/>
      <div :key="section.name" v-for="(section) in theme.sections">
        <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
        <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
        <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
      </div>
    </template>
  </div>
</template>

<script>
import BestSeller from "./BestSeller";
import Banner from "./Banner";
import Footer from "./Footer";
import DealsOfTheDay from "./DealsOfTheDay";
import NewArrivals from "./NewArrivals";
import Categories from "./Categories";
import Features from "./Features";

export default {
  name: "DefaultTemplate",
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
  }
}
</script>
