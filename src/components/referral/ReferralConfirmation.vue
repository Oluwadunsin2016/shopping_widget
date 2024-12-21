<template>
  <v-sheet>
    <div class="px-12 py-12 text-center">
      You agree to sell for {{ merchant.name }}
    </div>
    <v-divider></v-divider>
    <div class="d-flex py-6 px-7">
      <v-btn @click="$emit('view', 'how')" color="grey" outlined>How it works</v-btn>
      <v-btn @click="$emit('view', 'form')" class="flex-grow-1 ml-2" color="primary"
             elevation="0">
        Got it
      </v-btn>
    </div>
  </v-sheet>
</template>
<script>
	export default {
		name: 'ReferralConfirmation',
		props: {
			merchant: {
				type: Object
			}
		}
	}
</script>
