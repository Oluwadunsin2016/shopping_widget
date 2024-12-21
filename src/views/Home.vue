<template>
  <div class="bottom-nav-spacing grey lighten-4" v-if="!$store.state.catalogue.loading">
    <div class="mx-auto position-relative bg-white" style="max-width: 500px">
      <AffiliatesTemplate
        v-if="$store.state.merchant.reseller === 1 && !$store.state.catalogue.merchantItems.length"
      />
      <template v-else>
        <MakePaymentTemplate
          v-if="$store.state.catalogue.merchantItems.length < 1"
        />
        <InstoreOrderMobileTemplate
          v-if="$store.state.catalogue.merchantItems.length > 0"
        />
      </template>
    </div>
    <BottomNavigationStore/>
  </div>
</template>

<script>
import InstoreOrderMobileTemplate from "../components/templates/InstoreOrderMobileTemplate.vue";
import AffiliatesTemplate from "../components/templates/AffiliatesTemplate.vue";
import MakePaymentTemplate from "../components/templates/MakePaymentTemplate.vue";
import BottomNavigationStore from "../components/nav/BottomNavigationStore.vue";

export default {
  name: "Home",
  components: {
    InstoreOrderMobileTemplate,
    AffiliatesTemplate,
    MakePaymentTemplate,
    BottomNavigationStore
  },
  metaInfo() {
    return {
      title: 'Home'
    }
  },
  async created() {
    const { merchantItems, globalItems, loading, fetching } = this.$store.state.catalogue;
    if (loading || fetching) return;
    if (this.$store.state.merchant.reseller === 1 && !globalItems.length) {
      await this.$store.dispatch('catalogue/merchantItems');
      if (!this.$store.state.catalogue.merchantItems.length) {
        this.$store.commit('catalogue/set', { page: { count: 12, end: false, next: 1 } });
        await this.$store.dispatch('catalogue/globalItems');
      }
    } else if (!merchantItems.length && !globalItems.length) {
      await this.$store.dispatch('catalogue/merchantItems');
    }
  },
}
</script>
