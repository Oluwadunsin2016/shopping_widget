<template>
  <div>
    <v-subheader class="d-flex justify-space-between align-center mb-5 pa-0">
      <v-btn @click="$emit('cancel')" class="transparent" icon outlined small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      Repayment card
      <div></div>
    </v-subheader>

    <v-alert dense text type="info" v-if="!card">A small fee of N5.00 will be charged to add your card</v-alert>

    <div class="d-flex justify-center py-5">
      <div class="card" v-if="card">
        <div class="top">
          <div class="name">{{ card.bank }}</div>
        </div>
        <div class="middle">
          <div class="number">**** **** **** {{ card.last4 }}</div>
        </div>
        <div class="bottom">
          <div class="items">
            <div class="item">
              <span class="label">Expiry</span>
              <span class="value">{{ card.exp_month }}/{{ card.exp_year }}</span>
            </div>
            <div class="item">
              <img alt="card type" class="card__img"
                   src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png"
                   v-if="`${card.card_type}`.includes('mastercard')"
              >
              <img alt="card type" class="card__img"
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1920px-Visa_Inc._logo.svg.png"
                   v-if="`${card.card_type}`.includes('visa')"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="top">
          <div class="name">No card added</div>
        </div>
        <div class="middle">
          <div class="number">**** **** **** ****</div>
        </div>
        <div class="bottom">
          <div class="items">
            <div class="item">
              <span class="label">Expiry</span>
              <span class="value">--</span>
            </div>
            <Paystack :amount="5" :email="$store.state.customer.personal.email" @done="paystackDone($event)">
              <v-btn outlined rounded small>
                <v-icon>mdi-plus</v-icon>
                Add
              </v-btn>
            </Paystack>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <Paystack :amount="5" :email="$store.state.customer.personal.email" @done="paystackDone($event)" v-if="card">
        <v-btn class="mt-5" outlined rounded small>
          Change card
        </v-btn>
      </Paystack>
    </div>
  </div>
</template>

<script>
import Paystack from "../Paystack";

export default {
  name: "Repayment",
  components: { Paystack },
  data() {
    return {
      request: this.$store.state.request,
    }
  },
  methods: {
    async paystackDone(response) {
      if (response && response.reference) {
        try {
          const res = await this.$http.post(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/card`, {
            request_id: this.request.id,
            ref_no: response.reference
          });
          this.$store.commit('customer/update', { key: 'card', value: res.data.card })
        } catch (e) {
          console.log('Card error', { e });
        }
      }
    }
  },
  computed: {
    card() {
      return this.$store.state.customer.card
    }
  }
}
</script>

<style scoped>
  .card {
    width: 100%;
    background: linear-gradient(to right, #f5f5ff, #e4f4ff);
    border-radius: 4px;
    position: relative;
    max-width: 330px;
    /*min-height: 200px;*/
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .card .top,
  .card .bottom {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 20px;
    color: #424242;
  }

  .card .middle {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .card .number {
    font-size: 1.3rem;
    color: #424242;
    font-weight: bold;
    padding: 1.5rem 1rem;
    flex: 1;
  }

  .card .name {
    font-size: .9rem;
  }

  .card .items {
    display: flex;
    justify-content: space-between;
  }

  .card .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 5px;
  }

  .card .item .label {
    font-size: .7rem;
    color: goldenrod;
    margin: 0;
    padding: 0;
  }

  .card .item .value {
    font-size: .86rem;
    color: #424242;
    margin: 0;
    padding: 0;
  }

  .card .item img {
    width: 50px;
  }
</style>
