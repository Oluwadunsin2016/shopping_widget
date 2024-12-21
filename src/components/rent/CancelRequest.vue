<template>
  <v-sheet>
    <div class="py-10 px-7 text-center">
      <div class="d-flex flex-column justify-center align-end mb-7">
        <v-btn color="white" small icon style="background: tomato;">
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h5 font-weight-bold title black--text my-5">
        You are about to cancel this rent request. Do you wish to continue?
      </div>
      <div className="d-flex align-center justify-between">
        <v-btn
          @click="$emit('back')"
          class="mr-2 px-5"
          color="primary"
          elevation="0"
          outlined
          >No</v-btn
        >
        <v-btn
          :loading="loading"
          @click="handleCancelRequest"
          class="ml-2"
          color="error"
          elevation="0"
          >Yes, cancel</v-btn
        >
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'CancelRequest',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleCancelRequest() {
      try {
        await this.cancelRequest();
        if (this.$store.state.rent.request.creditclan_request_id) {
          await this.cancelCcRequest();
        }
        this.$store.commit('rent/clear');
      } catch (e) {
        console.log({e})
      }
    },
    async cancelRequest() {
      this.loading = true;
      try {
        await this.$http.post(
          'https://wema.creditclan.com/rent/cancel/request',
          { phone: this.$store.state.rent.user.phone }
        );
      } catch (e) {
        console.log('Request error..', { e });
      }
      this.loading = false;
    },
    async cancelCcRequest() {
      this.loading = true;
      try {
        await this.$http.post(
          'https://wema.creditclan.com/rent/cancel/request',
          { request_id: this.$store.state.rent.request.creditclan_request_id },
          {
            headers: {
              'x-api-key':
                'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228',
            },
          }
        );
      } catch (e) {
        console.log('Request error..', { e });
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
