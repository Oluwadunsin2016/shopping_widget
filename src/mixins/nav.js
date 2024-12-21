export default {
  data() {
    return {
      scrolled: false,
      catalogue: this.$store.state.catalogue,
      merchant: this.$store.state.merchant,
      request: this.$store.state.request,
      views: {
        about: false,
        referral: false,
        whatsapp: false,
        order: false,
      },
      search: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      const scrollTop = e.target.scrollingElement.scrollTop;
      this.scrolled = scrollTop > 50
    },
    initials: name => {
      return name && name.substr(0, 2).toUpperCase();
    },
  }
}
