<template>
  <div class="bannerless-wrap">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <Banner/>
      <div
        :class="{'white': i % 2 === 0, 'grey lighten-5': i % 2 !== 0}" :key="section.name"
        v-for="(section, i) in theme.sections"
      >
        <v-divider v-if="section.name === 'home_banner' && section.enabled"/>
        <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
        <v-divider v-if="section.name === 'top_deals' && section.enabled"/>
        <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
        <v-divider v-if="section.name === 'new_arrivals' && section.enabled"/>
        <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
        <v-divider v-if="section.name === 'best_sellers' && section.enabled"/>
        <Categories v-if="section.name === 'categories' && section.enabled"/>
        <v-divider v-if="section.name === 'categories' && section.enabled"/>
      </div>
      <Features/>
      <Footer/>
    </template>
    <div class="d-flex flex-column fill-height" v-else>
      <v-app-bar absolute color="transparent" elevation="0" height="90" max-height="90">
        <div class="container d-flex align-center pa-0">
          <div class="nav-title white--text">
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
      <Banner class="flex-grow-1"/>
      <v-divider></v-divider>
      <BannerlessItems/>
    </div>
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
import BannerlessItems from "./BannerlessItems";

export default {
  name: "BannerLessTemplate",
  components: {
    BannerlessItems,
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
      current: '',
      theme: this.$store.getters['merchant/theme'],
    }
  },
  computed: {
    sections() {
      return [...this.theme.sections].filter(s => !s.name.match(/home_banner|categories|footer/gi)).map(s => s.name)
    },
  }
}
</script>

<style lang="scss" scoped>
.bannerless-wrap {
  height: calc((var(--vh, 1vh) * 100) - 70px);
}

::v-deep {
  .v-tab--active {
    color: var(--v-primary-base) !important;
    font-weight: bold;
  }

  .v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before {
    border-radius: 6px;
  }

  .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
    display: none;
  }

  .theme--light.v-tabs > .v-tabs-bar {
    background: none;
  }
}
</style>
