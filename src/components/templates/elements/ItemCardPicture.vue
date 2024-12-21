<template>
  <div class="fill-height d-flex flex-column">
    <div class="position-relative flex-grow-1 rounded overflow-hidden">
      <v-card :to="link || `/${$store.state.merchant.slug}/item/${item.slug}`" elevation="0" light outlined>
        <ProxyImage :src="item.primary_picture"/>
        <div class="py-2 px-4 border-top" v-if="showPrice">
          <div class="d-flex justify-space-between">
            <div>
              <div class="text-title black--text text-body-2 font-weight-bold" v-if="item.sell_on_credit === 1">
                {{ monthly_amount | currency }} / mo • {{ item.no_of_months }} month(s)
              </div>
              <div class="text-title black--text text-body-2 font-weight-bold" v-if="item.sell_on_credit === 0">
                {{ price | currency }}
              </div>
            </div>
          </div>
        </div>
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
import ProxyImage from "../../ProxyImage";

export default {
  name: "ItemCardPicture",
  components: { ProxyImage },
  mixins: [card],
  props: {
    showPrice: {
      type: Boolean,
      default: false
    }
  }
}
</script>
