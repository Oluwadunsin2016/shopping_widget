<template>
  <div>
    <v-subheader class="d-flex justify-space-between align-center mb-5 pa-0">
      <v-btn @click="$emit('cancel')" class="transparent" icon outlined small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span class="ml-auto mr-auto">Frequently Called Numbers</span>
    </v-subheader>
    <ValidationObserver :key="i" :ref="`observer${i}`" v-for="i in [0, 1, 2]">
      <v-card class="mt-4" outlined>
        <v-card-text>
          <form>
            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Name"
                v-model="fcn[i].name"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="phone" rules="required|phone" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                dense
                label="Phone number"
                v-model="fcn[i].phone"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider name="relationship" rules="required" v-slot="{ errors }">
              <v-select
                :error-messages="errors"
                :items="relationships"
                dense
                label="Relationship"
                v-model="fcn[i].relationship"
              ></v-select>
            </ValidationProvider>
          </form>
        </v-card-text>
      </v-card>
    </ValidationObserver>

    <v-btn @click="submit" class="mt-5" color="primary" elevation="0">Continue</v-btn>
  </div>
</template>

<script>
	export default {
		name: "FrequentlyCalledNumbers",
		data() {
			return {
				relationships: [
					{ text: 'Sibling', value: 'Brother' },
					{ text: 'Parent', value: 'Parent' },
					{ text: 'Friend', value: 'Friend' },
					{ text: 'Relative', value: 'Relative' },
				],
				fcn: []
			}
		},
		created() {
			const fcn = this.$store.state.customer.frequently_called_numbers;
			this.fcn = fcn.length ? fcn : [{}, {}, {}];
		},
		methods: {
			async submit() {
				const valid0 = await this.$refs.observer0[0].validate();
				const valid1 = await this.$refs.observer1[0].validate();
				const valid2 = await this.$refs.observer2[0].validate();
				if (!valid0 || !valid1 || !valid2) return;
				this.$store.commit('customer/update', { key: 'frequently_called_numbers', value: this.fcn });
				this.$emit('done');
			}
		},
	}
</script>

<style scoped>

</style>