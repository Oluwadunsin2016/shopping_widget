<template>
  <v-sheet class="pa-0 lighten-4 fill-height d-flex flex-column">
    <div class="fill-height d-flex flex-column" v-if="view === 'form'">
      <ValidationObserver ref="observer">
        <form @submit.prevent="handleSubmit()">
          <div class="px-8 pt-10 pb-6 white border-bottom">
            <div class="d-flex align-center justify-space-between">
              <div class="text-h4 font-weight-bold title">Pay merchant</div>
              <v-btn @click="$emit('close')" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <p class="mt-2 black--text">Transfer funds to {{ $store.state.merchant.name }}</p>
            <ValidationProvider name="amount" rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="values.amount"
                class="mt-4" :error-messages="errors" label="Amount" type="number"
              ></v-text-field>
            </ValidationProvider>
            <div class="d-flex justify-end">
              <button @click.prevent="showView('add')">
                Optionally describe items <span class="blue--text">here</span>
              </button>
            </div>
          </div>
          <div class="border-top">
            <div class="px-8 py-8 grey lighten-4">
              <ValidationProvider name="full_name" rules="required" v-slot="{ errors }">
                <v-text-field :error-messages="errors" label="Your name" v-model="values.name"></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
                <v-text-field :error-messages="errors" label="Your phone number" v-model="values.phone"></v-text-field>
              </ValidationProvider>

              <div v-if="items.length" class="d-flex mt-6">
                <div v-for="(item, i) in items" :key="i">
                  <v-responsive :aspect-ratio="1" class="mr-3" width="80px">
                    <v-hover v-slot="{ hover }">
                      <v-card outlined class="position-relative">
                        <ProxyImage :src="item.primary_picture" alt="Item" class="cursor-pointer"></ProxyImage>
                        <v-badge :content="item.quantity" class="absolute" style="top: 20px; right: 20px"></v-badge>
                        <v-btn
                          v-if="hover" @click="removeItem(item.id)" icon class="absolute" color="white"
                          style="top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: tomato"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-card>
                    </v-hover>
                  </v-responsive>
                </div>
                <div style="width: 80px">
                  <v-responsive :aspect-ratio="1" style="width: 80px">
                    <div
                      @click="showView('add')" style="border: 2px dashed rgba(0, 0, 0, .1);"
                      class="fill-width fill-height rounded-lg pa-2 cursor-pointer d-flex align-center justify-center hover:bg-gray-100"
                    >
                      <v-icon color="blue-grey lighten-3" size="24">mdi-plus</v-icon>
                    </div>
                  </v-responsive>
                </div>
              </div>

              <v-btn @click="handleSubmit()" class="mt-6 px-6" color="primary" rounded elevation="0">
                Continue
              </v-btn>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <img src="../assets/images/happy-straight.png" alt="" class="fill-width mt-auto"/>
    </div>

    <div v-if="view === 'success'" class="py-16 text-center d-flex flex-column justify-center align-center">
      <br><br><br>
      <v-icon color="green" size="100">mdi-check-circle</v-icon>
      <h4 class="mx-auto mt-10" style="font-size: 1.3rem; max-width: 250px">
        Payment confirmed
      </h4>
      <p class="mt-3 grey--text text--darken-3" style="max-width: 300px">
        Your payment has been successfully sent to merchant
      </p>
      <v-btn @click="$emit('close')" class="mt-6" outlined rounded elevation="0">
        Close
      </v-btn>
      <br><br><br>
    </div>

    <Modal v-model="views.loading" class="text-center">
      <v-sheet class="d-flex flex-column align-center justify-center text-center">
        <br/><br/><br/>
        <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
        <p class="mx-auto mt-10 black--text" style="max-width: 300px">
          Please wait..
        </p>
        <br/><br/><br/>
      </v-sheet>
    </Modal>

    <Modal v-model="views.add">
      <WhatsappPurchaseSetupProductModal
        :items="items"
        @add="addItem"
        @cancel="closeViews()"
        @close="closeViews()"
      />
    </Modal>

    <Modal v-model="views.account" persistent>
      <MakeTransferPayment
        v-if="views.account"
        :name="values.name"
        :phone="values.phone"
        :amount="+values.amount"
        :params="{ merchant_id: $store.state.merchant.id }"
        @done="handlePaymentDone()"
        @cancel="closeViews()"
      />
    </Modal>
  </v-sheet>
</template>

<script>
import Modal from "@/components/Modal.vue";
import WhatsappPurchaseSetupProductModal from "./whatsapp/WhatsappPurchaseSetupProductModal.vue";
import ProxyImage from "@/components/ProxyImage.vue";
import { roundToNearestTen } from "@/lib/utils.js";
import views from "@/mixins/views.js";
import MakeTransferPayment from "@/components/transfer/MakeTransferPayment.vue";

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

export default {
  name: "PayMerchant",
  mixins: [views],
  components: {
    MakeTransferPayment,
    Modal,
    WhatsappPurchaseSetupProductModal,
    ProxyImage,
  },
  data() {
    return {
      loading: "",
      interval: null,
      view: "form",
      values: { name: "", phone: "", amount: "", },
      items: [],
      views: {
        add: false,
        confirm: false,
        account: false,
        loading: false,
      },
    };
  },
  methods: {
    addItem(item) {
      this.items.push({ ...item, id: this.items.length + 1 });
      this.values.amount = this.total;
      this.closeViews();
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
      if (!this.items.length) this.view = "add";
    },
    async handleSubmit() {
      if (!(await this.$refs.observer.validate())) return;
      await this.showView('account');
    },
    async handlePaymentDone() {
      this.closeViews();
      if (this.items.length) await this.createRequest();
      this.view = "success";
    },
    async createRequest() {
      this.showView('loading');
      this.loading = "Creating request..";
      try {
        const { merchant } = this.$store.state;
        const payload = {
          cred_plus_upfront: this.total,
          no_of_months: 3,
          upfront_amt: 0,
          credit_amount: this.total,
          monthly_amt: roundToNearestTen(this.total / 3),
          // eslint-disable-next-line no-unused-vars
          items: this.items.map(({ id, ...item }) => ({ ...item, sell_on_credit: 1, })),
          sell_on_credit: 1,
          merchant_id: merchant ? merchant.id : null,
          whatsapp_order: 0,
          full_name: this.values.name,
          email: null,
          phone_no: this.values.phone,
          address: null,
          state: null
        };
        await this.$http.post(
          "https://sellbackend.creditclan.com/merchantclan/public/index.php/api/whatsapp/order", payload
        );
      } catch (e) {
        console.log("Request error..", { e });
        return false;
      }
      this.closeViews();
      this.loading = '';
    },
  },
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + +item.price * +item.quantity, 0);
    },
    monthly_amount() {
      return roundToNearestTen(this.total / 3);
    },
  },
};
</script>
