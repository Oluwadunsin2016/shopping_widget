<template>
  <v-sheet class="pt-10 pb-8 d-flex flex-column">
    <div class="px-10">
      <div class="mb-4 d-flex flex-column align-center text-center">
        <v-avatar class="mb-5" color="orange lighten-5" size="80">
          <v-icon color="orange" size="40">mdi-email</v-icon>
        </v-avatar>
        <p class="black--text text-title-md" style="width: 70%">
          Your referral link has been sent to your email
        </p>
      </div>
      <div class="d-flex mt-8 justify-center">
        <v-btn @click="$emit('close')" class="px-8 ml-2" color="red" dark outlined>
          Close
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<script>
	export default {
		name: 'ReferralSuccess'
	}
</script>
