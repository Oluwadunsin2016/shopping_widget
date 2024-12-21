<template>
  <div class="py-12 text-center">
    <div class="d-block mx-auto mb-5">
      <img alt="Modern life illustration" src="@/assets/images/agreement-people.svg" width="300"/>
    </div>
    <div class="mt-12 px-8 text-center">
      <h3 class="blue--text text--darken-4" style="font-size: 1.1rem; line-height: 1.5rem">
        In partnership with 20+banks
      </h3>
      <p class="black--text mt-4 mb-0">
        {{ $store.state.merchant.name }} has partnered with CreditClan to analyze your request. Kindly provide
        required information to proceed
      </p>
    </div>
    <v-btn v-if="$store.state.request.stage > 1" class="mt-6" color="primary" outlined @click="$emit('start')">
      Continue your request
    </v-btn>
    <v-btn v-else class="mt-12" color="primary" outlined @click="$emit('start')">Start</v-btn>
  </div>
</template>

<script>
export default {
  name: 'DefaultWalkthrough'
}
</script>
