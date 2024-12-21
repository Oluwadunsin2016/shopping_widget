<template>
  <div>
    <v-app-bar
      :absolute="absolute" color="transparent" elevation="0" height="90" max-height="90"
      :class="{ 'appbar-transparent-overlay': dark }" :dark="dark" class="px-0 px-md-4"
    >
      <div class="d-flex align-center fill-width">
        <div class="d-flex align-center font-weight-bold ma-0" style="font-size: 1rem">
          <v-avatar
            @click="drawer = true" color="primary" class="white--text text-uppercase mr-3 cursor-pointer" size="42"
          >
            {{ $store.state.merchant.name.substring(0, 2) }}
          </v-avatar>
          {{ $store.state.merchant.name }}
        </div>
        <v-spacer></v-spacer>
        <v-btn v-if="!hideCart" @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge :content="`${$store.state.cart.items.length}`" color="red" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed left temporary width="250">
      <v-list dense nav rounded>
        <v-list-item class="px-4 pt-4">
          <v-list-item-avatar color="primary" class="white--text text-uppercase mr-3 cursor-pointer" size="42">
            <span>{{ $store.state.merchant.name.substring(0, 2) }}</span>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item class="px-4">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $store.state.merchant.name }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="$store.state.merchant.phone" class="mt-3 text-small">
              <v-icon size="16">mdi-phone</v-icon>
              {{ $store.state.merchant.phone }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-4"></v-divider>
        <v-list-item link class="px-4" :to="`/${this.$store.state.merchant.slug}/collections`">
          <v-list-item-icon class="mr-6">
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Shopping</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link class="px-4 mt-2" :to="`/${this.$store.state.merchant.slug}/pay?m=pay`">
          <v-list-item-icon class="mr-6">
            <v-icon>mdi-credit-card</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Make payment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link class="px-4 mt-2" :to="`/${this.$store.state.merchant.slug}/pay`">
          <v-list-item-icon class="mr-6">
            <v-icon>mdi-file-document-alert-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Bills payment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-if="links.length">
        <v-divider class="my-4"></v-divider>
        <v-subheader class="px-6 mb-3" style="height: initial">Merchant links</v-subheader>
        <v-list dense nav rounded>
          <v-list-item v-for="link in links" :key="link.id" :href="link.link" target="_blank" link class="px-4">
            <v-list-item-icon class="mr-6">
              <v-icon>mdi-link</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">{{ link.caption }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-divider class="my-4"></v-divider>
      <v-subheader class="px-6 mb-4" style="height: initial">Social links</v-subheader>
      <v-container class="mb-4">
        <v-row dense>
          <v-col cols="3">
            <v-btn
              icon large color="blue darken-4"
              :href="$store.state.merchant.facebook" :disabled="!$store.state.merchant.facebook"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              icon large color="blue darken-1" target="_blank"
              :href="$store.state.merchant.twitter" :disabled="!$store.state.merchant.twitter"
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              icon large color="red" target="_blank"
              :href="$store.state.merchant.instagram" :disabled="!$store.state.merchant.instagram"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              icon large color="green" target="_blank"
              :href="$store.state.merchant.whatsapp" :disabled="!$store.state.merchant.whatsapp"
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "InstoreOrderTemplateNav",
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    hideCart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  mounted() {
    if (this.$route.query?.s === 'true') this.drawer = true;
  },
  computed: {
    links() {
      return this.$store.state.merchant.links || [];
    }
  }
}
</script>
