<template>
  <paystack
    :amount="convertedAmount"
    :email="email"
    :paystackkey="paystackkey"
    :reference="reference"
    :callback="callback"
    :close="close"
    :embed="false"
  >
    <slot></slot>
  </paystack>
</template>

<script type="text/javascript">
import paystack from 'vue-paystack';

export default {
  name: 'Paystack',
  props: {
    email: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  components: {
    paystack
  },
  data() {
    return {
      paystackkey: "pk_live_bb2a3031e6893b1bf3ce4f1b880e5c0fc5e3230d",
    }
  },
  computed: {
    reference() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
    convertedAmount() {
      return +this.amount * 100;
    }
  },
  methods: {
    callback: function (response) {
      if (response.status === 'success') {
        this.$emit('done', response);
      }
    },
    close: function () {
      console.log("Payment closed")
    }
  }
}
</script>
