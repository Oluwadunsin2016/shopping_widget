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
        Kindly provide your house address
      </div>
      <div v-else class="text-h4 font-weight-bold title black--text my-5">
        What is the address of the house you found
      </div>
      <ValidationObserver ref="observer">
        <ValidationProvider name="address" rules="required|address" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            label="House address"
            v-model="houseAddress"
          ></v-text-field>
        </ValidationProvider>
    </ValidationObserver>
			<v-btn :loading="loading" @click="updatHA" class="flex-grow-1" color="primary" elevation="0">Continue</v-btn>
    </form>
  </v-sheet>
</template>
<script>
	export default {
		name: 'HouseAddress',
    props: {
    item: {
      type: Object,
      required: true,
    },
  },
		data() {
			return {
        houseAddress: '',
				loading: false
			}
		},
		methods: {
      updatHA() {
        this.$store.commit('rent/set', { houseAddress: this.houseAddress });
        this.$emit('done')
      }
		}
	}
</script>
