<template>
  <v-sheet v-if="loading" class="d-flex flex-column align-center justify-center text-center py-16">
    <br/><br/><br/>
    <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
    <p class="mx-auto mt-10 black--text" style="max-width: 300px">
      {{ loading || 'Please wait..' }}
    </p>
    <br/><br/><br/>
  </v-sheet>
  <v-sheet class="pa-0" v-else>
    <div v-if="view === 'add'" class="pa-md-12 lighten-4 py-10 px-8">
      <div class="text-h4">Pay with card</div>
      <p class="mt-4 mb-8 black--text">
        Provide your card details below to continue
      </p>
      <v-btn elevation="0" color="outline" class="mb-5" solid v-if="cards.length" @click="view = 'cards'">
        <v-icon class="mr-3" small>mdi-credit-card</v-icon>
        View Cards
      </v-btn>
      <div class="pay">
        <div class="pay-t">
          • • • •&nbsp;&nbsp;&nbsp;• • • •&nbsp;&nbsp;&nbsp;• • • •&nbsp;&nbsp;&nbsp;• • • •
        </div>
        <div class="d-flex" style="justify-content: space-between; align-items: center">
          <Paystack :amount="amount" :email="email" @done="handlePaystackDone($event)">
            <v-btn elevation="0" color="primary" solid small>
              <v-icon>mdi-plus</v-icon>
              Pay {{ amount | currency }}
            </v-btn>
          </Paystack>
          <MastercardLogo/>
        </div>
      </div>
      <v-btn color="red" outlined rounded @click="$emit('cancel')" class="mt-8">Cancel payment</v-btn>
    </div>

    <div v-if="view === 'otp'" class="pa-md-12 lighten-4 py-16 px-8">
      <div class="text-h4">
        Verify your phone number
      </div>
      <p class="mt-4 black--text">
        An OTP code has been sent to <span class="font-weight-bold">{{ phone }}</span> enter code below to continue
      </p>
      <div class="mt-10">
        <OtpCodeInput @done="handlePinDone($event)"/>
      </div>
      <v-btn color="red" outlined rounded @click="$emit('cancel')" class="mt-8">Cancel payment</v-btn>
    </div>

    <v-sheet v-if="view === 'cards'" class="pa-md-12 lighten-4 py-10 px-8">
      <div class="text-h4">Pay with card</div>
      <p class="mt-4 mb-8 black--text">
        Select your card below to continue
      </p>
      <v-btn elevation="0" color="outline" solid @click="view = 'add'">
        <v-icon>mdi-plus</v-icon>
        Add new card
      </v-btn>
      <div>
        <swiper ref="mySwiper" :options="swiperOptions">
          <template v-for="card in cards">
            <swiper-slide :key="card.card_id">
              <div @click="chargeCard(card)" class="card-design">
                <p class="text">{{ card.bank }}</p>
                <div class="text-1">
                  • • • •&nbsp;&nbsp;&nbsp;• • • •&nbsp;&nbsp;&nbsp;• • • •&nbsp;&nbsp;&nbsp;{{ card.last4 }}
                </div>
                <div class="jt d-flex align-center">
                  <p class="t-sm">EXP: {{ card.expiry_date }}</p>
                  <MastercardLogo/>
                </div>
              </div>
            </swiper-slide>
          </template>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <v-btn color="red" outlined rounded @click="$emit('cancel')" class="mt-8">Cancel payment</v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
import axios from "axios";
import MastercardLogo from "@/components/more/MastercardLogo.vue";
import Paystack from "@/components/Paystack.vue";
import OtpCodeInput from "@/components/global/OtpCodeInput.vue";

export default {
  name: "MakeCardPayment",
  components: { OtpCodeInput, MastercardLogo, Paystack },
  props: {
    amount: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      loading: '',
      view: '',
      cards: [],
      email: `${ this.name.replace(/\s/g, '') }@creditclan.com`,
      swiperOptions: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        breakpoints: {
          0: { slidesPerView: 1.2 },
          720: { slidesPerView: 1.5 }
        }
      }
    }
  },
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      this.loading = 'Getting cards..';
      try {
        const { data: { token } } = await axios.post(
          'https://mobile.creditclan.com/api/v3/customer/check/details', {
            phone: this.phone
          }, { headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' } }
        );
        const res = await axios.post('https://mobile.creditclan.com/api/v3/user/cards', { token }, {
          headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' }
        });
        this.cards = res.data.data
        if (!this.cards.length) this.view = 'add';
        else await this.sendOtp();
      } catch (e) {
        this.$bus.$emit("toast", { message: e?.response?.data?.message ?? 'Something went wrong', color: 'red' });
        this.view = 'add';
      }
      this.loading = '';
    },
    async sendOtp() {
      const res = await axios.post('https://sellbackend.creditclan.com/merchantclan/public/index.php/api/otp/send', { phone: this.phone })
      if (!res.data.status) {
        this.$bus.$emit("toast", { message: 'Something went wrong', color: 'red' });
        return this.$emit('cancel');
      }
      this.view = 'otp';
    },
    async handlePinDone(pin) {
      this.loading = 'Verifying OTP'
      const res = await axios.post('https://sellbackend.creditclan.com/merchantclan/public/index.php/api/otp/confirm', {
        phone: this.phone, otp: pin
      });
      this.loading = '';
      if (!res.data.status) {
        return this.$bus.$emit("toast", { message: 'OTP not correct', color: "red", });
      }
      this.view = 'cards';
    },
    async handlePaystackDone(response) {
      this.$emit('done', response);
    },
    async chargeCard(card) {
      this.loading = 'Charging card..';
      try {
        console.log('res', card);
      } catch (e) {
        const message = e?.response?.data?.message || e.message || 'An error occurred, please try again!';
        this.$bus.$emit("toast", { message, color: 'red' });
      }
    },
  }
}
</script>
