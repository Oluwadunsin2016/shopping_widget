<template>
  <div class="fill-height">
    <v-container
      class="d-flex flex-column bottom-nav-spacing px-0 py-0 fill-height"
      style="max-width: 600px"
    >
      <div v-if="isLoading">Loading...</div>

      <OrderInvoiceMobile v-else :item="items" @open="showView($event)" />

      <BottomNavigationStore />

      <v-bottom-sheet inset max-width="500" v-model="views.schedule">
        <v-sheet class="px-6 py-10">
          <div class="text-h6 mb-8">Schedule</div>
          <RequestSchedule @close="showView()" />
        </v-sheet>
      </v-bottom-sheet>

      <v-bottom-sheet inset max-width="500" v-model="views.eligibility">
        <EligibilityWidget
          v-if="views.eligibility"
          @done="closeViews()"
          @cancel="views.eligibility = false"
        />
      </v-bottom-sheet>
    </v-container>

    <v-bottom-sheet inset max-width="500" v-model="views.payment">
      <MakeTransferPayment
        :amount="$store.getters['request/total']"
        :name="$store.state.request.fullname"
        :phone="$store.state.request.phone"
        @cancel="closeViews()"
        @done="handlePaymentDone($event)"
      />
    </v-bottom-sheet>
  </div>
</template>

<script>
import MakeTransferPayment from '@/components/transfer/MakeTransferPayment.vue'
import BottomNavigationStore from '@/components/nav/BottomNavigationStore.vue'
import EligibilityWidget from '@/components/request/EligibilityWidget.vue'
import RequestSchedule from '@/components/request/RequestSchedule.vue'
import OrderInvoiceMobile from '@/components/request/OrderInvoiceMobile.vue'
import views from '@/mixins/views'

export default {
  name: 'Orders',
  mixins: [views],
  components: {
    OrderInvoiceMobile,
    RequestSchedule,
    EligibilityWidget,
    BottomNavigationStore,
    MakeTransferPayment,
  },
  data() {
    return {
      isLoading: true, // Initialize as true to show the loading message initially
      request: this.$store.state.request,
      items: [],
    }
  },
  
  metaInfo() {
    return {
      title: 'Your Orders',
    }
  },
  methods: {
    async getAllOrders() {
      try {
        const clg = this.request.customer_slug
        const mlg = this.$route.params.mid
        const res = await this.$http.post(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/customer_orders`,
          { customer_slug: clg, merchant_slug: mlg }
        )
        this.items = res?.data
        this.isLoading = false
        if (!res.data.status) {
          return this.$bus.$emit('toast', { message: res.data.message })
        }
        await this.$store.dispatch('request/load', this.$store.state.request.id)
      } catch (e) {
        return this.$bus.$emit('toast', {
          message: e.response.data?.message || e?.message,
        })
      }
    },
  },
  mounted() {
    this.getAllOrders()
  },
}
</script>
