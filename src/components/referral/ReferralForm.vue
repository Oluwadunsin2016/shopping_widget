<template>
  <v-sheet>
    <form class="py-10 px-7">
      <v-subheader class="justify-center mb-5 pa-0">
        Provide information
        <div></div>
      </v-subheader>

      <ValidationObserver ref="observer">
        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            label="Name"
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
    </form>
    <v-divider></v-divider>
    <div class="d-flex py-6 px-7">
      <v-btn :disabled="loading" @click="$emit('close')" color="red" outlined>Cancel</v-btn>
      <v-btn :loading="loading" @click="submit" class="flex-grow-1 ml-2" color="primary" elevation="0">Submit</v-btn>
    </div>
  </v-sheet>
</template>
<script>
	export default {
		name: 'ReferralForm',
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
		created() {
			const { full_name: name, email, phone } = this.$store.state.customer.personal;
			this.values = { name, email, phone };
		},
		methods: {
			async submit() {
				const valid = await this.$refs.observer.validate()
				if (!valid) return;
				this.loading = true;
				const success = await this.send();
				this.loading = false;
				if (success) {
					this.$refs.observer.reset()
					Object.keys(this.values).forEach(k => {
						this.values[k] = ''
					})
					this.$emit('success')
				}
			},
			async send() {
				try {
					const merchant_id = this.$store.state.merchant.id;
					const { data } = await this.$http.post('/referral', { ...this.values, merchant_id });
					return data.status
				} catch (e) {
					return false
				}
			}
		}
	}
</script>
