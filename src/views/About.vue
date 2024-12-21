<template>
  <v-sheet class="pa-8">
    <div class="d-flex align-start py-4">
      <v-avatar size="60">
        <v-img :src="merchant.picture"></v-img>
      </v-avatar>
      <div class="right ml-4">
        <h4 class="text-title">{{ merchant.name }}</h4>
        <div class="text-title-md text-small mt-2">
          <v-icon class="mr-1" color="blue" size="20">mdi-phone</v-icon>
          {{ merchant.phone || 'No phone provided' }}
        </div>
        <div class="text-title-md text-small">
          <v-icon class="mr-1" color="red" size="20">mdi-email</v-icon>
          {{ merchant.email || 'No email provided' }}
        </div>
        <p class="mt-5">
          {{ merchant.address || 'No address' }}
        </p>

        <div class="d-flex icons mt-4">
          <v-btn :href="merchant.whatsapp_link" class="mr-1" color="green" icon target="_blank">
            <v-icon size="20">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn :href="merchant.instagram" class="mr-1" color="red" icon target="_blank">
            <v-icon size="20">mdi-instagram</v-icon>
          </v-btn>
          <v-btn :href="merchant.facebook" class="mr-1" color="blue" icon target="_blank">
            <v-icon size="20">mdi-facebook</v-icon>
          </v-btn>
          <v-btn :href="merchant.twitter" class="mr-1" color="light-blue" icon target="_blank">
            <v-icon size="20">mdi-twitter</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-divider class="mt-8"></v-divider>

    <div class="py-4">
      <v-row>
        <v-col class="d-flex flex-column justify-center align-center text-center">
          <v-avatar color="blue lighten-5">
            <v-icon color="blue">mdi-cart</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ merchant.products_count }} products</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center text-center">
          <v-avatar color="orange lighten-5">
            <v-icon color="orange">mdi-basket</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ merchant.sales_count }} sales</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center text-center" v-if="merchant.verified">
          <v-avatar color="green lighten-5">
            <v-icon color="green">mdi-shield-check</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">Verified</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center text-center" v-else>
          <v-avatar color="green lighten-5">
            <v-icon color="green">mdi-shield-remove</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">Not verified</div>
        </v-col>
      </v-row>
    </div>

    <v-divider class="mb-5"></v-divider>

    <div class="d-flex">
      <v-btn @click="$emit('close')" color="red" outlined>Close</v-btn>
      <v-btn :href="merchant.whatsapp_link" class="ml-2 flex-grow-1" color="green" dark outlined target="_blank">
        <v-icon class="mr-2">mdi-whatsapp</v-icon>
        Whatsapp chat
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
	export default {
		name: "About",
		data() {
			return {
				merchant: this.$store.state.merchant,
			}
		},
	}
</script>

<style lang="scss" scoped>
  @import '../assets/variables';

  .container--fluid {
    margin-top: var(--nav-spacing);
    height: calc((var(--vh, 1vh) * 100) - var(--nav-spacing) - 90px)
  }

  .v-application .subtitle-2 {
    font-family: 'Varela', sans-serif !important;
  }
</style>
