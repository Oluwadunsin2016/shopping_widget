<template>
  <v-sheet v-if="loading" class="py-16 text-center">
    <br /><br /><br />
    <v-progress-circular
      color="primary"
      indeterminate
      size="25"
    ></v-progress-circular>
    <p class="mx-auto mt-10" style="max-width: 300px">
      {{ loading }}
    </p>
    <br /><br /><br />
  </v-sheet>
  <v-sheet v-else class="px-8 py-10 text-center">
    <p class="text-title mb-10 d-flex align-center justify-center">
      Make {{ paymentType === 1 ? "Upfront" : "Outright" }} payment
    </p>

    <template v-if="data.amount">
      <h2>{{ data.amount | currency }}</h2>

      <v-subheader class="text-center mt-5 mb-10">
        Transfer exact amount above into account details below via your
        Internet/Mobile banking platform and click on confirm transfer to verify
        your transfer
      </v-subheader>

      <v-card class="px-6 py-1">
        <v-list>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                <span class="text--secondary">Bank</span>
                <span class="font-weight-medium">{{ data.bank_name }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                <span class="text--secondary">Account number</span>
                <span class="font-weight-medium">{{
                  data.account_number
                }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                <span class="text--secondary">Expires in</span>
                <span class="font-weight-medium"
                  >{{ timer.hours }} : {{ timer.minutes }} :
                  {{ timer.seconds }}</span
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <div>
        Having issues confirming the transfer? Pls contact our support team here
      </div>
      
      <div class="text-center d-flex flex-column align-center mt-10">
        <v-btn color="primary" elevation="0" outlined @click="confirm()"
          >Confirm transfer</v-btn
        >
      </div>
    </template>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :timeout="5000"
      bottom
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="white"
          text
          @click="snackbar.visible = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

export default {
  name: "UpfrontPayment",
  data() {
    return {
      token: null,
      amount: this.$store.getters["request/amountToPay"],
      data: {},
      loading: "",
      snackbar: {
        visible: false,
        message: "",
        color: "",
      },
      timer: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      interval: null,
    };
  },
  created() {
    if (!this.data.amount) this.init();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    async init() {
      this.loading = "Please wait..";
      const data = await this.checkPhone(
        this.$store.state.customer.personal.phone
      );
      if (data && data.token) {
        this.token = data.token;
        await this.getAccount();
      }
      this.loading = "";
    },
    async getAccount() {
      const { data } = await this.$http.post(
        "https://mobile.creditclan.com/api/v3/payment/generate_account_payment",
        {
          account_name: this.$store.state.merchant.name,
          amount: this.amount,
          request_id: this.$store.state.request.creditclan_request_id,
          token: this.token,
        },
        {
          headers: {
            "x-api-key":
              "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
          },
        }
      );
      this.data = data.data.data;
      this.startTimer();
    },
    async confirm() {
      this.loading = "Confirming transfer..";
      try {
        const { data } = await this.$http.post(
          "https://mobile.creditclan.com/api/v3/payment/verify_upfront_payment",
          {
            request_id: this.$store.state.request.creditclan_request_id,
          },
          {
            headers: {
              "x-api-key":
                "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
            },
          }
        );
        if (!data.status) this.showSnackbar(data.message, "red");
        else this.$emit("done");
      } catch (e) {
        console.log({ e });
        this.showSnackbar(
          `Unable to confirm transfer, ensure you've made the transfer and try again`,
          "red"
        );
      }
      this.loading = "";
    },
    startTimer() {
      this.countdown();
      this.interval = setInterval(() => {
        this.countdown();
      }, 1000);
    },
    clearTimer() {
      if (this.interval) clearInterval(this.interval);
    },
    countdown() {
      const future = new Date(this.data.expiry_date);
      const now = new Date(Date.now());
      future.addHours(1);
      if (future < now) {
        this.timer = { days: "00", hours: "00", minutes: "00", seconds: "00" };
        return this.clearTimer();
      }
      const diff = future - now;
      this.timer.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.timer.hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.timer.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.timer.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
    async checkPhone(phone) {
      try {
        const { data } = await this.$http.post(
          `https://mobile.creditclan.com/api/v3/customer/check`,
          { identity: phone },
          {
            headers: {
              "x-api-key":
                "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
            },
          }
        );
        const { token, user_id } = data;
        return { token, user_id };
      } catch (e) {
        // this.setError('An error occurred, please try again!');
        return false;
      }
    },
    showSnackbar(message, color) {
      this.snackbar = { visible: true, message, color };
    },
  },
  computed: {
    paymentType() {
      return this.$store.state.request.no_of_months ? 1 : 2;
    },
  },
};
</script>
