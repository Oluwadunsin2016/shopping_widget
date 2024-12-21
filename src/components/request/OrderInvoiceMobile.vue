<template>
  <div class="position-relative  fill-width mb-16 pb-14">
    <div
      class="pa-5 grey lighten-5 position-relative overflow-hidden my-2"
      v-for="(request, i) in item.data"
      :key="i"
    >
      <div class="mb-4 container-fluid ">
        <div class="text-title font-weight-bold">{{ request.fullname }}</div>
        <div class="d-flex gap-4 align-center">
          <div class=" px-2">
            <div v-if="request.primary_picture">
              <img
                :src="request.primary_picture"
                class="img-fluid img-thumbnail rounded mx-auto imgSize "
              />
            </div>
          </div>
          <div class="ml-4">
            <div
              class="text-small mt-2 text-wrap blue-grey--text    text--darken-1"
            >
              {{ request.name }}
            </div>
            <div class="text-small mt-4 mb-2">{{ request.address }}</div>
            <div class="text-title py-2 mt-4 mb-2 font-weight-bold">
              {{ request.price | currency }}
            </div>
            <hr />
            <div class="text-title py-2 font-weight-bold">
              Merchent Name: {{ request.merchant_slug }}
            </div>
            <div class="text-small py-2 font-weight-bold">
              <a
                :href="'https://shop.4401.live/' + request.merchant_slug"
                target="_blank"
                >Merchent store Link</a
              >
            </div>

            <div
              class="text-small d-flex align-center mt-4 mb-2"
              v-if="request.payment_status === 1"
            >
              <v-icon color="green" style="width:10px"
                >mdi-circle-medium</v-icon
              >
              <span class="ml-2"
                >Payment is complete, you will be notified soon</span
              >
            </div>
            <div
              class="text-small d-flex align-center mt-4 mb-2"
              v-if="request.status === 'pending'"
            >
              <v-icon color="red" style="width:10px">mdi-circle-medium</v-icon>
              <div class="">
                <span class="ml-2">{{ request.status }} </span>
                <p class="ml-2 d-block font-weight-bold">
                  Your order has been Recevied
                </p>
              </div>
            </div>
            <div
              class="text-small d-flex justify-space-between  align-center mt-4 mb-2"
              v-if="request.status === 'shipped'"
            >
              <div class="">
                <v-icon color="green" style="width:10px"
                  >mdi-circle-medium</v-icon
                >
                <div class="">
                  <span class="ml-2">{{ request.status }} </span>
                  <p class="ml-2 d-block font-weight-bold">
                    Your order has been Shipped
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-icon class="bg-cart" size="100">mdi-cart</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInvoiceMobile',
  props: {
    item: {},
  },
  data() {
    return {
      request: this.$store.state.request,
      views: {
        menu: false,
        cancel: false,
        confirmShip: false,
      },
    }
  },

  methods: {
    async cancel() {
      if (this.$store.getters['request/paid']) return
      this.views.cancel = false
      await this.$store.dispatch('request/cancel')
      await this.$router.replace(`/${this.$store.state.merchant.slug}`)
      this.$store.commit('request/clear')
      localStorage.removeItem('request')
    },
  },
}
</script>

<style lang="scss">
.bg-cart {
  position: absolute !important;
  bottom: -30px;
  left: calc(100% - 60px);
  transform: rotate(5deg);
  opacity: 0.1;
}
.imgSize {
  height: 150px !important;
  width: 150px !important;
  object-fit: cover !important;
}

// @media
@media (max-width: 500px) {
  .imgSize {
    height: 100px !important;
    width: 100px !important;
    object-fit: cover !important;
  }
}
</style>
