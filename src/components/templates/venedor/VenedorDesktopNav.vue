<template>
  <div>
    <div style="position:fixed;top: 0;left: 0;z-index: 6;width: 100%">
      <v-app-bar
        :class="{ scrolled: scrolled }" class="nav-background-on-scroll" color="white" elevation="0"
        height="80" max-height="80"
      >
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
          <div class="position-relative">
            <v-slide-y-transition hide-on-leave leave-absolute>
              <SearchItems v-if="!scrolled"/>
            </v-slide-y-transition>
            <v-slide-y-transition hide-on-leave leave-absolute>
              <template v-if="scrolled">
                <div>
                  <router-link :to="`/${$store.state.merchant.slug}`" class="link-dark" exact>
                    Home
                  </router-link>
                  <router-link :to="`/${$store.state.merchant.slug}/collections`" class="link-dark">
                    Collections
                  </router-link>
                  <a @click="views.order = true" class="link-dark" href="#">
                    Order
                  </a>
                  <v-menu v-if="request.id" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <a v-bind="attrs" v-on="on" class="link-dark">Orders</a>
                    </template>
                    <v-list>
                      <v-list-item @click="$router.push(`/request/${request.slug}`)">
                        <v-list-item-title>Current order</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="$router.push(`/request/${request.slug}/all`)">
                        <v-list-item-title>All orders</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
            </v-slide-y-transition>
          </div>
          <v-spacer></v-spacer>
          <div :class="{ 'visible': search }" class="search-box px-5">
            <SearchItems/>
          </div>
          <v-slide-y-transition leave-absolute>
            <v-btn v-if="scrolled" class="ml-1" color="grey darken-3" icon text @click="search = !search">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-slide-y-transition>
          <v-btn @click="() => { this.views.about = true }" class="ml-1" color="grey darken-3" icon text>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
          <v-btn @click="$store.dispatch('cart/show')" color="black" icon>
            <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </v-app-bar>

      <div :class="{hidden: scrolled}" class="nav-bottom">
        <v-container class="d-flex align-center justify-center py-0">
          <router-link :to="`/${$store.state.merchant.slug}`" class="link" exact>Home</router-link>
          <router-link :to="`/${$store.state.merchant.slug}/collections`" class="link">Collections</router-link>
          <a @click="$bus.$emit('modal', 'order')" class="link" href="#">
            Order
          </a>
          <v-menu offset-y v-if="request.id">
            <template v-slot:activator="{ on, attrs }">
              <a class="link" v-bind="attrs" v-on="on">Orders</a>
            </template>
            <v-list>
              <v-list-item @click="$router.push(`/request/${request.slug}`)">
                <v-list-item-title>Current order</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$router.push(`/request/${request.slug}/all`)">
                <v-list-item-title>All orders</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </div>
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
import About from "../../../views/About";
import SearchItems from "../../SearchItems";
import Referral from "../../referral/Referral";
import Whatsapp from "../../nav/Whatsapp";
import nav from "@/mixins/nav";

export default {
  name: "VenedorDesktopNav",
  components: { Whatsapp, Referral, SearchItems, About },
  mixins: [nav]
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-toolbar__content {
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

.link {
  letter-spacing: .9px;
  text-decoration: none;
  margin: 0 15px;
  padding: 7px 0 6px;
  color: var(--v-accent-lighten5);

  &.router-link-active {
    border-bottom: 3px solid var(--v-accent-lighten5);
  }
}

.nav-bottom {
  background: var(--v-primary-darken1);
  height: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  transition: all .1s ease;
  overflow: hidden;

  &.hidden {
    height: 0;
  }
}


.link-dark {
  letter-spacing: .9px;
  text-decoration: none;
  color: #2e3c55;
  margin: 0 15px;
  padding: 5px 0;

  &.router-link-active {
    border-bottom: 3px solid var(--v-primary-base);
  }
}
</style>
