<template>
  <v-sheet class="px-6 py-6">
    <div class="py-16 text-center" v-if="view === 'loading'">
      <br><br><br>
      <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
      <p class="mx-auto mt-10" style="max-width: 300px">
        Just a moment while we analyze your request, it will take a few seconds
      </p>
      <br><br><br>
    </div>
    <div class="py-16 text-center" v-if="view === 'result'">
      Final score {{ result.final_score }}
    </div>
  </v-sheet>
</template>

<script>
	export default {
		name: "Eligibility",
		data() {
			return {
				view: '',
				result: {},
			}
		},
		created() {
			// this.runEligibility()
		},
		methods: {
			async runEligibility() {
				const customer = this.$store.state.customer;
				const dob = new Date(customer.personal.date_of_birth);
				const payload = {
					profile_leaves: [1, 2, 3, 4, 5],
					customer_data: {
						LEGAL_NAME: customer.personal.full_name,
						NET_MONTHLY_INCOME: customer.work.net_monthly_income,
						BIRTH_YEAR: dob.getFullYear(),
						BIRTH_MONTH: dob.getMonth(),
						BIRTH_DAY: dob.getDate(),
						BVN: customer.identity.bvn,
						PHONE: customer.personal.phone,
						EMAIL: customer.personal.email,
						GENDER: customer.personal.gender,
						MONTHLY_TEL_INTERNET: 0,
						MONTHLY_TRANSPORT: 0
					},
					credit_bureau: true,
					creditbureau_leaves: [1, 2, 3, 4, 5, 6, 7, 8]
				}
				this.view = 'loading';
				try {
          const { data } = await this.$http.post(`https://sellbackend.creditclan.com/schoolcredit/public/index.php/api/eligibility/service`, payload)
          this.view = 'result';
          this.result = data;
          await this.saveEligibilityResult(data)
        } catch (e) {
          console.log({ e });
          this.view = 'error';
        }
			},
			async saveEligibilityResult(eligibility_data) {
        await this.$http.post(`https://sellbackend.creditclan.com/merchantclan/public/index.php/api/eligibility/save`, {
          eligibility_data,
          request_id: this.$store.state.request.id
        });
        this.$store.commit('request/set', { eligibility_data: eligibility_data });
      }
		}
	}
</script>

<style scoped>

</style>
