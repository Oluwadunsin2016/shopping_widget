<template>
  <v-sheet>
    <form class="py-10 px-7">
			<div class="d-flex align-center justify-space-between mb-7">
          <v-btn icon outlined>
            <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
          color="white"
          small
          icon
          style="background: tomato"
        >
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div v-if="item.title === 'Renew Rent'" class="text-h4 font-weight-bold title black--text my-5">
        How much is your rent
      </div>
      <div v-else class="text-h4 font-weight-bold title black--text my-5">
        How much is the house rent
      </div>
        <v-text-field
          dense
          label="Rent Amount"
          type="number"
          v-model="rentAmount"
          class="mb-7"
        ></v-text-field>
			<v-btn :loading="loading" @click="updateAmount" class="flex-grow-1" color="primary" elevation="0">Continue</v-btn>
    </form>
  </v-sheet>
</template>
<script>
	export default {
		name: 'RentAmount',
    props: {
    item: {
      type: Object,
      required: true,
    },
  },
		data() {
			return {
        rentAmount: '',
				loading: false
			}
		},
		methods: {
      updateAmount() {
        this.$store.commit('rent/set', { rentAmount: this.rentAmount });
        this.$emit('done')
      }
		}
	}
</script>
