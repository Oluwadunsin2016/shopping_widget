<template>
  <v-sheet>
    <form>
      <div class="text-h4 font-weight-bold title black--text my-5">
        We would like to know you
      </div>
      <div class="text-title black--text mb-5 fill-width">
        Please provide the following information to proceed
      </div>
      <div style="width: 100%">
        <ValidationObserver ref="observer">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <div class="mt-5 d-flex justify-space-between align-center">
              <v-text-field
                hide-details
                label="Full Name"
                :error-messages="errors"
                v-model="values.name"
                value="10.00"
              >
              </v-text-field>
            </div>
          </ValidationProvider>
          <ValidationProvider name="email" rules="required" v-slot="{ errors }">
            <div class="d-flex justify-space-between align-center">
              <v-text-field
                hide-details
                label="Email Address"
                :error-messages="errors"
                v-model="values.email"
                value="10.00"
              >
              </v-text-field>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="phone"
            rules="required|phone"
            v-slot="{ errors }"
          >
            <div class="mb-5 d-flex justify-space-between align-center">
              <v-text-field
                v-model="values.phone"
                :error-messages="errors"
                hide-details
                label="Phone Number"
                class="mt-5"
              >
              </v-text-field>
            </div>
          </ValidationProvider>
          <v-btn
            :loading="loading"
            @click="checkRentRequestMutation"
            elevation="0"
            color="primary"
            solid
            block
            class="mt-15"
          >
            Proceed
          </v-btn>
        </ValidationObserver>
      </div>
    </form>
  </v-sheet>
</template>
<script>
export default {
  name: 'FindAHouseForm',
  data() {
    return {
      values: {
        name: '',
        email: '',
        phone: '',
      },
      loading: false,
    };
  },
  methods: {
    async checkRentRequestMutation() {
      this.loading = true;
      try {
        const payload = {
          phone: this.values.phone,
        };
        await this.$http.post(
          'https://wema.creditclan.com/rent/pending/request',
          payload
        );
        this.$store.commit('rent/set', { full_name: this.values.name });
        this.$store.commit('rent/set', { email: this.values.email });
        this.$store.commit('rent/set', { phone: this.values.phone });
        this.$emit('done');
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = false;
    },
  },
};
</script>
