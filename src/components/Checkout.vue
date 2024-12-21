<template>
  <v-card class="pa-0" elevation="0">
    <CheckoutTimer v-if="disabled" />

    <v-card-text
      class="px-0"
      :class="!checkout ? 'py-0' : 'py-10 px-6 px-md-10'"
      v-else
    >
      <div v-if="view === 'checkout'">
        <div class="d-flex mb-8 black--text">
          <h2>Provide delivery details</h2>
        </div>
        <ValidationObserver ref="observer">
          <form>
            <v-card class="px-6 py-2" outlined>
              <div
                class="body-1 text-left pa-0 grey--text text--darken-3 mt-3 mb-7"
              >
                Contact details
              </div>
              <ValidationProvider
                name="full_name"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  :disabled="loading"
                  :error-messages="errors"
                  dense
                  label="Name"
                  v-model="values.full_name"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <v-text-field
                  :disabled="loading"
                  :error-messages="errors"
                  dense
                  label="Email address"
                  v-model="values.email"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="phone"
                rules="required|phone"
                v-slot="{ errors }"
              >
                <v-text-field
                  :disabled="loading"
                  :error-messages="errors"
                  dense
                  label="Phone number"
                  v-model="values.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-card>
            <v-card class="px-6 py-2 mt-5" outlined>
              <div
                class="body-1 text-left pa-0 grey--text text--darken-3 mt-3 mb-2"
              >
                Home address
              </div>
              <p class="mb-7">This address will be used for delivery</p>
              <ValidationProvider
                name="address"
                rules="required"
                v-slot="{ errors }"
              >
                <v-textarea
                  :disabled="loading"
                  :error-messages="errors"
                  dense
                  label="Address"
                  placeholder="format: House No, Street, LGA"
                  rows="2"
                  v-model="values.address"
                ></v-textarea>
              </ValidationProvider>
              <ValidationProvider
                name="state"
                rules="required"
                v-slot="{ errors }"
              >
                <v-select
                  :disabled="loading"
                  :error-messages="errors"
                  :items="states"
                  :loading="!states.length"
                  dense
                  label="State"
                  v-model="values.state"
                ></v-select>
              </ValidationProvider>
            </v-card>
            <v-card class="px-6 py-2 mt-5" outlined>
              <div
                class="body-1 text-left pa-0 grey--text text--darken-3 mt-3 mb-2"
              >
                Referral Code
              </div>
              <p class="mb-7">
                Please enter the referral code that you received from the
              </p>
              <ValidationProvider name="referral_code" v-slot="{ errors }">
                <v-textarea
                  :disabled="loading"
                  :error-messages="errors"
                  dense
                  label="Referral Code"
                  placeholder="******"
                  rows="2"
                  v-model="values.referral_code"
                ></v-textarea>
              </ValidationProvider>
            </v-card>
          </form>
          <v-btn
            :loading="loading"
            @click="validate"
            block
            class="mt-10 begin_checkout"
            color="primary"
            elevation="0"
            large
          >
            Proceed
          </v-btn>
          <!-- @click="$emit('cancel')" -->
          <v-btn
            :disabled="loading"
            @click="handleCancel"
            block
            class="mt-2"
            color="red"
            large
            text
            >Cancel
          </v-btn>
        </ValidationObserver>
      </div>
      <div
        v-if="view === 'request'"
        class="py-10 d-flex flex-column align-start"
      >
        <v-btn
          @click="view = 'checkout'"
          small
          rounded
          elevation="0"
          class="mb-8"
          :disabled="cancelling"
        >
          <v-icon class="mr-3">mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <h3 class="black--text font-weight-medium">Sorry! You can't create another order</h3>
        <p class="mt-4 black--text">
          You have a pending order, please complete or cancel this order before
          creating a new one
        </p>
        <v-card class="fill-width" outlined>
          <v-card-text>
            <div class="black--text">
              Amount: {{ request.total_price | currency }}
            </div>
            <hr class="my-2 border" />
            <div class="black--text">
              Date created: {{ request.created_at | date }}
            </div>
          </v-card-text>
        </v-card>
        <div style="width:100%;" class="d-flex gap-4 align-center justify-space-between mt-4">
         
          <v-btn
            v-if="!request.creditclan_request_id"
            @click="cancelRequest()"
            :loading="cancelling"
            class="mt-2 ml-4"
            color="red"
            elevation="0"
            outlined
            dark
          >
            <v-icon class="mr-3">mdi-close</v-icon>
            Cancel order
          </v-btn>
           <v-btn
            @click="viewPendingOrder()"
            color="primary"
            class="mt-2"
            elevation="0"
            :disabled="cancelling"
          >
           Proceed
            <v-icon class="ml-3">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div v-if="view === 'logistics'">
        <div class="d-flex align-center mb-8">
          <v-btn
            icon
            @click="view = 'checkout'"
            class="mr-4"
            elevation="0"
            outlined
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="black--text">Summary</h2>
        </div>
        <v-card outlined>
          <div
            class="align-center px-4 py-2"
            style="display: grid; grid-template-columns: 1fr 3fr; gap: 10px"
          >
            <span>Name:</span>
            <span class="font-weight-bold text-left">{{
              values.full_name
            }}</span>
          </div>
          <v-divider />
          <div
            class="align-center px-4 py-2"
            style="display: grid; grid-template-columns: 1fr 3fr; gap: 10px"
          >
            <span>Email:</span>
            <span class="font-weight-bold text-left">{{ values.email }}</span>
          </div>
          <v-divider />
          <div
            class="align-center px-4 py-2"
            style="display: grid; grid-template-columns: 1fr 3fr; gap: 10px"
          >
            <span>Phone:</span>
            <span class="font-weight-bold text-left">{{ values.phone }}</span>
          </div>
          <v-divider />
          <div
            class="align-center px-4 py-2"
            style="display: grid; grid-template-columns: 1fr 3fr; gap: 10px"
          >
            <span>Address:</span>
            <span class="font-weight-bold text-left">{{ values.address }}</span>
          </div>
          <v-divider />
          <div
            class="align-center px-4 py-2"
            style="display: grid; grid-template-columns: 1fr 3fr; gap: 10px"
          >
            <span>State:</span>
            <span class="font-weight-bold text-left text-capitalize">{{
              values.state
            }}</span>
          </div>
        </v-card>
        <v-card outlined class="mt-6">
          <div v-for="(item, i) in payload.items" :key="item.id">
            <div class="d-flex align-start py-6 px-6">
              <v-card outlined class="position-relative">
                <ProxyImage
                  :src="item.primary_picture"
                  alt="Item"
                  class="cursor-pointer"
                  width="60"
                ></ProxyImage>
              </v-card>
              <div class="flex-grow-1 ml-3">
                <div class="d-flex justify-space-between align-start">
                  <p class="ma-0 mr-2">{{ item.name }}</p>
                  <p class="ma-0 font-weight-bold">
                    {{ item.price | currency }}
                  </p>
                </div>
                <div class="d-flex align-center justify-space-between mt-2">
                  <p>
                    Estimated shipping cost:
                    <span class="font-weight-bold">{{
                      item.estemate_cost | currency
                    }}</span>
                  </p>
                  <p>x{{ item.quantity }}</p>
                </div>
              </div>
            </div>
            <v-divider v-if="i !== payload.items.length - 1" />
          </div>
        </v-card>
        <v-card
          class="py-6 position-relative overflow-hidden px-0 mt-6"
          outlined
        >
          <div class="px-6 py-2 d-flex justify-space-between align-center">
            <div class="text-title black--text">Total</div>
            <div class="banner-title text-h6 black--text font-weight-bold pr-5">
              {{ payload.total_price | currency }}
            </div>
          </div>
          <div
            class="absolute right top"
            style="transform: translate(60%, 10px) rotate(-10deg); opacity: 0.2"
          >
            <v-icon color="primary" size="200">mdi-cart</v-icon>
          </div>
        </v-card>
        <v-card class="mt-6 pa-6 py-1" outlined>
          <v-checkbox
            label="Manage delivery"
            v-model="negotiate"
            hide-details
          />
          <p class="text-small mt-2">
            Our support team will contact you to discuss the shipping cost.
          </p>
        </v-card>
        <v-btn
          :loading="loading"
          @click="handleCheckout"
          block
          class="mt-8 checkout_button"
          color="primary"
          elevation="0"
          large
        >
          Create order
        </v-btn>
      </div>

      <v-snackbar color="red" top v-model="error"
        >Please upload a profile picture</v-snackbar
      >
    </v-card-text>
  </v-card>
