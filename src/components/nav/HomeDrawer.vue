<template>
  <div>
    <v-app-bar color="transparent" elevation="0" fixed height="90" max-height="90">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn @click="() => { this.drawer = false; this.views.whatsapp = true }" icon>
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
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

      <v-list nav dense>
        <v-list-item-group active-class="deep-blue--text text--accent-4">
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

          <v-subheader class="px-5 mt-5">Merchant</v-subheader>

          <v-list-item :to="`/${$store.state.merchant.slug}/collections`" active-class="lighten-5 orange" class="py-2"
                       color="orange" v-if="!$route.path.match(/\/merchant\/catalogue/)">
            <v-list-item-icon class="pl-3">
              <v-icon color="orange" size="22">mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Enter store</v-list-item-title>
          </v-list-item>

          <v-list-item @click="() => { this.drawer = false; this.views.whatsapp = true }" class="py-2" color="green">
            <v-list-item-icon class="pl-3">
              <v-icon color="green" size="22">mdi-whatsapp</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-small">Chat with merchant</v-list-item-title>
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
import Whatsapp from "./Whatsapp";
import Referral from "../referral/Referral";

export default {
		name: "HomeDrawer",
		components: { Referral, Whatsapp, About },
		data() {
			return {
				drawer: false,
				request: this.$store.state.request,
				merchant: this.$store.state.merchant,
				views: {
					about: false,
					whatsapp: false,
					referral: false
				}
			};
		},
	}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .theme--light.v-app-bar.v-toolbar.v-sheet {
      background-color: #f9f9f9;
    }
  }
</style>
