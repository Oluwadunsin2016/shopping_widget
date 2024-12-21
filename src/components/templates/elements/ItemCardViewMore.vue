<template>
  <v-card
      :to="`/${$store.state.merchant.slug}/collections`" light outlined
      style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
  >
    <v-responsive :aspect-ratio="4/4">
      <div class="d-flex flex-column align-center justify-center fill-width fill-height absolute top left">
        <v-icon color="blue-grey" size="24">mdi-cart-variant</v-icon>
        <span class="mt-2 blue-grey--text text--lighten-2">View more</span>
      </div>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  name: "ItemCardViewMore"
}
</script>
