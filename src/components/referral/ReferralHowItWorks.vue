<template>
  <v-sheet>
    <div class="pa-4 py-6">
      <p class="mb-4 text-center text-title">How it works</p>
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar class="d-flex justify-center align-center" color="teal lighten-5">
            <span class="teal--text headline">1</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Become a reseller</v-list-item-title>
            <v-list-item-subtitle>Provide your information to become a reseller</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar class="d-flex justify-center align-center" color="teal lighten-5">
            <span class="teal--text headline">2</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Get your link</v-list-item-title>
            <v-list-item-subtitle>A referral link will be sent to email address provided</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar class="d-flex justify-center align-center" color="teal lighten-5">
            <span class="teal--text headline">3</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Share link</v-list-item-title>
            <v-list-item-subtitle>Share referral link with friends to start earning</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-divider></v-divider>
    <div class="d-flex py-6 px-7">
      <v-btn @click="$emit('close')" color="red" outlined>Cancel</v-btn>
      <v-btn
        @click="$emit('view', 'form')" class="flex-grow-1 ml-2" color="primary"
        elevation="0"
      >Got it
      </v-btn>
    </div>
  </v-sheet>
</template>
<script>
	export default {
		name: 'ReferralHowItWorks',
		props: {
			form: {},
			how: {},
			views: {}
		}
	}
</script>
