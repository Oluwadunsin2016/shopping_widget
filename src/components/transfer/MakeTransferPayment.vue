<template>
  <v-sheet
    v-if="view === 'loading'"
    class="d-flex flex-column align-center justify-center text-center"
  >
    <br /><br /><br />
    <v-progress-circular
      color="primary"
      indeterminate
      size="25"
    ></v-progress-circular>
    <p class="mx-auto mt-10 black--text" style="max-width: 300px">
      Please wait..
    </p>
    <br /><br /><br />
  </v-sheet>
  <v-sheet v-else-if="view === 'account' && data" class="pa-0">
    <AccountDetails
      :data="data"
      @confirm="view = 'confirm'"
      @generate="getAccount()"
      @cancel="$emit('cancel')"
    />
  </v-sheet>
  <v-sheet v-else-if="view === 'confirm' && data" class="pa-0">
    <ConfirmTransferPayment
      :transaction_reference="data.flw_ref"
      :account_number="data.account_number"
      :request_id="data.request_id"
      @close="view = 'account'"
      @done="handleConfirmTransferDone()"
    />
    <!-- :request_id="data.request_id" -->
  </v-sheet>
  <v-sheet class="pa-8 d-flex align-center" v-else-if="view === 'error'">
    <v-icon class="mr-2">mdi-alert-circle</v-icon>
    <div class="mr-2">Something went wrong</div>
    <v-btn @click="$emit('cancel')" text color="red" class="ml-auto"
      >Close</v-btn
    >
  </v-sheet>
  <div v-else></div>
</template>

<script>
import ConfirmTransferPayment from "@/components/transfer/ConfirmTransferPayment.vue";
import AccountDetails from "@/components/transfer/AccountDetails.vue";

export default {
  name: "MakeTransferPayment",
  components: { AccountDetails, ConfirmTransferPayment },
  props: {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    data: null,
    view: "loading",
  }),
  created() {
    this.getAccount();
  },
  methods: {
    async getAccount() {
      this.view = "loading";
      try {
        const { data } = await this.$http.post(
          "https://sellbackend.creditclan.com/merchantclan/public/index.php/api/initiate_order_paymnet",
          {
            merchant_name: "440 TECHNOLOGY GLOBAL SHOPPING",
            narration: "Order payment",
            amount: this.amount,
            phone: this.phone,
            full_name: this.name,
            request_id: this.$store.state.request.id,
            ...this.params,
          }
        );
        this.data = data.data;
        console.log(data.flw_ref, "data");
        this.view = "account";
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message ?? "Something went wrong",
          color: "red",
        });
        this.view = "error";
      }
      this.loading = "";
    },
    handleConfirmTransferDone() {
      this.$emit("done", this.data.flw_ref);
    },
  },
};
</script>
