<template>
  <div>
    <v-bottom-sheet inset max-width="500" scrollable v-model="views.cart">
      <CartContent @checkout="handleCheckout()" @close="showView()" @view="showView($event)"/>
    </v-bottom-sheet>

    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="views.checkout">
      <Checkout :lender="lender" @cancel="showView('cart')" @done="closeViews()"/>
    </v-dialog>
  </div>
</template>

<script>
import CartContent from "./CartContent"
import Checkout from "../Checkout"
import cart from "../../mixins/cart";
import views from '../../mixins/views';

export default {
  name: 'CartMobile',
  components: {  CartContent, Checkout },
  mixins: [cart, views]
}
</script>
