<template>
  <v-sheet class="pa-8 pa-md-12">
    <h3 class="mb-8">How would you like to proceed?</h3>
    <v-card
      outlined @click="$emit('close'); $router.push(`/${$store.state.merchant.slug}/collections`)"
    >
      <v-card-text class="d-flex flex-row align-center pa-6 py-md-8 px-md-8">
        <v-icon size="40" color="blue">mdi-view-grid-outline</v-icon>
        <div class="ml-4">
          <h3 class="black--text">Start shopping</h3>
          <p class="ma-0 mt-1 black--text">Explore already existing products</p>
        </div>
      </v-card-text>
    </v-card>
    <v-card
      @click="$router.push(`/${$store.state.merchant.slug}/pay?m=pay`); $emit('close')" outlined class="mt-4"
    >
      <v-card-text class="d-flex flex-row align-center pa-6 py-md-8 px-md-8">
        <v-icon size="40" color="orange">mdi-cash</v-icon>
        <div class="ml-4">
          <h3 class="black--text">Pay merchant</h3>
          <p class="ma-0 mt-1 black--text">Make payment directly to merchant</p>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "ShopOptions"
}
</script>
