<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="position-relative flex-grow-1 rounded-lg d-flex flex-column mb-4 item-card" light
      style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
    >
      <div class="fill-width py-2 px-3">
        <div class="px-2 text-left d-flex justify-start align-center justify-space-between text-capitalize">
          <div class="d-flex align-center">
            <v-avatar
              size="30" class="d-flex align-center justify-center my-2 mr-2 text-body-2" color="blue lighten-4"
            >
              {{ initials($store.state.merchant.name) }}
            </v-avatar>
            <div class="d-flex flex-column">
              <span
                class="text-small font-weight-bold text-truncate"
                style="letter-spacing: 0; line-height: 1; max-width: 180px"
              >
                {{ $store.state.merchant.name }}
              </span>
            </div>
          </div>
          <div v-if="$store.getters['cart/inCart'](item)">
            <v-avatar color="green lighten-2" size="30">
              <v-icon color="white" small>mdi-cart-arrow-down</v-icon>
            </v-avatar>
          </div>
        </div>
      </div>
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
      <div class="px-3 py-5 px-md-4 flex-grow-1 d-flex flex-column align-stretch justify-center">
        <div v-if="available">
          <div class="text-small black--text font-weight-bold ma-0">
            {{ plan.monthly | currency }}/mo for {{ plan.duration }} month(s)
          </div>
          <div class="text-small black--text font-weight-bold ma-0 mt-1">
            + {{ plan.upfront | currency }} upfront
          </div>
        </div>
        <v-chip v-else small class="mb-1">Not available</v-chip>
        <v-divider class="my-2 fill-width"></v-divider>
        <div :title="item.name" class="text-title black--text text-small fill-width">{{ item.name }}</div>
        <v-divider class="my-3 fill-width"></v-divider>
        <div v-if="item.quantity">
          <v-hover v-slot="{ hover }" class="flex-grow-1 fill-width">
            <v-btn :outlined="!hover" color="primary" elevation="0" @click="$emit('plans')" rounded block>
              <v-icon class="mr-2" size="20">mdi-animation-outline</v-icon>
              View plans
            </v-btn>
          </v-hover>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import ProxyImage from "../../ProxyImage";
import item from "../../../mixins/item.js";

export default {
  name: "ItemCardFull",
  components: { ProxyImage },
  mixins: [item],
  methods: {
    initials: name => {
      return name && name.substring(0, 2).toUpperCase();
    },
  }
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
