<template>
  <div class="fill-height d-flex flex-column">
    <div class="position-relative flex-grow-1 rounded overflow-hidden">
      <router-link :to="`/${$store.state.merchant.slug}/item/${item.slug}`" class="position-relative d-block">
        <ProxyImage :src="item.primary_picture" class="rounded-lg"/>
        <div class="d-flex flex-column align-center justify-center fill-width absolute bottom left mb-2" v-if="discount">
          <v-chip class="px-2" color="blue" dark small>Save {{ discount.percentage }}%</v-chip>
          <div class="d-flex mt-2" v-if="discount.end">
            <v-card class="py-2 px-3 mx-1 d-flex flex-column text-center" outlined>{{ timer.days }}
              <small class="ma-0 pa-0">days</small>
            </v-card>
            <v-card class="py-2 px-3 mx-1 d-flex flex-column text-center" outlined>{{ timer.hours }}
              <small class="ma-0 pa-0">hrs</small>
            </v-card>
            <v-card class="py-2 px-3 mx-1 d-flex flex-column text-center" outlined>{{ timer.minutes }}
              <small class="ma-0 pa-0">mins</small>
            </v-card>
            <v-card class="py-2 px-3 mx-1 d-flex flex-column text-center" outlined>{{ timer.seconds }}
              <small class="ma-0 pa-0">secs</small>
            </v-card>
          </div>
        </div>
      </router-link>

      <div class="in-cart-indicator" v-if="$store.getters['cart/inCart'](item)">
        <v-avatar color="green lighten-2" size="30">
          <v-icon color="white" small>mdi-cart-arrow-down</v-icon>
        </v-avatar>
      </div>
      <div class="mt-10 text-center">
        <router-link :to="`/${$store.state.merchant.slug}/item/${item.slug}`" class="text-decoration-none">
          <div :title="item.name" class="text-title text-truncate black--text text-body-2 mb-1">{{ item.name }}</div>
        </router-link>
        <div class="mt-2">
          <div class="text-title black--text text-title font-weight-bold" v-if="item.sell_on_credit === 1">
            {{ monthly_amount | currency }} / mo • {{ item.no_of_months }} month(s)
          </div>
          <div class="text-title black--text text-title font-weight-bold" v-if="item.sell_on_credit === 0">
            {{ price | currency }}
          </div>
          <v-rating
            :value="rating" background-color="orange lighten-3" class="mt-2" color="orange"
            dense readonly size="18" v-if="$store.getters['merchant/theme'].show_product_ratings"
          ></v-rating>
        </div>
        <v-btn
          @click="add()" class="mt-4" color="grey lighten-3" elevation="0"
          small v-if="$vuetify.breakpoint.mdAndUp && item.quantity"
        >
          <v-icon color="primary" left size="15">mdi-cart-plus</v-icon>
          Add to cart
        </v-btn>
        <v-chip class="px-2 mt-5" color="red" dark v-if="!item.quantity" x-small>Out of stock</v-chip>
      </div>
    </div>
  </div>
</template>

<script>
	import card from "../../../mixins/items/card";
	import ProxyImage from "../../ProxyImage";

	export default {
		name: "ItemCardSimple",
		components: { ProxyImage },
		mixins: [card],
	}
</script>
