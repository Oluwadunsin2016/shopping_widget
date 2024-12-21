<template>
  <div class="fill-height d-flex flex-column">
    <v-hover v-slot="{ hover }">
      <v-card
        class="position-relative flex-grow-1 rounded-lg d-flex flex-column mb-2 item-card" light
        style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
      >
        <div @click="$emit('details')" class="border-bottom position-relative d-block cursor-pointer">
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
        </div>
        <div v-if="$store.getters['cart/inCart'](item)" class="in-cart-indicator">
          <v-avatar color="green lighten-2" size="30">
            <v-icon color="white" small>mdi-cart-arrow-down</v-icon>
          </v-avatar>
        </div>
        <div class="px-3 py-3 px-md-4 flex-grow-1 d-flex flex-column align-start justify-center">
          <div class="flex-grow-1 text-small">
            No information available
          </div>
          <div v-if="item.quantity" class="mt-2 pt-2 border-top fill-width">
            <v-hover v-slot="{ hover }">
              <v-btn :outlined="!hover" block color="primary" elevation="0" @click="$emit('plans')" rounded>
                <v-icon left>mdi-animation-outline</v-icon>
                View plans
              </v-btn>
            </v-hover>
          </div>
          <div v-else class="mt-2 pt-2 border-top fill-width">
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
  name: "ItemCardPictureOnly",
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
