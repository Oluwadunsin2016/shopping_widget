<template>
  <v-sheet>
    <form class="py-10 px-7">
      <div class="d-flex align-center justify-space-between mb-7">
        <v-btn icon outlined>
          <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn color="white" small icon style="background: tomato">
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h5 font-weight-bold title black--text my-5">
        Request Details
      </div>
      <div>
        <div
          v-if="loading"
          class="d-flex flex-column justify-space-center align-center text-center py-5"
        >
          <div class="spinner-grow text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="font-17 mt-4">Please wait..</div>
        </div>
        <div v-else class="font-17">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-space-between align-center px-2 py-3"
            >
              Rent amount:
              <span class="font text-right">{{
                formatCurrency(request.amount)
              }}</span>
            </li>
            <li
              class="list-group-item d-flex justify-space-between align-center px-2 py-3"
            >
              Type of house:
              <span class="font text-right">{{
                request.house_type
              }}</span>
            </li>
            <li
              class="list-group-item d-flex justify-space-between align-center px-2 py-3"
            >
              Address:
              <span class="font text-right">{{
                request.address
              }}</span>
            </li>
            <li
              class="list-group-item d-flex justify-space-between align-center px-2 py-3"
            >
              Landlord phone number:
              <span class="font text-right">{{
                request.landlord_phone || 'Not provided'
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div v-if="!loan.stage" class="text-h6 font-weight-bold title black--text my-5">Refreshing...</div> -->
      <div>
        <v-alert v-if="loan.stage === 'completed'" class="mt-5" shaped dense dark type="success">
        You request is under review
      </v-alert>
      <v-alert v-else-if="loan.stage === 'created'" class="mt-5" shaped dense dark type="warning">
        Eligibility pending
      </v-alert>
      <v-alert v-else class="mt-5" shaped dense dark type="error">
        Eligibility not done
      </v-alert>
      </div>
      <div class="d-flex">
        <v-btn
          :loading="loading"
          @click="$emit('done')"
          class="flex-grow-1"
          color="primary"
          elevation="0"
          >Get funded</v-btn
        >
      </div>
      <div class="d-flex pt-3">
        <v-btn
          :loading="loading"
          @click="$emit('cancelRequest')"
          class="flex-grow-1"
          color="red"
          elevation="0"
          outlined
          >Cancel request</v-btn
        >
      </div>
    </form>
  </v-sheet>
</template>
<script>
import { formatCurrency } from "@/lib/utils";
export default {
  name: 'RequestDetails',
  data() {
    return {
      formatCurrency,
      loading: false,
      request: {},
      user: {},
      loan: {},
    };
  },
  created() {
    this.request = this.$store.state.rent.request
    this.user = this.$store.state.rent.user
    this.getLoanDetailsQuery()
  },
  methods: {
    async getLoanDetailsQuery() {
      try {
        const payload = {
          email: this.$store.state.rent.user.email,
          phone: this.$store.state.rent.user.phone,
        };
        const response = await this.$http.post(
          'https://mobile.creditclan.com/api/v3/customer/check/details',
          payload,
          {
            headers: {
              'x-api-key':
                'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228',
            },
          }
        );
        const token = response.data.token;
        console.log('response', token);
        const res = await this.$http.post(
          'https://mobile.creditclan.com/api/v3/loan/details',
          { token, request_id: this.$store.state.rent.request.creditclan_request_id },
          {
            headers: {
              'x-api-key':
                'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228',
            },
          }
        );
        this.loan = res.data.data.loan;
        console.log('loan details', this.loan);
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
</script>
<style scoped>
.list-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border: 0.5px solid gray;
  border-radius: 0.25rem;
}
.list-group-item {
  border: 0.5px solid gray;
}

.font {
  font-weight: 700;
  font-size: 16px;
}
</style>
