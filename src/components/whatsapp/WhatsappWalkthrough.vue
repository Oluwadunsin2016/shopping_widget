<template>
  <v-carousel
    :show-arrows="false" class="my-auto" delimiter-icon="mdi-minus"
    hide-delimiter-background v-model="model"
  >
    <v-carousel-item>
      <div class="pa-12 text-center">
        <div class="d-block mx-auto mb-5">
          <img alt="Modern life illustration" src="@/assets/images/chatting.svg" width="200"/>
        </div>
        <h4 class="black--text mt-10">
          Please ensure you have contacted the merchant via whatsapp before proceeding, and the merchant has the
          product(s) you want to buy in stock
        </h4>
        <v-btn @click="model++" class="mt-12" color="primary" outlined>Next</v-btn>
      </div>
    </v-carousel-item>
    <v-carousel-item>
      <div class="pa-12 text-center">
        <div class="d-block mx-auto mb-5">
          <img alt="Modern life illustration" src="@/assets/images/secure-server.svg" width="200"/>
        </div>
        <h4 class="black--text mt-10">
          All information and personal data provided to us are safe and protected
        </h4>
        <div class="mt-12">
          <v-btn @click="model--" class="mr-2" color="grey" icon>
            <v-icon color="grey">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="model++" color="primary" outlined>Next</v-btn>
        </div>
      </div>
    </v-carousel-item>
    <v-carousel-item>
      <div class="pa-12 text-center">
        <div class="d-block mx-auto mb-5">
          <img alt="Modern life illustration" src="@/assets/images/online-payments.svg" width="200"/>
        </div>
        <h4 class="black--text mt-10">
          Our partner banks pays on your behalf while you pay back with ease
        </h4>
        <div class="mt-12 d-inline-flex">
          <v-btn @click="model--" class="mr-2" color="grey" icon>
            <v-icon color="grey">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="$emit('done')" color="primary" elevation="0">Start</v-btn>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: 'WhatsappWalkthrough',
  data() {
    return {
      model: 0
    }
  }
}
</script>
