<template>
  <div class="fill-height">
    <v-container
      class="d-flex flex-column bottom-nav-spacing px-0 py-0 fill-height"
      style="max-width: 600px"
    >
      <RequestInvoiceMobile @open="showView($event)"/>

      <BottomNavigationStore/>

      <v-bottom-sheet inset max-width="500" v-model="views.schedule">
        <v-sheet class="px-6 py-10">
          <div class="text-h6 mb-8">Schedule</div>
          <RequestSchedule @close="showView()"/>
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
import RequestInvoiceMobile from '@/components/request/RequestInvoiceMobile.vue'
import views from '@/mixins/views'

export default {
  name: 'Request',
  mixins: [views],
  components: {
    RequestInvoiceMobile,
    RequestSchedule,
    EligibilityWidget,
    BottomNavigationStore,
    MakeTransferPayment,
  },
  data() {
    return {
      merchant: this.$store.state.merchant,
      tab: 0,
      request: this.$store.state.request,
      views: {
        analysis: false,
        more: false,
        schedule: false,
        payment: false,
        customer: false,
        repayment: false,
        eligibility: false,
        email: false,
      },
    }
  },
  metaInfo() {
    return {
      title: 'Order details',
    }
  },
  methods: {
    async handlePaymentDone() {
      this.closeViews()
      await this.$store.dispatch('request/load', this.$store.state.request.id);
    },
  },
}
</script>
