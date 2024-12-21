<template>
  <div ref="scroller">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <Banner class="mt-3"/>
      <div :key="section.name" v-for="(section) in theme.sections">
        <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
        <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
        <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
        <Categories v-if="section.name === 'categories' && section.enabled"/>
      </div>
      <Features/>
      <Footer/>
    </template>
    <template v-else>
      <v-carousel
        :continuous="false"
        :interval="5000"
        class="pa-0 carousel"
        hide-delimiter-background
        :show-arrows="false"
        v-model="current"
        light
      >
        <v-app-bar absolute color="transparent" elevation="0" height="90" max-height="90">
          <div class="container d-flex align-center pa-0">
            <v-spacer></v-spacer>
            <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
              <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </div>
        </v-app-bar>
        <div class="carousel-card">
          <v-carousel-item
            :key="section.name" class="fill-height"
            style="overflow-y: auto"
            v-for="(section) in [...theme.sections].filter(s => !s.name.match(/categories|footer/gi))"
          >
            <template v-if="section.name === 'home_banner' && section.enabled">
              <div class="d-flex align-center justify-space-between mb-5 px-2 pt-2">
                <div class="flex-grow-1 text-title font-weight-bold">
                  <v-list-item-avatar size="30" v-if="$store.state.merchant.picture">
                    <img :src="$store.state.merchant.picture" alt="user">
                  </v-list-item-avatar>
                  <v-avatar v-else class="d-flex align-center justify-center mr-2" color="grey lighten-4">
                    {{ initials($store.state.merchant.name) }}
                  </v-avatar>
                  {{ $store.state.merchant.name }}
                </div>
              </div>
              <Banner/>
            </template>
            <DealsOfTheDay v-if="section.name === 'top_deals' && section.enabled"/>
            <BestSeller v-if="section.name === 'best_sellers' && section.enabled"/>
            <NewArrivals v-if="section.name === 'new_arrivals' && section.enabled"/>
          </v-carousel-item>
        </div>
      </v-carousel>
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
  name: "VenedorTemplate",
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
      current: 0,
      dark: false,
      theme: this.$store.getters['merchant/theme'],
    }
  },
  computed: {
    slides() {
      return this.$store.getters['merchant/theme'].banner_slides;
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  height: calc((var(--vh, 1vh) * 100) - 70px) !important;
  width: 100%;
  overflow: hidden;
  background: rgb(236, 239, 241);

  &-card {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 90px;
    width: 90%;
    height: 70%;
    border-radius: 6px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    box-shadow: 0 0 10px -5px rgba(0, 0, 0, .1);
    overflow: hidden;
    z-index: 3;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 85%;
    height: 70%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    overflow: hidden;
    margin-top: 110px;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    height: 70%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    overflow: hidden;
    margin-top: 130px;
    z-index: 1;
    border: 1px solid rgba(0, 0, 0, .1);
  }
}

::v-deep {
  .v-carousel__item {
    height: 100% !important;
  }

  .v-responsive__content {
    height: 100% !important;
    overflow-y: auto;
    padding: 1rem;
  }

  .v-window__prev, .v-window__next {
    z-index: 5;
  }
}
</style>
