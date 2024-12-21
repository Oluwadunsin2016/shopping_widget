<template>
  <div class="position-relative fill-width white min-h-screen">
    <div class="pa-5 grey lighten-5 position-relative overflow-hidden">
      <div class="mb-4">
        <div class="text-title font-weight-bold">{{ request.fullname }}</div>
        <div class="text-small mt-2 blue-grey--text text--darken-1">
          {{ request.phone }}
        </div>
        <div class="text-small mt-1">{{ request.address }}</div>
      </div>
    </div>

    <v-divider/>

    <div class="pa-5 grey lighten-5">
      <div class="d-flex justify-space-between align-center">
        <span>Item</span>
        <span>Amount</span>
      </div>
      <v-divider class="my-3"/>
      <template>
        <div v-for="item in request.items" :key="item.id">
          <div class="d-flex justify-space-between text-small">
            <div class="d-flex align-center fill-width">
              <div class=" px-2">
                <div v-if="item.fourthPicture">
                  <img
                    :src="item.fourthPicture"
                    class="img-fluid rounded mx-auto imgSize"
                    alt="item"
                  />
                </div>
              </div>
              <div class="d-flex gap-2">
                <div class="d-flex gap-2">
                  <div v-if="item.plan" class=" font-weight-bold px-2">
                    {{ +item.quantity || +item.quantity }}
                  </div>
                  <div class=" ml-2 flex-grow-1 text-wrap ">
                    {{ item.name }}
                  </div>
                </div>

                <div class="ml-3 font-weight-bold">
                  <div v-if="item.plan">
                    {{ (+item.plan.price || +item.price) | currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <v-divider class="my-3"/>
        </div>
      </template>
      <div class="d-flex justify-space-between text-small">
        <span>Total</span>
        <div class="ml-3 font-weight-bold">
          {{ $store.getters['request/total'] | currency }}
        </div>
      </div>
    </div>

    <div class="pa-5 grey lighten-5">
      <div class="d-flex align-items-center justify-space-between">
        <v-btn
          v-if="!$store.getters['request/paid']"
          @click="views.cancel = true"
          bottom
          color="red"
          outlined
          rounded
        >
          Cancel request
        </v-btn>
        <RequestStatus @open="$emit('open', $event)"/>
      </div>
      <v-icon class="bg-cart" size="100">mdi-cart</v-icon>
    </div>

    <div class="container mt-10">
      <div
        class="blue-grey lighten-5 mb-10 rounded-xl fill-width d-flex flex-column text-center align-start py-8 px-8 mt-auto justify-space-between align-center"
      >
        <p class="grey--text text--darken-3 pr-6"
           style="max-width: 350px; line-height: 1.2; font-size: 1.2rem">
           Claim your N20,000 Giveaway now. Download the 440 global shopping app
        </p>
        <div class="d-flex align-center">
          <a href="https://play.google.com/store/apps/details?id=com.get440.com&hl=en&gl=US" target="_blank">
            <PlayStoreBadge width="120"/>
          </a>
          <a href="https://apps.apple.com/ng/app/440/id6474253185" target="_blank" class="ml-2">
            <AppStoreBadge width="120"/>
          </a>
        </div>
      </div>
    </div>

    <v-dialog max-width="350" persistent v-model="views.cancel">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-text>
          This action is irreversible and the link to this request will no
          longer work.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="views.cancel = false" color="green darken-1" text
          >No
          </v-btn
          >
          <v-btn @click="cancel()" color="red darken-1" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RequestStatus from './RequestStatus'
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";

export default {
  name: 'RequestInvoiceMobile',
  
  components: { AppStoreBadge, PlayStoreBadge, RequestStatus },
  data() {
    return {
      request: this.$store.state.request,
      views: {
        menu: false,
        cancel: false,
      },
    }
  },

  methods: {
    async cancel() {
      try {
        const id = this.request.id
        const res = await this.$http.delete(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/delete_order/${ id }`
        )
        if (res.data.status === true) {
          this.views.cancel = true
          this.$router.go(-1)
          // this.$router.replace(`/${ this.$store.state.merchant.slug }`)
          this.$store.commit('request/clear')
          localStorage.removeItem('request')
          
        }
      } catch (e) {
        return this.$bus.$emit('toast', {
          message: e.response.data?.message || e?.message,
        })
      }
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

// media
@media (max-width: 500px) {
  .imgSize {
    height: 100px !important;
    width: 100px !important;
    object-fit: cover !important;
  }
}
</style>