</template>

<script>
import CheckoutTimer from "./CheckoutTimer";
import ProxyImage from "@/components/ProxyImage.vue";

export default {
  name: "Checkout",
  components: { ProxyImage, CheckoutTimer },
  props: {
    checkout: {
      type: Boolean,
      default: true,
    },
    lender: {
      type: Object,
      default() {
        return {
          image: "https://www.creditclan.com/images/logo-small.png",
          id: "40245",
          name: "Clan",
        };
      },
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.values.referral_code = this.$route.params.referralCode ?? null;
    this.getState();
    this.getIcons();
  },
  watch: {
    negotiate(negotiate) {
      if (negotiate) {
        this.payload = {
          ...this.logistics,
          items: this.logistics.items.map((item) => ({
            ...item,
            estemate_cost: 0,
          })),
          total_price: this.logistics.items.reduce(
            (acc, item) => acc + +item.price * +item.quantity,
            0
          ),
        };
      } else {
        this.payload = this.logistics;
      }
    },
  },
  data() {
    return {
      loading: false,
      error: false,
      states: [],
      lgas: [],
      order_from: "",
      values: {
        full_name: "",
        email: "",
        phone: "",
        address: "",
        state: null,
        referral_code: null,
      },
      disabled: false,
      view: "checkout",
      request: null,
      logistics: null,
      payload: null,
      cancelling: false,
      negotiate: false,
      platforms: [],
    };
  },
  methods: {
    async validate() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;
      await this.submit();
    },
    async getState() {
      try {
        const res = await this.$http.get(
          "https://lendnode.creditclan.com/gateway/store/stores/locations"
        );

        let a = res.data.data.map((item) => ({
          text: item,
          value: item,
        }));
        this.states = a;
      } catch (e) {
        console.log({ e });
        return null;
      }
    },
    async getLogistics() {
      try {
        const state = this.values.state;
        const items = this.$store.state.cart.items;

        // const orderFrom = this.platforms.includes() ?

        const isAnyItemInPlatforms = items.some((item) =>
          this.platforms.some((platform) => {
            return item.source
              ? platform.platform_name.toLowerCase() ==
                  item.source.toLowerCase()
              : null;
          })
        );

        const payload = {
          items: items.map(({ plan, ...item }) => ({
            ...item,
            ...plan,
            fourthPicture: item.primary_picture,
            fifthPicture: item.primary_picture,
          })),
          state,
          order_from: isAnyItemInPlatforms ? "Web" : "Store link",
          platform: isAnyItemInPlatforms ? "440 store" : "",
        };
        const res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/store_logistics",
          payload
        );
        return res.data.data;
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message || e.message,
          color: "red",
        });
        return null;
      }
    },

    async getIcons() {
      try {
        const res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/platforms",
          {
            country: "Nigeria",
            page: 0,
            is_deal: 1,
            all: false,
          }
        );
        this.platforms = res?.data?.data;
        console.log(this.platforms);
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message ?? e.message,
          color: "red",
        });
      }
    },

    async submit() {
      if (!this.checkout) return this.$emit("done", this.values);
      this.loading = true;
      const request = await this.getPendingRequest();
      if (request) {
        this.request = request;
        this.view = "request";
      } else {
        this.logistics = await this.getLogistics();
        this.$nextTick(() => {
          window.dataLayer.push({
            event: "begin_checkout",
            ecommerce: {
              currency: "NGN",
              value: this.logistics.total_price,
              coupon: "",
              items: this.logistics.items.map((item) => ({
                item_id: item.id,
                item_name: item.name,
                item_brand: "",
                item_category: "",
                price: item.price,
                quantity: item.quantity,
                logistics: item.estemate_cost,
              })),
            },
          });
        });

        if (this.logistics) {
          this.payload = this.logistics;
          this.view = "logistics";
        }
      }
      this.loading = false;
    },
    async handleCheckout() {
      this.loading = true;
      const slug = await this.createRequest();
      if (slug) await this.finish(slug);
      this.loading = false;
    },
    async finish(slug) {
      const { slug: merchant_slug } = this.$store.state.merchant;
      this.$store.commit("request/clear");
      this.$store.commit("cart/clear");
      await this.$router.push(`/${merchant_slug}/request/${slug}`);
      this.$emit("done");
    },
    async getPendingRequest() {
      try {
        const phone = this.values.phone;
        const res = await this.$http.get(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/pending_order/${phone}`
        );
        return res.data?.data;
      } catch (e) {
        console.log({ e });
        return null;
      }
    },
    async viewPendingOrder() {
      this.$emit("done");
      await this.$router.push(
        `/${this.$store.state.merchant.slug}/request/${this.request.request_slug}`
      );
      this.view = "checkout";
    },
    async createRequest() {
      const { merchant } = this.$store.state;
      try {
        const res = await this.$http.post(
          "https://sellbackend.creditclan.com/merchantclan/public/index.php/api/store_create_order_request",
          {
            ...this.values,
            items: this.payload.items,
            merchant_id: merchant ? merchant.id : null,
            total_price: this.payload.total_price,
            negotiate_delivery: this.negotiate,
          }
        );
        return res.data.data.request_slug;
      } catch (e) {
        console.log("Request error..", { e });
        return false;
      }
    },
    async generateLink(id) {
      try {
        await this.$http.patch(
          `https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/request/${id}/generate`,
          {
            url: `https://store.creditclan.com/request/${id}`,
          }
        );
      } catch (e) {
        return null;
      }
    },
    created() {
      console.log(this.$store.state.request, "request 22 jj");
    },
    async cancelRequest() {
      this.cancelling = true;
      try {
        const { id: rid, creditclan_request_id } = this.request;
        await this.$http.delete(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/delete_order/${rid}`
        );
        if (creditclan_request_id) {
          await this.$http.post(
            `https://mobile.creditclan.com/api/v3/cancel/loan_request`,
            { request_id: creditclan_request_id },
            {
              headers: {
                "x-api-key":
                  "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
              },
            }
          );
        }
      } catch (e) {
        console.log({ e });
      }
      this.request = null;
      this.view = "checkout";
      this.cancelling = false;
    },

  
    handleCancel() {
      const observer = this.$refs.observer;

      // Validate all fields
      let anyTouched = false;
      let hasErrors = false;

      // Loop through all ValidationProviders
      Object.values(observer.refs).forEach((provider) => {
        // Check if any fields have been touched
        if (provider.flags.touched) {
          anyTouched = true;
        }

        // Check if any fields have validation errors
        if (provider.flags.invalid) {
          hasErrors = true;
        }
      });

      if (anyTouched && hasErrors) {
        console.log("You haven't completed the form");
      }

      this.$emit("cancel");
    },
  },
};
</script>
