<template>
  <v-card outlined class="mt-4">
    <div>
      <div v-for="(item, i) in $store.state.cart.items" :key="item.id">
        <div class="d-flex align-start py-6 px-6">
          <v-card outlined class="position-relative">
            <ProxyImage :src="item.primary_picture" alt="Item" class="cursor-pointer" width="60"></ProxyImage>
          </v-card>
          <div class="flex-grow-1 ml-3">
            <div class="d-flex justify-space-between align-start">
              <p class="ma-0 mr-2">{{ item.name }}</p>
              <p class="ma-0 font-weight-bold">{{ item.plan.price | currency }}</p>
            </div>
            <div class="d-flex justify-space-between align-center mt-3">
              <div>
                <v-text-field
                  :value="item.plan.quantity" dense filled style="width: 140px" hide-details rounded readonly
                >
                  <v-icon @click="$store.commit('cart/decreaseQuantity', item.id)" slot="prepend">
                    mdi-minus
                  </v-icon>
                  <v-icon @click="$store.commit('cart/increaseQuantity', item.id)" slot="append-outer">
                    mdi-plus
                  </v-icon>
                </v-text-field>
              </div>
              <v-btn @click="$store.commit('cart/removeItem', item.id)" color="red" icon small>
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <v-divider v-if="i !== $store.state.cart.items.length - 1"/>
      </div>
    </div>
  </v-card>
</template>

<script>
import ProxyImage from "../ProxyImage";

export default {
  name: "CartListItems",
  components: { ProxyImage },
}
</script>

