<template>
  <div>
    <v-navigation-drawer fixed right temporary v-model="views.cart" width="550">
      <CartContent @checkout="handleCheckout()" @close="showView()" @view="showView($event)"/>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right temporary v-model="views.lender" width="550">
      <BankWalkthrough :lender="lender" v-if="views.lender && lender" @start="showView('checkout')"/>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right temporary v-model="views.checkout" width="550">
      <Checkout :lender="lender" @cancel="showView('cart')" @done="closeViews()"/>
    </v-navigation-drawer>
  </div>
</template>

<script>
import CartContent from "./CartContent";
import Checkout from "../Checkout";
import cart from "../../mixins/cart";
import views from '../../mixins/views'
import BankWalkthrough from "@/components/eligibility/BankWalkthrough";

export default {
  name: "CartDesktop",
  components: { BankWalkthrough, CartContent, Checkout },
  mixins: [cart, views],
}
</script>
