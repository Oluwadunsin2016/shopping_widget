<template>
  <div class="d-flex flex-column flex-grow-1 px-6 px-md-10 pb-3">
    <div>
      <div class="container d-flex align-center pa-0 mb-2">
        <h1
          class="black--text font-weight-bold"
          style="line-height: 2.3rem; width: 90%"
        >
          Place your order, pay in 3-6 installments.
        </h1>
        <v-btn @click="$emit('close')" class="mr-0" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <p class="mt-5 black--text">
        Only use the option if you can't find item you are looking for in the
        collection menu.
      </p>
      <!-- <v-btn elevation="0" solid color="primary" class="mt-10" @click="$emit('done')">Continue</v-btn> -->
    </div>
    <!-- <img
      src="@/assets/images/successful-purchase.svg"
      class="footer-img mt-auto ml-auto" alt="bg" style="width: 70%;"
    /> -->
  </div>
</template>

<script>
export default {
  name: "WhatsappPurchaseQuantity",
};
</script>
