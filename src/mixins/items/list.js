export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleWindowScroll);
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleWindowScroll);
  },
  methods: {
    handleWindowScroll(e) {
      if (this.loading || this.fetching) return;
      const { clientHeight, scrollHeight, scrollTop } = e.target.scrollingElement;
      const scrolled = (scrollTop + clientHeight) > (scrollHeight - 800);
      if (scrolled && !(this.loading || this.fetching)) {
        if (this.searching) {
          this.$store.dispatch('catalogue/searchItems', this.$store.state.catalogue.search);
        } else if (this.filtering) {
          this.$store.dispatch('catalogue/filterItems', this.$store.state.catalogue.filter);
        } else if (this.$store.state.catalogue.merchantItems.length) {
          this.$store.dispatch('catalogue/merchantItems');
        } else if (this.$store.state.catalogue.globalItems.length) {
          this.$store.dispatch('catalogue/globalItems');
        }
      }
    },
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
    cols() {
      const theme = this.$store.getters['merchant/theme'];
      return 12 / theme.items_display
    }
  },
}
