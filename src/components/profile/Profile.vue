<template>
  <div>
    <v-subheader class="d-flex justify-space-between align-center mb-5 pa-0">
      <v-btn @click="$emit('cancel')" class="transparent" icon outlined small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      Profile
      <div></div>
    </v-subheader>
    <Avatar/>
    <ValidationObserver ref="personalFormObserver">
      <v-card class="mt-4" outlined>
        <v-card-text>
          <v-subheader class="blue--text px-0 m-0 mb-8" style="height: auto">Personal Information</v-subheader>
          <form>
            <ValidationProvider name="full_name" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Name"
                v-model="personalFormValues.full_name"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Email address"
                v-model="personalFormValues.email"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Phone number"
                v-model="personalFormValues.phone"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="gender" rules="required" v-slot="{ errors }">
              <v-select
                :error-messages="errors"
                :items="gender"
                dense
                label="Gender"
                v-model="personalFormValues.gender"
              ></v-select>
            </ValidationProvider>
            <ValidationProvider name="date_of_birth" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Date of birth"
                type="date"
                v-model="personalFormValues.date_of_birth"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="address" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Address"
                v-model="personalFormValues.address"
              ></v-text-field>
            </ValidationProvider>
          </form>
        </v-card-text>
      </v-card>
    </ValidationObserver>

    <ValidationObserver ref="workFormObserver">
      <v-card class="mt-4" outlined>
        <v-card-text>
          <v-subheader class="blue--text px-0 m-0 mb-8" style="height: auto">Work Information</v-subheader>
          <form>
            <ValidationProvider name="company_name" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Company name"
                v-model="workFormValues.company_name"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="net_monthly_income" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Net monthly income"
                type="number"
                v-model="workFormValues.net_monthly_income"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="occupation" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Occupation"
                v-model="workFormValues.occupation"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="sector" rules="required" v-slot="{ errors }">
              <v-select
                :error-messages="errors"
                :items="sectors"
                :loading="loadingSectors"
                dense
                label="Sector"
                v-model="workFormValues.sector"
              ></v-select>
            </ValidationProvider>
            <ValidationProvider name="work_address" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Work address"
                v-model="workFormValues.work_address"
              ></v-text-field>
            </ValidationProvider>
          </form>
        </v-card-text>
      </v-card>
      <v-btn @click="submit" class="mt-4" color="primary" elevation="0">Save</v-btn>
    </ValidationObserver>
  </div>
</template>

<script>
	import Avatar from "./Avatar";

	export default {
		name: "Profile",
		components: { Avatar },
		data() {
			return {
				gender: [
					{ text: 'Male', value: '1' },
					{ text: 'Female', value: '0' }
				],
				loadingSectors: false,
				sectors: [],
				personalFormValues: this.$store.state.customer.personal,
				workFormValues: this.$store.state.customer.work
			};
		},
		created() {
			this.getSectors()
		},
		methods: {
			async submit() {
				const personalFormValid = await this.$refs.personalFormObserver.validate()
				const workFormValid = await this.$refs.workFormObserver.validate()
				const avatarValid = !!this.$store.state.customer.avatar
				if (!personalFormValid || !workFormValid || !avatarValid) return;
				this.$store.commit('customer/update', { key: 'personal', value: this.personalFormValues });
				this.$store.commit('customer/update', { key: 'work', value: this.workFormValues });
				this.$emit('done');
			},
			async getSectors() {
				this.loadingSectors = true;
				const res = await this.$http.get("https://mobile.creditclan.com/webapi/v1/work_sectors", {
					headers: { 'x-api-key': '6f2oyFArftQsk2NY5XymekadAGehmCz9oWIprcbpYc3Hoq' }
				});
				this.loadingSectors = false;
				this.sectors = res.data.data.map(s => ({ text: s.name, value: s.id }));
			},
		},
	}
</script>
