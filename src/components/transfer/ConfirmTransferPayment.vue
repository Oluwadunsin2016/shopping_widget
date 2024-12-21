<template>
  <v-sheet
    class="d-flex flex-column align-center justify-center text-center py-16"
  >
    <br /><br /><br />
    <div class="d-flex align-center">
      <v-progress-circular
        color="primary"
        indeterminate
        size="24"
        class="mr-3"
      ></v-progress-circular>
      <SecondsCountdown />
    </div>
    <div class="mx-auto mt-6 black--text">Confirming your transfer</div>
    <p class="mt-1">
      Any issue? cancel confirmation
      <span @click="$emit('close')" class="blue--text mt-1 cursor-pointer"
        >here</span
      >
    </p>
    <br /><br /><br />
  </v-sheet>
</template>

<script>
import SecondsCountdown from '@/components/SecondsCountdown.vue'

export default {
  name: 'ConfirmTransferPayment',
  components: { SecondsCountdown },
  props: {
    transaction_reference: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    retries: 10,
    interval: null,
  }),
  async created() {
    this.interval = setInterval(async () => {
      await this.confirm()
      if (this.retries > 0) this.retries -= 1
      if (this.retries === 0) {
        clearInterval(this.interval)
        return this.$emit('close')
      }
    }, 5000)
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    async confirm() {
      const id = this.$store.state.request.id.toString()
      try {
        const { data } = await this.$http.post(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/esco/create`,
          {
            account_number: this.account_number,
            request_id: id,
          }
        )

        // if (data.status) {
          // this.$bus.$emit('toast', {
          //   message: `Payment Transaction Completed Successfully`,
          //   color: 'green',
          // })
          // localStorage.removeItem('request')
          // this.$emit('done')
          // this.$router.push(this.$store.state.merchant.slug)
        // } else 
        if (!data.status) {
          if (this.retries === 1) {
            this.$bus.$emit('toast', {
              message: data.status_desc,
              color: 'red',
            })
          }
        } else {
          this.retries = 0
          this.$emit('done')
        }
      } catch (e) {
        this.$bus.$emit('toast', {
          message: `Unable to confirm transfer, ensure you've made the transfer and try again`,
          color: 'red',
        })
      }
    },
  },
}
</script>
