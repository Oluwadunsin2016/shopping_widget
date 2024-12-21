<template>
  <div class="fill-height d-flex flex-column">
    <v-hover v-slot="{ hover }">
      <v-card
        class="position-relative flex-grow-1 rounded-lg d-flex flex-column mb-2 item-card overflow-hidden" light
        style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
      >
        <div @click="$emit('details')" class="border-bottom position-relative d-block cursor-pointer">
          <div class="slight-overlay position-relative">
            <template v-if="item.secondary_picture">
              <ProxyImage
                :src="item.secondary_picture"
                v-show="hover && item.secondary_picture && !item.secondary_picture.match(/undefined|null/gi)"
              />
            </template>
            <ProxyImage
              :src="item.primary_picture"
              v-show="!hover || !item.secondary_picture || item.secondary_picture.match(/undefined|null/gi)"
            />
            <div v-if="$store.getters['cart/inCart'](item)" class="in-cart-indicator ml-2 mt-2">
              <v-chip color="green" class="white--text px-4">
                <v-icon small class="mr-2">mdi-cart-arrow-down</v-icon>
                Added to cart
              </v-chip>
            </div>
          </div>
        </div>
        <div class="px-3 py-3 px-md-4 flex-grow-1 d-flex flex-column align-stretch justify-center">
          <div :title="item.name" class="text-title black--text text-body-2 fill-width">
            {{ item.name }}
          </div>
          <v-divider class="my-2 fill-width"></v-divider>
          <div v-if="available">
            <div class="text-small black--text font-weight-bold ma-0">
              {{ item.price | currency }}
            </div>
          </div>
          <v-chip v-else small class="mb-1">Not available</v-chip>
<!--          <template v-if="item.quantity">-->
<!--            <v-divider class="my-3 fill-width"></v-divider>-->
<!--            <div class="fill-width">-->
<!--              <v-hover v-slot="{ hover }">-->
<!--                <v-btn :outlined="!hover" block color="primary" elevation="0" @click="$emit('plans')" rounded>-->
<!--                  <v-icon left>mdi-animation-outline</v-icon>-->
<!--                  View plans-->
<!--                </v-btn>-->
<!--              </v-hover>-->
<!--            </div>-->
<!--          </template>-->
          <div v-if="!item.quantity" class="mt-2 pt-2 border-top fill-width">
            <v-chip class="px-2" color="red" dark x-small>Out of stock</v-chip>
          </div>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import ProxyImage from "../../ProxyImage";
import item from "../../../mixins/item.js";

export default {
  name: "ItemCardDefault",
  components: { ProxyImage },
  mixins: [item],
}
</script>

<style lang="scss" scoped>
::v-deep {
  .offscreen {
    position: absolute;
    top: 0;
    right: -100px;
    transition: all .15s ease-in-out;
    z-index: 1;

    &.visible {
      right: 0
    }
  }
}

.item-card {
  transition: all .15s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
}
</style>
