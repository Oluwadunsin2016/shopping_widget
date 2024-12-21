<template>
  <div>
    <div style="position:fixed;top: 0;left: 0;z-index: 5;width: 100%">
      <!--  Mini Nav -->
      <div :class="{ visible: !scrolled }" class="mini-nav d-flex align-center grey darken-4">
        <v-container class="d-flex justify-end align-center">
          <template v-if="merchant.phone">
            <v-btn dark rounded x-small>
              <v-icon left size="13">mdi-phone</v-icon>
              {{ merchant.phone }}
            </v-btn>
            <v-btn class="ml-3" dark rounded x-small @click="() => { this.drawer = false; this.views.whatsapp = true }">
              <v-icon color="green" left size="13">mdi-whatsapp</v-icon>
              {{ merchant.phone }}
            </v-btn>
          </template>
          <v-btn class="ml-auto" dark icon rounded small text>
            <v-icon small>mdi-instagram</v-icon>
          </v-btn>
          <v-btn class="ml-3" dark icon rounded small text>
            <v-icon small>mdi-twitter</v-icon>
          </v-btn>
          <v-btn class="ml-3" dark icon rounded small text>
            <v-icon small>mdi-facebook</v-icon>
          </v-btn>
        </v-container>
      </div>

      <!--  Main Nav -->
      <v-app-bar color="white" elevation="0" height="80" max-height="80">
        <div class="container d-flex align-center position-relative">
          <v-list-item-avatar v-if="merchant.picture" class="mr-2" size="50">
            <img :src="merchant.picture" alt="user">
          </v-list-item-avatar>
          <v-avatar v-else class="d-flex align-center justify-center mr-2" color="grey lighten-4">
            {{ initials(merchant.name) }}
          </v-avatar>
          <div class="nav-title">
            <v-toolbar-title class="grey--text text--darken-3">{{ merchant.name }}</v-toolbar-title>
          </div>

          <v-spacer></v-spacer>

          <v-btn
            :to="`/${$store.state.merchant.slug}`" active-class="primary--text" class="mr-1 font-weight-bold" exact
            rounded text
          >
            Home
          </v-btn>
          <v-btn
            :to="`/${$store.state.merchant.slug}/collections`" active-class="primary--text"
            class="mr-1 font-weight-bold" rounded text
          >
            Collections
          </v-btn>
          <v-btn
            @click="gotoOrder()" active-class="primary--text" class="mr-1 font-weight-bold"
            rounded text
          >
            Order
          </v-btn>

          <v-spacer></v-spacer>

          <div :class="{ 'visible': search }" class="search-box px-5">
            <SearchItems/>
          </div>

          <v-btn @click="search = !search" class="ml-1" color="grey darken-3" icon text>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn
            @click="() => { this.drawer = false; this.views.about = true }" class="ml-1" color="grey darken-3" icon text
          >
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>

          <v-btn @click="$store.dispatch('cart/show')" color="black" icon>
            <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </v-app-bar>
    </div>

    <v-navigation-drawer fixed right temporary v-model="views.about" width="550">
      <About @close="views = { ...views, about: false }"/>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right temporary v-model="views.referral" width="550">
      <Referral @close="views = { ...views, referral: false }"/>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right temporary v-model="views.whatsapp" width="550">
      <Whatsapp/>
    </v-navigation-drawer>
  </div>
</template>

<script>
import About from "@/views/About";
import SearchItems from "@/components/SearchItems";
import Referral from "@/components/referral/Referral";
import Whatsapp from "@/components/nav/Whatsapp";
import nav from "@/mixins/nav";

export default {
  name: "DefaultDesktopNav",
  components: { Whatsapp, Referral, SearchItems, About },
  mixins: [nav],
  methods: {
    gotoOrder() {
      const slug = localStorage.getItem('request') || this.$store.state.request.slug;
      if (slug) this.$router.push(`/request/${ slug }`)
      else this.$bus.$emit('modal', 'order');
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-toolbar__content {
    box-shadow: 0 0 5px rgba(0, 0, 0, .15);
  }

  .v-navigation-drawer--temporary {
    z-index: 300;
  }

  .v-btn__content {
    letter-spacing: 1px;
  }
}

.link {
  text-transform: capitalize;
  letter-spacing: 1px;
}

.v-application .mini-nav {
  height: 0;
  transition: all .15s linear;

  &.visible {
    height: 35px;
  }
}

.search-box {
  position: absolute;
  top: 110%;
  right: 0;
  transition: all .15s ease-in-out;
  transform: translateY(-10px);
  opacity: 0;
  pointer-events: none;

  &.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: initial;
  }
}
</style>
