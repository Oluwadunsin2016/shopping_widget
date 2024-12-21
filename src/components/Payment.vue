<template>
  <div>
    <v-sheet class="px-6 py-10 d-flex flex-column align-center" v-if="view === views.warning">
      <p class="text-title mb-4 d-flex align-center justify-center ">
        Don't pay without chatting
      </p>
      <v-avatar class="my-7" color="green lighten-5" size="100">
        <v-icon color="green" size="50">mdi-whatsapp</v-icon>
      </v-avatar>
      <v-subheader class="text-center mb-5">
        We have partnered with these finance houses to manage bulk disbursement
      </v-subheader>
      <div class="mt-5 d-flex flex-column align-center">
        <v-btn color="green" outlined @click="start()">Done</v-btn>
        <v-btn :href="merchant.whatsapp_link" class="mt-2" target="_blank" text>Chat with merchant</v-btn>
      </div>
    </v-sheet>

    <v-sheet class="px-6 py-10" v-if="view === views.payment">
      <p class="text-title mb-4 d-flex align-center justify-center">
        {{ paymentType === 1 ? 'Upfront' : 'Outright' }} payment
      </p>

      <v-subheader class="text-center mb-5">
        We have partnered with these finance houses to manage bulk disbursement
      </v-subheader>

      <v-list>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-space-between align-center">
              <span class="text--secondary">Bank</span>
              <span class="font-weight-medium">{{ bankName }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-space-between align-center">
              <span class="text--secondary">Account number</span>
              <span class="font-weight-medium">{{ merchant.account_number }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-space-between align-center">
              <span class="text--secondary">Account name</span>
              <span class="font-weight-medium">{{ merchant.account_name }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-space-between align-center">
              <span class="text--secondary">{{ paymentType === 1 ? 'Upfront' : 'Outright' }} amount</span>
              <span class="font-weight-medium">{{ amount | currency }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-checkbox label="I have transferred to account" v-model="payed"></v-checkbox>
        <v-divider></v-divider>
        <div class="text-center d-flex flex-column align-center">
          <v-btn :disabled="!payed" @click="send()" class="mt-6 px-8" color="green" elevation="0" outlined>
            <v-icon left>mdi-cash</v-icon>
            Done
          </v-btn>
          <Paystack :amount="amount" :email="email" @done="send($event)">
            <v-btn class="mt-4 px-6" color="primary" elevation="0" outlined>
              <v-icon left>mdi-credit-card</v-icon>
              Pay with card
            </v-btn>
          </Paystack>
        </div>
      </v-list>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-sheet>

    <VirtualAccountPayment v-if="view === views.virtual" @done="send()"/>

    <v-sheet v-if="view === views.success" class="d-flex flex-column align-center justify-center text-center py-10 px-6">
      <v-icon class="mb-10" color="green lighten-3" size="100">mdi-credit-card-check</v-icon>
      <v-card-text>
        Payment successful, use the link sent to the email you provided to check the status of your request.
      </v-card-text>
      <div class="d-flex flex-column">
        <v-btn @click="$emit('close')" color="red darken-1" outlined text>
          Close
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script>
	import Paystack from "./Paystack";
	import VirtualAccountPayment from "@/components/PayMerchant.vue";

	export default {
		components: { VirtualAccountPayment, Paystack },
		name: "Payment",
		data() {
			return {
				request: this.$store.state.request,
				merchant: this.$store.state.merchant,
				amount: +this.$store.getters["request/amountToPay"],
				email: this.$store.state.customer.personal.email,
				view: 'warning',
				views: {
					warning: 'warning',
					payment: 'payment',
					success: 'success',
					virtual: 'virtual'
				},
				payed: false,
				loading: false,
				token: null,
				banks: []
			};
		},
		created() {
			this.getBanks();
		},
		methods: {
			start() {
				this.view = this.views.payment
				// if (this.$store.state.request.creditclan_request_id) {
				//   this.view = this.views.virtual
				// } else {
				// }
			},
			async send(response) {
				this.loading = true;
				await this.$http.patch(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/request/status/${ this.request.id }`, { req_status: 2 });
				if (response) {
					await this.$http.post(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/payment`, {
						ref_no: response.reference,
						request_id: this.request.id,
						payment_type: this.paymentType,
						type: this.paymentType
					});
				}
				await this.$store.dispatch("request/load", this.request.id)
				this.view = this.views.success
				this.loading = false;
			},
			async getBanks() {
				this.loadingBanks = true;
				const res = await this.$http.get("https://mobile.creditclan.com/webapi/v1/banks", {
					headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' }
				});
				this.loadingBanks = false;
				this.banks = (res.data.data || []).sort((a, b) => (a.name > b.name ? 1 : -1)).map(bank => ({
					text: bank.name,
					value: bank.bank_code,
					id: bank.id
				}));
			}
		},
		computed: {
			paymentType() {
				return this.$store.state.request.no_of_months ? 1 : 2;
			},
			bankName() {
				if (!this.merchant.bank_id) return '';
				return this.banks.find(b => b.id.toString() === this.merchant.bank_id.toString())?.text;
			}
		},
	}
</script>
