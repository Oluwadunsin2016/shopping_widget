<template>
  <v-card class="fill-height lighten-4">
    <v-card-text class="pa-0 fill-height d-flex flex-column">
      <template v-if="view === 'form'">
        <div class="px-8 pt-10 pb-6 white border-bottom">
          <div class="d-flex align-center justify-space-between">
            <div class="text-h5 font-weight-medium black--text">
              Please provide contact details below
            </div>
            <v-btn @click="$emit('cancel')" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="grey lighten-4">
          <div class="py-6 px-8">
            <ValidationObserver ref="observer">
              <Avatar @change="file = $event" :file="file" />
              <ValidationProvider name="full_name" rules="required" v-slot="{ errors }">
                <v-text-field class="input-lg" :disabled="loading" :error-messages="errors" dense label="Name"
                  v-model="values.full_name"></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="phone_no" rules="required|phone" v-slot="{ errors }">
                <v-text-field class="input-lg" :disabled="loading" :error-messages="errors" dense label="Phone number"
                  v-model="values.phone_no"></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <v-text-field class="input-lg" :disabled="loading" :error-messages="errors" dense label="Email"
                  v-model="values.email"></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="dob" rules="required" v-slot="{ errors }">
                <v-text-field class="input-lg mt-5" :disabled="loading" :error-messages="errors" dense type="date"
                  label="Date of birth" v-model="values.dob"></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Gender" rules="required" v-slot="{ errors }">
                <v-select :error-messages="errors" :items="gender" dense label="Gender" v-model="values.gender"
                  class="mt-5">
                </v-select>
              </ValidationProvider>
              <v-btn :loading="loading" @click="submit" block class="mt-10" color="primary" elevation="0" large>
                Proceed
              </v-btn>
            </ValidationObserver>
          </div>
        </div>

        <img src="../../assets/images/happy-straight.png" alt="" class="fill-width mt-auto" />
      </template>
    </v-card-text>
    <Modal v-model="views.pay" persistent>
      <MakePayment :name="values.full_name" :phone="values.phone_no" :amount="+movie.span" @done="handlePaymentDone()"
        @cancel="closeViews()" />
    </Modal>

    <Modal v-model="views.loading" class="py-16 text-center">
      <v-sheet class="d-flex flex-column align-center justify-center text-center">
        <br /><br /><br />
        <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
        <p class="mx-auto mt-10 black--text" style="max-width: 300px">
          {{ loading || 'Please wait..' }}
        </p>
        <br /><br /><br />
      </v-sheet>
    </Modal>
    <v-snackbar top v-model="toast.visible" color="red" :timeout="5000">
      {{ toast.message }}
    </v-snackbar>
  </v-card>
</template>

<script>
import views from "@/mixins/views.js";
import Modal from "@/components/Modal.vue";
import Avatar from "../profile/Avatar.vue";
import MakePayment from "../payment/MakePayment.vue";

export default {
  name: "Checkout",
  components: { Modal, Avatar, MakePayment },
  mixins: [views],
  props: {
    movie: {
      type: Object
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cancelling: false,
      loading: false,
      values: {
        full_name: '',
        email: '',
        phone_no: '',
        gender: '',
        dob: '',
        amount: 0
      },
      gender: [{ id: 1, value: 'Male', text: 'Male' }, { id: 2, value: 'Female', text: "Female" }],
      view: 'form',
      file: null,
      voucher: '',
      toast: {
        visible: false,
        message: ''
      },
      request: '',
      views: {
        pay: false,
        loading: false,
      },
      cards: [],
      email: '',
      data: {},
    }
  },
  created() {
    const { phone, ...personal } = this.$store.state.customer.personal;
    this.values = { ...personal, phone_no: phone }
  },
  methods: {
    async submit() {
      if (!await this.$refs.observer.validate()) return;
      if (this.file === null) {
        return this.$bus.$emit("toast", { message: 'Please upload profile image', color: 'red' });
      }
      this.showView('pay');
    },

    handleSelectPlan(plan) {
      this.plan = plan;
    },

    async handlePaymentDone() {
      this.closeViews();
      this.view = 'success';
      // const res = await axios.post('localhost:1000/api/more-widget/airtime', { serviceID: this.plan, amount: this.values.amount, phone: this.values.phone })
      // console.log(res.data)
    },
  }
}
</script>

<style lang="scss">
.card {
  width: 95% !important;
  background-color: #1E3A8A;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  transition: all .3s ease-in-out;
  color: #fff !important;

  &:hover {
    background-color: darken(#1E3A8A, 5);
  }
}
</style>
