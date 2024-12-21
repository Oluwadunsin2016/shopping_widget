export default {
  data() {
    return {
      catalogue: this.$store.state.catalogue,
      views: {
        search: false,
        about: false,
        referral: false
      },
      layout: localStorage.getItem('layout') || 'grid',
      searchTab: null
    }
  },
  computed: {
    loading() {
      return this.$store.state.catalogue.loading;
    },
    fetching() {
      return this.$store.state.catalogue.fetching;
    },
    filtering() {
      return this.$store.state.catalogue.filtering
    },
    searching() {
      return this.$store.state.catalogue.searching
    },
    items() {
      const { merchantItems, globalItems, filteredItems, searchedItems } = this.$store.state.catalogue;
      if (this.filtering) {
        return filteredItems;
      } else if (this.searching) {
        return searchedItems;
      } else {
        if (this.$store.state.merchant.reseller === 1) return [...merchantItems, ...globalItems];
        if (merchantItems.length) return merchantItems;
        if (globalItems.length) return globalItems;
        return merchantItems;
      }
    },
  },
  watch: {
    layout(arg) {
      localStorage.setItem('layout', arg)
    }
  }
}
