<template>
  <v-card elevation="0" v-if="cart.items.length">
    <v-card-text class="py-10 px-6 px-md-10">
      <div class="mb-8">
        <div class="text-h6 mb-1 font-weight-bold">Review your order</div>
        <p class="ma-0">Checkout or continue shopping</p>
      </div>

      <CartListItems @close="$emit('close')"/>

      <v-card class="py-6 position-relative overflow-hidden px-0 mt-4" outlined>
        <div class="px-6 py-2 d-flex justify-space-between align-center">
          <div class="text-title black--text">Total</div>
          <div class="banner-title text-h6 black--text font-weight-bold pr-5">
            {{ total | currency }}
          </div>
        </div>
        <div class="absolute right top" style="transform: translate(60%, 10px) rotate(-10deg); opacity: .2">
          <v-icon color="primary" size="200">mdi-cart</v-icon>
        </div>
      </v-card>

      <div class="mt-8">
        <v-btn @click="$emit('checkout')" block class="px-8 add_to_cart" color="primary" dark elevation="0" large rounded>
          Checkout
        </v-btn>
        <!-- begin_checkout -->
        <v-btn @click="$emit('close')" block class="mt-4 " elevation="0" text type="primary" rounded>
          <v-icon left>mdi-arrow-left</v-icon>
          Continue shopping
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-sheet class="d-flex flex-column justify-center align-center text-center pt-12" v-else>
    <v-icon color="grey lighten-2" size="150">mdi-cart-outline</v-icon>
    <div class="title mt-10 font-weight-medium blue-grey--text">Cart is empty</div>
    <p class="mt-5" style="max-width: 300px">Go back to the catalogue and add items to your cart</p>
    <br><br>
  </v-sheet>
</template>

<script>
import CartListItems from "./CartItemsList"

export default {
  name: 'CartContent',
  components: { CartListItems },
  data() {
    return {
      scheduleVisible: false,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
    total() {
      return this.$store.getters["cart/total"]
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-list-group > .v-list-item {
  padding: 0;
}

::v-deep .v-image__image {
  border-radius: 4px;
}
</style>
