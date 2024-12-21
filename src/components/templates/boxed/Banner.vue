<template>
  <v-container class="mt-md-5">
    <v-row :dense="$vuetify.breakpoint.mdAndDown">
      <v-col :md="6" :sm="9" class="pt-0" cols="8">
        <v-carousel
          :continuous="false"
          :hide-delimiters="slides.length < 2"
          :interval="5000"
          class="p-0"
          height="100%"
          hide-delimiter-background
          v-model="current"
        >
          <v-carousel-item :key="slide.id" v-for="slide in slides">
            <v-card class="fill-height pa-0 overflow-hidden">
              <ProxyImage :src="slide.image"/>
              <v-card-text class="px-3 px-md-8 d-flex justify-space-between align-center fill-height absolute left center-y">
                <v-slide-y-transition mode="in-out" v-if="slide.title">
                  <v-container>
                    <div class="banner-title text-h5 text-md-h3 white--text font-weight-bold">{{ slide.title }}</div>
                    <div class="text-title-md white--text mt-5" v-if="slide.subtitle && slide.subtitle !== 'null'">{{ slide.subtitle }}</div>
                    <v-btn :to="`/${$store.state.merchant.slug}/collections`" class="mt-6 mt-md-12" color="white" elevation="0" outlined>
                      Shop now
                    </v-btn>
                  </v-container>
                </v-slide-y-transition>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col :md="6" :sm="3" class="py-0" cols="4">
        <v-row :dense="$vuetify.breakpoint.mdAndDown">
          <v-col :key="item.id" :md="6" cols="12" v-for="item in items.slice(1).splice(0, $vuetify.breakpoint.mdAndUp ? 4 : 3)">
            <ItemCardSquare :value="item" v-if="$vuetify.breakpoint.mdAndUp"/>
            <ItemCardPicture :value="item" v-else/>
          </v-col>
          <v-col :key="item.id" :md="6" cols="12" v-for="item in (4 - items.slice(1).splice(0, 4).length)">
            <ItemCardLoading/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	import ItemCardSquare from "../elements/ItemCardSquare";
	import ItemCardLoading from "../elements/ItemCardLoading";
	import ItemCardPicture from "../elements/ItemCardPicture";
	import ProxyImage from "../../ProxyImage";

	export default {
		name: "Banner",
		components: { ProxyImage, ItemCardPicture, ItemCardLoading, ItemCardSquare },
		data() {
			return {
				items: this.$store.state.catalogue.merchantItems,
				current: 0,
				merchant: this.$store.state.merchant,
				selected: {},
				views: {
					add: false
				}
			}
		},
		methods: {
			add(item) {
				this.selected = item;
				this.views.add = true;
			},
		},
		computed: {
			slides() {
				return this.$store.getters['merchant/theme'].banner_slides;
			}
		}
	}
</script>
