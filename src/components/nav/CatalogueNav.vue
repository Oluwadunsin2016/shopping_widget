<template>
  <div>
    <v-app-bar elevation="0" fixed height="90" max-height="90">
      <div class="container d-flex pa-0">

        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <div class="nav-title mt-2">
          <v-toolbar-title>{{ merchant.name }}</v-toolbar-title>
          <div class="text-small mt-1">{{ merchant.phone }}</div>
        </div>

        <v-spacer></v-spacer>

        <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>

        <v-btn @click="views.whatsapp = true" icon>
          <v-icon color="green">mdi-whatsapp</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer fixed temporary v-model="drawer" width="300px">
      <template v-slot:prepend>
        <v-card class="d-flex flex-column justify-end pa-4 pb-6 rounded-0" elevation="0" height="150px">
          <div class="d-flex align-center">
            <v-avatar>
              <img :src="merchant.picture" alt="user">
            </v-avatar>
            <div class="ml-2">
              <div class="text-title-md grey--text text--darken-3">{{ merchant.name }}</div>
              <div class="text-title-md grey--text text--darken-1">{{ merchant.phone }}</div>
            </div>
          </div>
        </v-card>
      </template>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group active-class="deep-blue--text text--accent-4">
          <v-list-item :to="`/${$store.state.merchant.slug}`" active-class="lighten-5 blue" class="py-2" color="blue">
            <v-list-item-icon class="pl-3">
              <v-icon color="blue" size="22">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Home</v-list-item-title>
          </v-list-item>

          <v-list-item :to="`/${$store.state.merchant.slug}/collections`" active-class="lighten-5 orange" class="py-2" color="orange">
            <v-list-item-icon class="pl-3">
              <v-icon color="orange" size="22">mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Collection</v-list-item-title>
          </v-list-item>

          <v-list-item :to="`/${catalogue.slug}/catalogue/`" active-class="lighten-5 blue" class="py-2" color="blue"
                       v-if="catalogue.id && $route.name !== 'catalogue'">
            <v-list-item-icon class="pl-3">
              <v-icon color="blue" size="22">mdi-apps</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Back to catalogue</v-list-item-title>
          </v-list-item>

          <v-list-item @click="() => { this.drawer = false; this.views.whatsapp = true }" class="py-2" color="green"
                       target="_blank">
            <v-list-item-icon class="pl-3">
              <v-icon color="green" size="22">mdi-whatsapp</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Whatsapp</v-list-item-title>
          </v-list-item>

          <v-list-item @click="() => { this.drawer = false; this.views.about = true }" class="py-2" color="teal">
            <v-list-item-icon class="pl-3">
              <v-icon color="teal" size="22">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">About merchant</v-list-item-title>
          </v-list-item>

          <v-list-item @click="() => { this.drawer = false; this.views.referral = true }" class="py-2" color="red">
            <v-list-item-icon class="pl-3">
              <v-icon color="red" size="22">mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Make 100k from referral</v-list-item-title>
          </v-list-item>

          <template v-if="request.id">
            <v-subheader class="px-5 mt-5">Request</v-subheader>

            <v-list-item class="py-2" color="teal" @click="$router.push(`/request/${request.slug}`)">
              <v-list-item-icon class="pl-3">
                <v-icon color="teal" small>mdi-file-document</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-small">Current request</v-list-item-title>
            </v-list-item>

            <v-list-item class="py-2" color="red" @click="$router.push(`/request/${request.slug}/all`)">
              <v-list-item-icon class="pl-3">
                <v-icon color="red" small>mdi-clipboard-list</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-small">Active requests</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-sheet inset max-width="500" v-model="views.about">
      <About @close="views = { ...views, about: false }"/>
    </v-bottom-sheet>

    <v-bottom-sheet inset max-width="500" v-model="views.referral">
      <Referral @close="views = { ...views, referral: false }"/>
    </v-bottom-sheet>

    <v-bottom-sheet inset max-width="500" v-model="views.whatsapp">
      <Whatsapp/>
    </v-bottom-sheet>
  </div>
</template>

<script>
import About from "../../views/About";
import Referral from "../referral/Referral";
import Whatsapp from "./Whatsapp";

export default {
		name: "CatalogueNav",
		components: { Whatsapp, Referral, About },
		data() {
			return {
				drawer: false,
				catalogue: this.$store.state.catalogue,
				merchant: this.$store.state.merchant,
				request: this.$store.state.request,
				views: {
					about: false,
					referral: false,
					whatsapp: false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-toolbar__content {
      box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    }

    .v-navigation-drawer--temporary {
      z-index: 300;
    }
  }
</style>
