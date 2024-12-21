<template>
  <v-container class="pb-12">
    <v-row>
      <v-col class="hidden-md-and-down" cols="3">
        <div class="py-1 fill-height">
          <v-card class="fill-height" max-height="456px" outlined>
            <v-card-text class="pa-0 fill-height">
              <BannerCategories/>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="pa-0 py-md-3" cols="12" lg="9">
        <v-carousel
          :continuous="false"
          :height="$vuetify.breakpoint.mdAndUp ? 458 : 350"
          :interval="5000"
          class="p-0"
          :hide-delimiters="slides.length < 2 || $vuetify.breakpoint.mdAndDown"
          hide-delimiter-background
          v-model="current"
          :touchless="$vuetify.breakpoint.mdAndDown"
        >
          <v-carousel-item :key="slide.id" v-for="slide in slides">
            <v-card class="fill-height pa-0 overflow-hidden">
              <v-img :gradient="slide.title ? 'to right, rgba(0,0,0,.5), rgba(0,0,0,.3)' : ''" :src="slide.image"
                     class="fill-width fill-height d-block"></v-img>
              <v-card-text class="d-flex justify-space-between align-center fill-height absolute left center-y px-2 px-md-5">
                <v-slide-y-transition mode="in-out" v-if="slide.title">
                  <div class="pa-5 pa-md-10 banner-text rounded-lg">
                    <div class="banner-title text-h5 text-md-h4 white--text font-weight-bold">{{ slide.title}}</div>
                    <div class="text-title-md white--text mt-5" v-if="slide.subtitle && slide.subtitle !== 'null'">{{ slide.subtitle}}</div>
                    <v-btn :to="`/${$store.state.merchant.slug}/collections`" class="mt-6 mt-md-12" elevation="0" outlined>
                      Shop now
                    </v-btn>
                  </div>
                </v-slide-y-transition>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import BannerCategories from "./BannerCategories";

export default {
		name: 'Banner',
		components: { BannerCategories },
		data() {
			return {
				current: 0,
				show: {
					0: false,
					1: false,
					2: false
				},
				merchant: this.$store.state.merchant,
			}
		},
		computed: {
			slides() {
				return this.$store.getters['merchant/theme'].banner_slides;
			}
		},
	}
</script>

<style lang="scss" scoped>
  .banner-text {
    min-width: 300px;
    max-width: 700px;
    width: fit-content;
  }

  ::v-deep {
    .v-responsive__content {
      padding: 0 !important;
    }

    .v-window__prev, .v-window__next {
      z-index: 5;
      top: initial;
      bottom: 15px;
    }
  }
</style>
