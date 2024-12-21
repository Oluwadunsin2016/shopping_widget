<template>
  <v-app-bar
      absolute
      max-height="90"
      height="90"
      elevation="0"
      :class="{'appbar-transparent-overlay': transparent}"
      :dark="transparent"
  >
    <div class="container d-flex pa-0">
      <v-btn @click="$router.back()" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="merchant.whatsapp_link" :href="merchant.whatsapp_link" icon target="_blank">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>

      <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon v-if="cart">
        <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    cart: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: true
    },
    transparent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      catalogue: this.$store.state.catalogue,
      merchant: this.$store.state.merchant
    };
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-toolbar__content {
    /*box-shadow: 0 0 20px rgba(0, 0, 0, .2);*/
  }
}
</style>
