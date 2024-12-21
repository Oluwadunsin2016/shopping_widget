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
        Kindly provide your landlord's phone number
      </div>
      <div v-else class="text-h4 font-weight-bold title black--text my-5">
        Kindly provide the landlord's phone number
      </div>

      <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
        <v-text-field
          :error-messages="errors"
          dense
          label="Landlord phone number"
          type="number"
          v-model="landlordNumber"
        ></v-text-field>
      </ValidationProvider>
			<v-btn :loading="loading" @click="updateLN" class="flex-grow-1" color="primary" elevation="0">Submit</v-btn>
    </form>
  </v-sheet>
</template>
<script>
	export default {
		name: 'LandlordNumber',
    props: {
    item: {
      type: Object,
      required: true,
    },
  },
		data() {
			return {
        landlordNumber: '',
				loading: false
			}
		},
		methods: {
      updateLN() {
        this.$store.commit('rent/set', { landlordNumber: this.landlordNumber });
        this.$emit('submit')
      }
    }
	}
</script>
