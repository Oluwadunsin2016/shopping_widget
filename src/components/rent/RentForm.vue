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
      <div class="text-h4 font-weight-bold title black--text my-5">
        We would like to know you
        <div class="text-title black--text my-5 fill-width">Please provide the following information to proceed</div>
      </div>

      <ValidationObserver ref="observer">
        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            label="Full Name"
            v-model="values.name"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            label="Email address"
            v-model="values.email"
          ></v-text-field>
        </ValidationProvider>
      </ValidationObserver>
      <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
        <v-text-field
          :error-messages="errors"
          dense
          label="Phone number"
          type="number"
          v-model="values.phone"
        ></v-text-field>
      </ValidationProvider>
			<v-btn :loading="loading" @click="checkRentRequestMutation" class="flex-grow-1" color="primary" elevation="0">Proceed</v-btn>
    </form>
  </v-sheet>
</template>
<script>
	export default {
		name: 'RentForm',
		data() {
			return {
				values: {
					name: '',
					email: '',
					phone: ''
				},
				loading: false
			}
		},
		methods: {
			async checkRentRequestMutation() {
      this.loading = true;
      try {
        await this.$http.post(
          'https://wema.creditclan.com/rent/pending/request',
          {phone: this.values.phone}

        );
        this.$store.commit('rent/set', { full_name: this.values.name });
        this.$store.commit('rent/set', { email: this.values.email });
        this.$store.commit('rent/set', { phone: this.values.phone });
        this.$emit('done')
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = '';
    },
		}
	}
</script>
