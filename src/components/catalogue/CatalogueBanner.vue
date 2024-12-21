<template>
  <v-carousel
    :continuous="false"
    hide-delimiters
    :interval="5000"
    class="p-0"
    :show-arrows="false"
    hide-delimiter-background
    height="40vh"
  >
    <template>
      <v-carousel-item>
        <v-card class="fill-height pa-0 overflow-hidden" rounded="0">
          <v-img
            gradient="to right, rgba(0,0,0,.5), rgba(0,0,0,.3)" :src="slides[0].image"
            class="fill-width fill-height d-block"
          ></v-img>
          <v-card-text class="d-flex justify-space-between align-center fill-height absolute left center-y pa-0">
            <v-container>
              <v-card class="banner-text" color="transparent" elevation="0">
                <div class="banner-title text-h4 text-md-h4 white--text font-weight-bold">Shop now, pay twice</div>
                <div class="text-title-md white--text mt-5">0% interest on repayment</div>
              </v-card>
            </v-container>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>

<script>

export default {
  name: "CatalogueBanner",
  data() {
    return {
      current: 0,
      show: {
        0: false,
        1: false,
        2: false
      },
      merchant: this.$store.state.merchant,
      views: {
        categories: 'categories',
        filter: 'filter',
      },
      view: 'categories',
    }
  },
  computed: {
    slides() {
      return this.$store.getters['merchant/theme'].banner_slides
    }
  },
}
</script>

<style lang="scss" scoped>
.banner-text {
  min-width: 300px;
  max-width: 700px;
  width: fit-content;
}
</style>
