<template>
  <v-app-bar
    :class="transparent ? 'custom-bg' : ''"
    :dark="transparent"
    absolute
    elevation="0"
    height="90"
    max-height="90"
  >
    <v-btn icon @click="$router.push(`/request/${request.slug}`)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="nav-title" v-if="title">
      <v-toolbar-title class="blue-grey--text text--darken-3">{{ title }}</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn :href="merchant.whatsapp_link" class="ml-2" icon target="_blank">
      <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
	export default {
		name: "RequestNav",
		props: {
			transparent: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			}
		},
		data() {
			return {
				merchant: this.$store.state.merchant,
				request: this.$store.state.request
			};
		},
	}
</script>

<style lang="scss" scoped>
  ::v-deep {
    :not(.custom-bg) {
      .v-toolbar__content {
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);
      }
    }
  }

  .custom-bg {
    background: transparent linear-gradient(to bottom, black, transparent) !important;
  }
</style>
