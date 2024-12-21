<template>
  <div>
    <v-sheet class="d-flex flex-column align-start justify-center fill-height py-8 px-12" v-if="view === 'home'">
      <div class="mt-8" style="max-width: 280px">
        <div class="headline font-weight-medium mb-7 grey--text text--darken-3">Earn up to 100k on referrals</div>
        <p class="mb-7 grey--text">Click the button below to get started</p>
      </div>
      <div class="d-flex mb-10">
        <v-btn @click="view = views.confirmation" color="primary" outlined>Become a reseller</v-btn>
      </div>
      <div class="d-flex align-self-stretch flex-grow-1 align-end justify-end pt-5">
        <img alt="Modern life illustration" src="@/assets/images/referral.svg" width="200"/>
      </div>
    </v-sheet>

    <div v-if="view === views.confirmation">
      <ReferralConfirmation :merchant="merchant" @view="view = $event"/>
    </div>

    <div v-if="view === views.how">
      <ReferralHowItWorks @close="cancel()" @view="view = $event"/>
    </div>

    <div v-if="view === views.form">
      <ReferralForm @close="cancel()" @success="view = views.success"/>
    </div>

    <div v-if="view === views.success">
      <ReferralSuccess @close="cancel()"/>
    </div>
  </div>
</template>

<script>
	import ReferralConfirmation from "./ReferralConfirmation"
	import ReferralForm from "./ReferralForm"
	import ReferralHowItWorks from "./ReferralHowItWorks"
	import referral from "../../mixins/referral";
	import ReferralSuccess from "./ReferralSuccess";

	export default {
		name: 'Referral',
		components: { ReferralSuccess, ReferralConfirmation, ReferralForm, ReferralHowItWorks },
		mixins: [ referral ]
	}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables';

  .container {
    margin-top: var(--nav-spacing);
    height: calc((var(--vh, 1vh) * 100) - var(--nav-spacing))
  }
</style>