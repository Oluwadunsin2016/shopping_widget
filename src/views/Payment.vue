<template>
  <div class="nav-spacing overflow-y-auto" ref="scroller">
    <HomeDrawer v-if="$vuetify.breakpoint.smAndDown"/>
    <DefaultDesktopNav v-else/>

    <v-container class="px-4 py-md-10">
      <v-card class="pa-1 py-3 pa-md-4" v-if="!success">
        <v-card-text>
          <div class="text-h6 mb-2 font-weight-bold">Make upfront payment for your order</div>
          <p class="mb-5">Your order has been created, provide the following information to continue</p>

          <v-list>
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between align-center">
                  <span class="text--secondary">Total credit</span>
                  <span class="font-weight-medium">{{ data.total_credit | currency }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between align-center">
                  <span class="text--secondary">Number of months</span>
                  <span class="font-weight-medium">{{ data.no_of_months }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between align-center">
                  <span class="text--secondary">Request date</span>
                  <span class="font-weight-medium">{{ data.req_date | date }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between align-center">
                  <span class="text--secondary">{{ data.payment_type === 0 ? 'Upfront' : 'Outright' }} amount</span>
                  <span class="font-weight-medium">{{ data.upfront_amt | currency }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <Paystack :amount="+data.upfront_amt" :email="data.email" @done="send($event)">
            <v-btn class="mt-4 px-6" color="primary" elevation="0" outlined>
              <v-icon left>mdi-credit-card</v-icon>
              Pay {{ data.upfront_amt | currency }}
            </v-btn>
          </Paystack>
        </v-card-text>
      </v-card>

      <v-card class="d-flex flex-column align-center justify-center text-center py-10 px-6" v-else>
        <v-icon class="mb-10" color="green lighten-3" size="100">mdi-credit-card-check</v-icon>
        <v-card-text>
          <div class="text-h6 mb-2 font-weight-bold">
            <span v-if="paid">Upfront payment successful</span>
            <span v-else>Upfront paid</span>
          </div>
          <p class="mb-5">
            Upfront payment is complete, use the link sent to the email you provided to check the status of your
            request.
          </p>
          <!-- TODO: fix request link -->
          <v-btn :to="`/request/${data.id}`" class="mt-4" color="primary" elevation="0" outlined>Goto request</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import http from "../plugins/http";
import store from "../store";
import DefaultDesktopNav from "../components/templates/default/DefaultDesktopNav";
import HomeDrawer from "../components/nav/HomeDrawer";
import Paystack from "../components/Paystack";

export default {
  name: "Payment",
  components: { HomeDrawer, DefaultDesktopNav, Paystack },
  data() {
    return {
      data: {},
      success: false,
      paid: false,
      error: ''
    }
  },
		created() {
			this.data = this.$store.state.global.payment;
			this.$store.dispatch("request/load", this.data.id);
			if (this.data.upfront_paid === 1) {
				this.success = true
			}
		},
		methods: {
			async send(response) {
				try {
          this.loading = true;
          await this.$http.patch(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/request/status/${ this.data.id }`, { req_status: 2 });
          if (response) {
            await this.$http.post(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/payment`, {
              ref_no: response.reference,
              request_id: this.data.id,
              payment_type: +this.data.payment_type + 1,
              type: +this.data.payment_type + 1,
            });
          }
          await this.$store.dispatch("request/load", this.data.id)
          this.success = true
          this.loading = false;
        } catch (e) {
          console.log('Payment error', e)
          this.loading = false;
          this.error = true;
        }
			},
		},
		async beforeRouteEnter(to, _, next) {
      const { token } = to.params;
      const res = await http.get(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/payment/details/${ token }`)
      const data = res.data.data;
      store.commit("global/update", { key: 'payment', value: data });
      if (!store.state.merchant.id) await store.dispatch('merchant/get', data.merchant_id);
      next()
    }
	}
</script>

<style scoped>

</style>
