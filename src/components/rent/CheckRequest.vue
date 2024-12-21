<template>
  <v-card>
    <!-- <v-sheet> -->
      <div v-if="view === 'welcome'">
        <form class="py-10 px-7">
          <div class="d-flex align-center justify-space-between mb-7">
            <v-btn icon outlined>
              <v-icon size="32" @click="$emit('close')"
                >mdi-chevron-left</v-icon
              >
            </v-btn>
            <v-btn color="white" small icon style="background: tomato">
              <v-icon size="18" @click="$emit('close')">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="text-h4 font-weight-bold title black--text my-5 mb-8">
            Please provide your whatsapp phone number
          </div>
          <ValidationProvider
            name="phone"
            rules="required|phone"
            v-slot="{ errors }"
          >
            <v-text-field
              :error-messages="errors"
              dense
              label="Phone number"
              type="number"
              v-model="values.phone"
            ></v-text-field>
          </ValidationProvider>
        </form>
        <div class="d-flex py-4 px-7">
          <v-btn
            :loading="loading"
            @click="checkUserMutation"
            class="flex-grow-1"
            color="primary"
            elevation="0"
            >Proceed</v-btn
          >
        </div>
      </div>
    <!-- </v-sheet> -->
    <RequestDetails
      @cancel="$emit('close')"
      @close="view = 'welcome'"
      v-if="view === 'request-details'"
      @done="view = 'eligibility'"
      @cancelRequest="view = 'cancel-request'"
    />
    <RentEligibility
      v-if="view === 'eligibility'"
      @done="reset()"
      @cancel="view.eligibility = false"
    />
    <CancelRequest 
      @cancel="$emit('close')"
      v-if="view === 'cancel-request'"
      @back="view = 'request-details'"
    />
  </v-card>
</template>
<script>
import RequestDetails from './RequestDetails.vue';
import RentEligibility from './RentEligibility.vue';
import CancelRequest from './CancelRequest.vue';
export default {
  name: 'CheckRequest',
  data() {
    return {
      view: 'welcome',
      values: {
        phone: '',
      },
			user: {},
			request: {},
      loading: false,
    };
  },
  methods: {
    async checkUserMutation() {
      this.checkRentRequestQuery()
      this.loading = true;
      try {
        const res = await this.$http.post('https://wasapnodeserver.herokuapp.com/user', {
          phone: this.values.phone,
        });
				this.user = res.data.data.userData.data.profile,
				console.log('user', this.user)
        this.$store.commit('rent/set', { user: this.user });
        this.view = 'request-details';
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = false;
    },
		async checkRentRequestQuery() {
      try {
        const res = await this.$http.post(
          'https://wema.creditclan.com/rent/pending/request',
          { phone: this.values.phone}
        );
        this.request = res.data.request, 
        console.log('request', this.request);
        this.$store.commit('rent/set', { request: this.request });
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
    },
  },
  components: { RequestDetails, RentEligibility, CancelRequest },
};
</script>
<style scoped>
	.v-card {
		box-shadow: none !important;;
	}
</style>
