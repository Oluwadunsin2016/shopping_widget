<template>
  <div class="overflow-x-hidden">
    <CatalogueMobile v-if="$vuetify.breakpoint.smAndDown"/>
    <CatalogueDesktop v-else/>
  </div>
</template>

<script>
import CatalogueMobile from "../components/catalogue/CatalogueMobile";
import CatalogueDesktop from "../components/catalogue/CatalogueDesktop";

export default {
  name: "Catalogue",
  components: {
    CatalogueDesktop,
    CatalogueMobile,
  },
  metaInfo() {
    return {
      title: 'Collection',
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
  beforeDestroy() {
    const { searching, filtering } = this.$store.state.catalogue;
    if (searching) this.$store.commit("catalogue/cancelSearch");
    if (filtering) this.$store.commit("catalogue/cancelFilter");
  }
}
</script>
