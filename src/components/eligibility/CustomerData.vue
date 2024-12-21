<template>
  <v-card class="pa-0" elevation="0">
    <v-card-text class="px-6 py-6">
      <div v-if="view === 'bank-walkthrough'">
        <BankWalkthrough @start="view = 'home'"/>
      </div>

      <div v-if="view === 'default-walkthrough'">
        <DefaultWalkthrough @start="view = 'home'"/>
      </div>

      <div v-if="view === 'home'">
        <v-subheader class="justify-center mb-5">Provide Information</v-subheader>
        <v-card @click="view = 'profile'" class="mb-2" flat outlined>
          <v-card-title>Bio information</v-card-title>
          <v-card-subtitle class="green--text" v-if="$store.getters['customer/profileValid']">
            Provided
          </v-card-subtitle>
          <v-card-subtitle class="red--text" v-else>Not complete</v-card-subtitle>
        </v-card>
        <v-card @click="view = 'fcn'" class="mb-2" flat outlined>
          <v-card-title>Frequently called numbers</v-card-title>
          <v-card-subtitle class="green--text" v-if="$store.getters['customer/fcn'].length >= 3">
            {{ $store.getters['customer/fcn'].length }} added
          </v-card-subtitle>
          <v-card-subtitle class="red--text" v-else>At least 3 is required</v-card-subtitle>
        </v-card>
        <v-card :key="form.name" @click="view = form.name" class="mb-2" flat outlined v-for="form in forms">
          <v-card-title>{{ form.text }}</v-card-title>
          <v-card-subtitle class="green--text" v-if="$store.getters['customer/completed'](form.name)">
            Provided
          </v-card-subtitle>
          <v-card-subtitle class="red--text" v-else>Not provided</v-card-subtitle>
        </v-card>
        <v-btn :disabled="invalid" @click="submit" block class="mt-6" color="primary" elevation="0" large>
          Save
        </v-btn>
      </div>

      <div v-if="view === 'profile'">
        <Profile @cancel="view = 'home'" @done="view = 'home'"/>
      </div>

      <div v-if="view === 'fcn'">
        <FrequentlyCalledNumbers @cancel="view = 'home'" @done="view = 'home'"/>
      </div>

      <div v-if="view === 'identity'">
        <Identity @cancel="view = 'home'" @done="view = 'home'"/>
      </div>

      <div v-if="view === 'card'">
        <Repayment @cancel="view = 'home'" @done="view = 'home'"/>
      </div>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card-text>
  </v-card>
</template>

<script>
import Profile from "../profile/Profile";
import DefaultWalkthrough from "./DefaultWalkthrough";
import BankWalkthrough from "./BankWalkthrough";
import FrequentlyCalledNumbers from "./FrequentlyCalledNumbers";
import Identity from "./Identity";
import Repayment from "./Repayment";

export default {
  name: "CustomerData",

  components: {
    Repayment,
    Identity,
    FrequentlyCalledNumbers,
    BankWalkthrough,
    DefaultWalkthrough,
    Profile,
  },

  data() {
    return {
      view: '',
      loading: false,
      success: false,
      customer: this.$store.state.customer,
      request: this.$store.state.request,
      merchant: this.$store.state.merchant,
      forms: [
        { name: 'identity', text: 'Identity' },
        { name: 'card', text: 'Repayment Card' },
      ]
    };
  },

  created() {
    if (this.merchant.partnership === 1) this.view = 'bank-walkthrough';
    if (this.merchant.partnership === 0) this.view = 'default-walkthrough';
  },

		methods: {
			async submit() {
        this.loading = true;
        try {
          const { id, avatar, personal, work, identity, frequently_called_numbers } = this.$store.state.customer;
          const payload = {
            picture: avatar,
            ...personal,
            ...work,
            identity: JSON.stringify(identity),
            frequently_called_numbers: JSON.stringify(frequently_called_numbers)
          }
          const fd = new FormData()
          Object.keys(payload).forEach(key => fd.append(key, payload[key]));
          const { data } = await this.$http.post(`https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/customer/${ id }`, fd);
          this.$store.commit('customer/prefill', data.data);
          await this.$store.dispatch('request/load');
          this.$emit('done');
        } catch (e) {
          console.log({ e });
        }
        this.loading = false;
      }
		},

		computed: {
			invalid() {
				return !this.$store.getters['customer/valid'];
			}
		}
	}
</script>

