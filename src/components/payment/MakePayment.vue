<template>
  <v-sheet class="lighten-4">
    <div v-if="view === 'options'" class="py-10 px-8">
      <div class="d-flex mb-10 mr-4">
        <div class="text-h4">How do you intend to pay?</div>
        <v-btn @click="$emit('cancel')" outlined color="red" icon class="mt-1">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card @click="view = 'transfer'" outlined>
        <v-card-text class="d-flex flex-row align-center pa-6 py-md-8 px-md-8">
          <v-icon size="40" color="teal">mdi-bank-transfer-in</v-icon>
          <div class="ml-4">
            <h3 class="black--text">Make a bank transfer</h3>
            <p class="ma-0 mt-1 black--text">Explore already existing products
            </p>
          </div>
        </v-card-text>
      </v-card>
      <v-card @click="view = 'card'" outlined class="mt-4">
        <v-card-text class="d-flex flex-row align-center pa-6 py-md-8 px-md-8">
          <v-icon size="40" color="blue">mdi-credit-card</v-icon>
          <div class="ml-4">
            <h3 class="black--text">Pay with card</h3>
            <p class="ma-0 mt-1 black--text">Make payment directly to merchant</p>
          </div>
        </v-card-text>
      </v-card>
      <v-card outlined class="mt-4">
        <v-card-text class="d-flex flex-row align-center pa-6 py-md-8 px-md-8">
          <img src="../../assets/images/logo-icon.png" style="width: 50px" alt="">
          <div class="ml-4">
            <h3 class="black--text">Buy on Credit</h3>
            <v-chip x-small class="mt-2">Coming soon</v-chip>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <MakeTransferPayment
      v-if="view === 'transfer'"
      :amount="amount" :name="name" :phone="phone"
      @done="$emit('done', $event)"
      @cancel="view = 'options'"
    />

    <MakeCardPayment
      v-if="view === 'card'"
      :amount="amount" :name="name" :phone="phone"
      @done="$emit('done', $event)"
      @cancel="view = 'options'"
    />
  </v-sheet>
</template>

<script>
import MakeTransferPayment from "@/components/transfer/MakeTransferPayment.vue";
import MakeCardPayment from "@/components/payment/MakeCardPayment.vue";

export default {
  name: "MakePayment",
  components: { MakeCardPayment, MakeTransferPayment },
  props: {
    amount: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
  },
  data: () => ({
    view: 'options'
  })
}
</script>
