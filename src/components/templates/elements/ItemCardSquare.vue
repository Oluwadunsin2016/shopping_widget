<template>
  <div class="fill-height d-flex flex-column">
    <v-card
      class="w-hover-box position-relative flex-grow-1 rounded-lg d-flex flex-column" light
      style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
    >
      <div class="hover-box d-flex flex-column align-center justify-center">
        <v-btn :to="`/${$store.state.merchant.slug}/item/${item.slug}`">
          <v-icon left>mdi-view-array</v-icon>
          View
        </v-btn>
        <v-btn v-if="item.quantity" class="mt-3 px-4" @click="add()">
          <v-icon left>mdi-cart-plus</v-icon>
          Add to cart
        </v-btn>
      </div>
      <ProxyImage :src="item.primary_picture"/>
      <div class="details pt-5 px-4 pb-4">
        <div class="d-flex flex-column align-start justify-center fill-width mb-2" v-if="discount && item.quantity">
          <v-chip class="px-2" color="blue" dark small>Save {{ discount.percentage }}%</v-chip>
          <div class="d-flex mt-2" v-if="discount.end">
            <v-card class="pa-1 d-flex flex-row text-center" outlined>
              <div class="text-caption font-weight-bold">{{ timer.days }}</div>
              <div class="ma-0 ml-1 pa-0 text-caption" style="line-height: 1">days</div>
            </v-card>
            <v-card class="pa-1 ml-1 d-flex flex-row text-center" outlined>
              <div class="text-caption font-weight-bold">{{ timer.hours }}</div>
              <div class="ma-0 ml-1 pa-0 text-caption" style="line-height: 1">hrs</div>
            </v-card>
            <v-card class="pa-1 ml-1 d-flex flex-row text-center" outlined>
              <div class="text-caption font-weight-bold">{{ timer.minutes }}</div>
              <div class="ma-0 ml-1 pa-0 text-caption" style="line-height: 1">mins</div>
            </v-card>
            <v-card class="pa-1 ml-1 d-flex flex-row text-center" outlined>
              <div class="text-caption font-weight-bold">{{ timer.seconds }}</div>
              <div class="ma-0 ml-1 pa-0 text-caption" style="line-height: 1">secs</div>
            </v-card>
          </div>
        </div>
        <div :title="item.name" class="text-title text-truncate black--text font-weight-bold text-body-2 mb-1">{{ item.name }}</div>
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
      <div class="in-cart-indicator" v-if="$store.getters['cart/inCart'](item)">
        <v-avatar color="green lighten-2" size="30">
          <v-icon color="white" small>mdi-cart-arrow-down</v-icon>
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script>
	import card from "../../../mixins/items/card";
	import ProxyImage from "../../ProxyImage";

	export default {
		name: "ItemCardSquare",
		components: { ProxyImage },
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(255, 255, 255, .5), rgba(255, 255, 255, .6));
  }

  .w-hover-box {
    cursor: pointer;

    .hover-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      opacity: 0;
      transition: all .15s ease-in-out;
      background: rgba(0, 0, 0, .2);
      z-index: 1;
    }

    &:hover {
      .hover-box {
        opacity: 1;
      }
    }
  }
</style>
