<template>
  <v-card class="pa-0 d-flex flex-column fill-height" elevation="0">
    <v-card-text class="py-6 py-md-10 px-0 fill-height flex-grow-1 d-flex flex-column">
      <div class="fill-height d-flex flex-column" v-if="view === 'quantity'">
        <WhatsappPurchaseQuantity @close="$emit('close')" @done="() => {this.view = 'add';}"/>
        <div class="grey lighten-4">
          <WhatsappPurchaseSetupProduct :items="items" @add="addItem" @cancel="view = 'items'"/>
        </div>
        <img src="@/assets/images/happy-straight.png" alt="bg" class="fill-width mt-auto"/>
      </div>

      <div class="px-6 px-md-10">
        <div v-if="view === 'items'">
          <div class="container d-flex align-center pa-0 mb-2">
            <v-spacer></v-spacer>
            <v-btn @click="$emit('close')" class="mr-0" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-card outlined class="pa-6">
            <div class="text-h6 mb-1 font-weight-bold">
              Checkout with credit
            </div>
            <p class="ma-0 black--text">Get funded by our partner banks</p>
          </v-card>
          <v-card class="py-4 position-relative overflow-hidden px-0 mt-4" outlined>
            <div class="pa-5 pa-md-6 text-left overflow-hidden">
              <div class="banner-title text-h5 black--text font-weight-bold pr-5">
                {{ monthly_amount | currency }} / month
              </div>
              <div class="text-title black--text mt-1">{{ 3 }} months</div>
            </div>
            <div
              class="absolute right top"
              style="transform: translate(60%, 10px) rotate(-10deg); opacity: .2"
            >
              <v-icon color="primary" size="200">mdi-cart</v-icon>
            </div>
          </v-card>
          <div class="d-flex mt-6">
            <div v-for="(item, i) in items" :key="i">
              <v-responsive :aspect-ratio="1" class="mr-3" width="80px">
                <v-hover v-slot="{ hover }">
                  <v-card outlined class="position-relative">
                    <ProxyImage :src="item.primary_picture" alt="Item" class="cursor-pointer"/>
                    <v-badge
                      :content="item.quantity" class="absolute" style="top: 20px; right: 20px"
                    ></v-badge>
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
                  @click="view = 'quantity'"
                  style="border: 2px dashed rgba(0, 0, 0, .1);"
                  class="fill-width fill-height rounded-lg pa-2 cursor-pointer d-flex align-center justify-center hover:bg-gray-100"
                >
                  <v-icon color="blue-grey lighten-3" size="24">mdi-plus</v-icon>
                </div>
              </v-responsive>
            </div>
          </div>
          <v-btn @click="submit" class="mt-8" color="primary" elevation="0">Checkout</v-btn>
        </div>

        <div v-if="view === 'checkout'">
          <Checkout
            :checkout="false"
            @cancel="view = 'items'"
            @done="handleCheckout"
          />
        </div>

        <div class="my-auto text-center" v-if="view === 'creating'">
          <br/><br/><br/>
          <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
          <div class="mx-auto mt-10 text-h6" style="max-width: 300px">
            Creating request..
          </div>
          <br/><br/><br/>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import WhatsappPurchaseSetupProduct from "./WhatsappPurchaseSetupProduct";
import WhatsappPurchaseQuantity from "./WhatsappPurchaseQuantity";
import { roundToNearestTen } from "@/lib/utils.js";
import Checkout from "../Checkout";
import ProxyImage from "@/components/ProxyImage.vue";

export default {
  name: "WhatsappPurchaseFlow",
  components: {
    ProxyImage,
    Checkout,
    WhatsappPurchaseQuantity,
    WhatsappPurchaseSetupProduct,
  },
  data() {
    return {
      view: "quantity",
      items: [],
      plan: null,
    };
  },
  methods: {
    addItem(item) {
      this.items.push({ ...item, id: this.items.length + 1 });
      this.view = "items";
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
      if (!this.items.length) this.view = "quantity";
    },
    submit() {
      const no_of_months = 3;
      this.plan = {
        monthly_amount: roundToNearestTen(this.total / no_of_months),
        no_of_months,
        upfront_amount: 0,
        sell_on_credit: 1,
      };
      this.view = "checkout";
    },
    handleCheckout(customer) {
      if (!customer) return;
      const { merchant } = this.$store.state;
      const payload = {
        cred_plus_upfront: this.total,
        no_of_months: 3,
        upfront_amt: 0,
        credit_amount: this.total,
        monthly_amt: roundToNearestTen(this.total / 3),
        // eslint-disable-next-line no-unused-vars
        items: this.items.map(({ id, ...item }) => ({
          ...item,
          sell_on_credit: 1,
        })),
        sell_on_credit: 1,
        merchant_id: merchant ? merchant.id : null,
        whatsapp_order: 0,
        ...customer,
      };
      this.createRequest(payload);
    },
    async createRequest(payload) {
      this.view = "creating";
      try {
        const res = await this.$http.post(
          "https://sellbackend.creditclan.com/merchantclan/public/index.php/api/whatsapp/order",
          payload
        );
        await this.finish(res.data.req_id);
        this.view = "quantity";
      } catch (e) {
        console.log("Request error..", { e });
        this.view = "items";
        return false;
      }
    },
    async finish(req_id) {
      this.$store.commit("request/clear");
      this.$store.commit("cart/clear");
      await this.$router.push(`/request/${ req_id }`);
      this.$emit("close");
    },
  },
  computed: {
    total() {
      return this.items.reduce(
        (acc, item) => acc + +item.price * +item.quantity,
        0
      );
    },
    monthly_amount() {
      return roundToNearestTen(this.total / 3);
    },
  },
};
</script>
