<template>
  <div>
    <div v-if="$store.getters['request/paid']" class="text-small d-flex align-center">
      <v-icon color="green" style="width:10px">mdi-circle-medium</v-icon>
      <span class="ml-2">Payment successful, item(s) will be delivered to you soon</span>
    </div>
    <v-btn v-else @click="$emit('open', 'payment')" color="primary" elevation="0" rounded>
      Make Payment
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'RequestStatus',
}
</script>
