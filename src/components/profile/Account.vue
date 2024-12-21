<template>
  <div>
    <v-subheader class="d-flex mb-5 pa-0">
      Account Information
    </v-subheader>

    <v-alert class="mb-10" type="success" v-if="success">
      Account name: {{ values.account_name }}
      <br>
      <v-btn @click="change" class="mt-1" color="white" outlined x-small>Change</v-btn>
    </v-alert>
    <v-alert class="mb-10" type="error" v-if="error">{{ error }}</v-alert>

    <v-alert class="mb-10" outlined type="info" v-if="!success && !error">
      An account tied with the phone number you provided is recommended
    </v-alert>

    <ValidationObserver ref="observer">
      <form>
        <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
          <v-text-field
            :disabled="success || loading"
            :error-messages="errors"
            dense
            label="Phone number"
            v-model="phone"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="bank_code" rules="required" v-slot="{ errors }">
          <v-select
            :disabled="success || loading"
            :error-messages="errors"
            :items="banks"
            dense
            label="Bank"
            v-model="values.bank_code"
          ></v-select>
        </ValidationProvider>
        <ValidationProvider name="phone" rules="required" v-slot="{ errors }">
          <v-text-field
            :disabled="success || loading"
            :error-messages="errors"
            dense
            label="Account number"
            type="number"
            v-model="values.account_number"
          ></v-text-field>
        </ValidationProvider>
        <v-btn
          :loading="loading" @click="submit" block class="mt-4" color="primary" elevation="0" large
          v-if="!success"
        >
          Validate
        </v-btn>
        <v-btn @click="next" block class="mt-4" color="primary" elevation="0" large v-else>
          Continue
        </v-btn>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
	export default {
		name: "Account",

		data() {
			return {
				banks: [],
				values: this.$store.state.customer.account,
				phone: this.$store.state.customer.personal.phone,
				loading: false,
				loadingBanks: false,
				account_name: '',
				error: false,
				success: false,
			};
		},

		async created() {
			const { bank_id, account_number, account_name, bank_code } = this.$store.state.customer.account;
			this.values = { bank_id, account_number, account_name, bank_code };
			if (account_name) this.success = true;
			this.banks = await this.getBanks();
		},

		methods: {
			async submit() {
				const valid = await this.$refs.observer.validate()
				if (!valid) return;
				this.error = false;
				this.loading = true;
				this.values.bank_id = this.banks.find(bank => bank.value === this.values.bank_code).id;
				this.values.account_name = await this.validate(this.values.bank_code, this.values.account_number);
				this.loading = false;
				if (this.values.account_name) {
					this.success = true;
					await this.save();
				} else this.error = 'Could not validate account, Check your details and try again';
			},

			next() {
				this.$emit('done');
			},

			change() {
				this.success = false;
				this.error = false;
				this.values.account_name = '';
			},

			async validate(bank_code, account_number) {
				try {
					const res = await this.$http({
            method: "POST",
            url: "https://mobile.creditclan.com/webapi/v1/account/resolve",
            data: { account_number, bank_code: bank_code },
            headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' }
          });
					if (res.data.status === "success") return res.data.data.account_name;
					else return false;
				} catch (error) {
					console.log("Error", error);
					return false;
				}
			},

			async save() {
				this.loading = true;
				try {
          const { id } = this.$store.state.customer;
          const payload = { ...this.values, phone: this.phone }
          const fd = new FormData()
          Object.keys(payload).forEach(key => fd.append(key, payload[key]));
          await this.$http.post(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/customer/${ id }`, fd);
          this.$store.commit('customer/update', { key: 'account', value: this.values });
          const personal = { ...this.$store.state.customer.personal, phone: this.phone }
          this.$store.commit('customer/update', { key: 'personal', value: personal })
        } catch (e) {
          console.log({ e });
        }
				this.loading = false;
			},

			async getBanks() {
				this.loadingBanks = true;
        const res = await this.$http.get("https://mobile.creditclan.com/webapi/v1/banks", {
          headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' }
        });
				this.loadingBanks = false;
				return (res.data.data || []).sort((a, b) => (a.name > b.name ? 1 : -1)).map(bank => ({
					text: bank.name,
					value: bank.bank_code,
					id: bank.id
				}));
			},
		}
	}
</script>

<style scoped>

</style>
