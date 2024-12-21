<template>
  <div class="fill-height d-flex flex-column">
    <div class="w-hover-box position-relative flex-grow-1 rounded overflow-hidden">
      <div class="hover-box d-flex flex-column align-center justify-center">
        <div class="d-flex flex-column align-center mb-3 text-center">
          <div :title="item.name" class="text-title white--text font-weight-bold text-body-2 mb-1" style="max-width: 300px">
            {{ item.name }}
          </div>
          <div class="text-title white--text text-body-2 font-weight-bold mt-1" v-if="item.sell_on_credit === 1">
            {{ item.discount_price || item.price | currency }} for {{ item.no_of_months }} month(s)
          </div>
          <div class="text-title white--text text-body-2 font-weight-bold mt-1" v-if="item.sell_on_credit === 0">
            {{ item.discount_price || item.price | currency }} outright
          </div>
          <v-rating
              v-if="$store.getters['merchant/theme'].show_product_ratings" :value="rating" background-color="orange lighten-3" class="mt-2"
              color="orange" dense readonly
              size="18"
          />
        </div>
        <v-btn :to="`/${$store.state.merchant.slug}/item/${item.slug}`" rounded>
          <v-icon left>mdi-view-array</v-icon>
          View
        </v-btn>
      </div>
      <div v-if="discount" class="percent-off">{{ discount.percentage }}% off
        <span v-if="discount.end">, ends in {{ timer.days }}d:{{ timer.hours }}h:{{ timer.minutes }}m:{{ timer.seconds }}s</span>
      </div>
      <v-card elevation="0" outlined>
        <v-img :aspect-ratio="4/7" :src="item.primary_picture" class="ma-0 fill-height"/>
      </v-card>
      <div class="in-cart-indicator" v-if="$store.getters['cart/inCart'](item)">
        <v-avatar color="green lighten-2" size="30">
          <v-icon color="white" small>mdi-cart-arrow-down</v-icon>
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import card from "../../../mixins/items/card";

export default {
  name: "BannerItem",
  mixins: [card],
}
</script>

<style lang="scss" scoped>
.percent-off {
  position: absolute;
  top: 10px;
  right: 7px;
  padding: 3px 7px;
  border-radius: 4px;
  background: crimson;
  font-size: .76rem;
  color: #fff;
  z-index: 1;
}

.details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(255, 255, 255, .5), rgba(255, 255, 255, .4));
}
</style>
