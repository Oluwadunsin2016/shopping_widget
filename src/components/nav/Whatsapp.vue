<template>
  <v-sheet class="px-6 py-6 d-flex flex-column align-center">
    <p class="text-title mb-4 d-flex align-center justify-center mt-8">
      Chat with merchant
    </p>
    <v-avatar class="my-7" color="green lighten-5" size="100">
      <v-icon color="green" size="50">mdi-whatsapp</v-icon>
    </v-avatar>
    <v-subheader class="text-center mb-5">
          <span>
            Get in touch with <span class="font-weight-bold">{{ merchant.name }}</span> on whatsapp, click the button
            below to continue
          </span>
    </v-subheader>
    <div class="mt-5 d-flex flex-column align-center">
      <v-btn href="https://wa.me/+2349053535333?text=Hi" class="mt-2" color="green" dark elevation="0" target="_blank">
        Chat with merchant
      </v-btn>
    </div>
  </v-sheet>
</template>
<script>
export default {
  name: 'Whatsapp',
  data() {
    return {
      merchant: this.$store.state.merchant,
    }
  }
}
</script>
