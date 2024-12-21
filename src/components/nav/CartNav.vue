<template>
  <v-app-bar
    absolute
    max-height="90"
    height="90"
    elevation="0"
  >
    <div class="container pa-0 d-flex">
      <v-icon class="mr-3" color="blue">mdi-cart</v-icon>

      <div class="nav-title mt-2">
        <v-toolbar-title>Cart Summary</v-toolbar-title>
        <div class="text-small">Review purchase and checkout</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn :href="merchant.whatsapp_link" icon target="_blank">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
	export default {
		name: "CartNav",
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
      box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    }
  }
</style>
