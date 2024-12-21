<template>
  <div>
    <v-subheader class="d-flex justify-space-between align-center mb-5 pa-0">
      <v-btn @click="$emit('cancel')" class="transparent" icon outlined small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span class="ml-auto mr-auto">Identity</span>
    </v-subheader>
    <v-row class="px-4" v-if="!selected">
      <template v-for="identity in identities">
        <v-col :key="identity.type" cols="6">
          <v-card
            :color="selected === identity ? 'blue lighten-4' : ''" @click="selected = identity"
            class="py-12 text-center" outlined
          >
            <h4>{{ identity.name }}</h4>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <div v-else>
      <v-btn @click="changeType()" class="mb-5" color="grey lighten-4" elevation="0" rounded small>
        <v-icon>mdi-chevron-left</v-icon>
        Back
      </v-btn>
      <ValidationObserver ref="observer">
        <ValidationProvider name="BVN" rules="required|length:11" v-if="selected.type" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            :label="`Enter BVN number`"
            class="mx-2"
            type="numberE"
            v-model="values.bvn"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider :name="selected.type" rules="required" v-if="selected.type" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            :label="`Enter ${selected.name} number`"
            class="mx-2"
            type="number"
            v-model="values.value"
          ></v-text-field>
        </ValidationProvider>
        <v-btn @click="submit" class="mt-10" color="primary" elevation="0">Continue</v-btn>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Identity",
		data() {
			return {
				identities: [
					{ type: 'national-id', name: 'National ID' },
					{ type: 'voters-card', name: 'Voter\'s card' },
					{ type: 'driver-licence', name: 'Driver Licence' }
				],
				selected: null,
				values: { bvn: null, value: null }
			}
		},
		created() {
			const identity = this.$store.state.customer.identity;
			if (identity && identity.type) {
				this.selected = this.identities.find(t => t.type === identity.type)
				this.values = { value: identity.value, bvn: identity.bvn }
			}
		},
		methods: {
			async submit() {
				const valid = await this.$refs.observer.validate()
				if (!this.selected.type || !valid) return;
				this.$store.commit('customer/update', {
					key: 'identity', value: { type: this.selected.type, value: this.values.value, bvn: this.values.bvn }
				})
				this.$emit('done');
			},
			changeType() {
				this.selected = null;
				this.values = { bvn: null, value: null }
			}
		}
	}
</script>

<style scoped>

</style>