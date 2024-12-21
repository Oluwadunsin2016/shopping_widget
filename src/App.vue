<template>
  <v-app id="app">
    <main>
    <Navbar/>
    <MobileNav/>
      <router-view class="router"/>
    </main>
    <!-- <v-main class="d-none d-md-block">
      <router-view class="mt-10"/>
    </v-main> -->

    <CartMobile v-if="$vuetify.breakpoint.mdAndDown"/>
    <CartDesktop v-else/>

    <Modal v-model="views.search">
      <v-sheet class="pa-8 py-16">
        <h2 class="mb-8">Search for an item</h2>
        <SearchItems @close="closeViews()"/>
      </v-sheet>
    </Modal>

    <Modal v-model="views.options">
      <ShopOptions @close="closeViews()"/>
    </Modal>

    <Modal v-model="views.order">
      <WhatsappPurchaseFlow @close="closeViews()"/>
    </Modal>

    <Modal v-model="views.global" fullscreen>
      <GlobalStoreSearch @close="closeViews()"/>
    </Modal>

    <Modal v-model="views.support">
      <ContactSupport @close="views.support = false"/>
    </Modal>

    <v-snackbar :color="toast.color || ''" top v-model="toast.visible">
      {{ toast.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import CartDesktop from "./components/cart/CartDesktop";
import CartMobile from "./components/cart/CartMobile";
import ShopOptions from "./components/ShopOptions.vue";
import views from "./mixins/views.js"
import WhatsappPurchaseFlow from "./components/whatsapp/WhatsappPurchaseFlow.vue";
import GlobalStoreSearch from "./components/GlobalStoreSearch.vue";
import ContactSupport from "./components/ContactSupport.vue";
import SearchItems from "./components/SearchItems.vue";
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import MobileNav from "./components/MobileNav.vue";

export default {
  name: 'App',
  mixins: [views],
  components: {
    Modal,
    Navbar,
    MobileNav,
    SearchItems,
    ContactSupport,
    GlobalStoreSearch,
    WhatsappPurchaseFlow,
    ShopOptions,
    CartMobile,
    CartDesktop,
  },
  data() {
    return {
      views: {
        options: false,
        order: false,
        global: false,
        support: false,
        search: false,
      },
      toast: {
        visible: false,
        color: 'orange',
        message: ''
      },
    }
  },
  mounted() {
    // Track page view
    this.$gtag.pageview({
      page_path: this.$route.path
    });
  },
  metaInfo() {
    if (this.$store.state.merchant?.name) {
      return {
        title: 'Store',
        titleTemplate: `%s • ${ this.$store.state.merchant.name }`
      }
    } else {
      return null
    }
  },

  created() {
    window.addEventListener('resize', () => this.setVH());
    this.$bus.$on('modal', (view) => this.showView(view));
    this.$bus.$on('toast', ({ message, color }) => this.showToast(message, color));
  },
  methods: {
    setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${ vh }px`);
    },
    showToast(message, color = 'red') {
      this.toast.visible = true;
      this.toast.message = message;
      this.toast.color = color
      setTimeout(() => {
        this.toast = { visible: false, message: '', color: '' }
      }, 5000);
    },
  },
  computed: {
    theme_color() {
      return this.$store.state.merchant.theme_color;
    },
    template() {
      return this.$store.getters['merchant/template'];
    }
  },
  watch: {
    theme_color(theme_color) {
      if (theme_color && theme_color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
        this.$vuetify.theme.themes.light.primary = theme_color;
        this.$vuetify.theme.themes.dark.primary = theme_color;
      }
    }
  }
}
</script>

<style lang="scss">
@import "assets/global";

.v-main, main {
    background: white;
  /* @media (max-width: 960px) {
    background: rgb(236, 239, 241);
  } */
}

.router{
margin-top: 6rem;
}


.boxed {
  .nav-spacing {
    padding-top: 90px;
  }
}

.venedor {
  .nav-spacing {
    padding-top: 120px;
  }
}
</style>
