<template>
  <v-card class="pa-0" elevation="0">
    <v-card-text class="px-6 py-6">
      <div class="py-16 text-center">
        <br><br><br>
        <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
        <div class="mx-auto mt-10 text-h6" style="max-width: 300px">
          {{ loading || 'Please wait..' }}
        </div>
        <br><br><br>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { jsonToBase64 } from "@/lib/utils";

export default {
  name: "RentEligibility",
  data() {
    return {
      loading: '',
      request: this.$store.state.request,
      cc: null,
      view: ''
    }
  },
  created() {
    this.launchDataCollectionWidget();
  },
  mounted() {
    window.addEventListener('message', this.handleMessage);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
    if (this.iframe) this.iframe.remove();
  },
  methods: {
    async handleMessage(e) {
      if (!e.data || !e.data.id) return;
      if (e.data.id === 'cclan-frame-loaded') {
        this.loading = '';
      }
      if (e.data.id === 'cclan-cancel' || e.data.id === 'cclan-completed') {
        this.loading = '';
        this.$emit('cancel');
        this.iframe.remove();
        await this.$store.dispatch('request/load', this.$store.state.request.global_request_id);
      }
    },
    async launchDataCollectionWidget() {
      const { customer, request } = this.$store.state;
      const data = {
        request: {
          amount: this.$store.state.rent.request.amount,
          tenor: request.no_of_months,
        },
        profile: {
          full_name: this.$store.state.rent.user.legal_name,
          email: this.$store.state.rent.user.email,
          phone: this.$store.state.rent.user.phone,
          date_of_birth: this.$store.state.rent.user.date_of_birth,
          profile_image: this.$store.state.rent.user.file_name,
        },
        home_address: {
          address: this.$store.state.rent.request.address,
          state_id: customer.personal.state,
          lga_id: customer.personal.lga
        },
        stage: request.stage,
        request_id: this.$store.state.rent.request.creditclan_request_id,
        lender: request.lender || null,
        config: {
          show_bank_account: true,
          platform: 'rent-tenant',
          show_address: true,
          show_income: true,
          can_modify_offer: true,
          modify_offer_beyond_limits: true,
          analyze_bank_statement: true,
          show_profile: true,
          show_nok: true,
          no_frequently_called_numbers: 2,
          show_work_information: true,
          show_offers: true,
          show_signature: true,
          tokenize_card: true,
        },
        extra: {
          rent_id: this.$store.state.rent.request.id,
          tenant_id: this.$store.state.rent.request.tenant_id,
        },
        email_verified: this.$store.getters['request/emailVerified']
      };
      const token = jsonToBase64(data);
      const url = `https://eligibility.clan.africa/?token=${ token }`;
      this.loading = `Connecting with ${ data.lender.name }..`;
      this.launchIframe(url);
    },
    launchIframe(url) {
      const iframe = document.createElement('IFRAME');
      iframe.setAttribute('src', url);
      iframe.setAttribute('allow', 'geolocation');
      const style = {
        'z-index': '999999',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100vh',
      };
      Object.assign(iframe.style, style);
      this.iframe = iframe;
      document.body.append(iframe);
    },
  }
}
</script>
