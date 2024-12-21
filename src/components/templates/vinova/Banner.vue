<template>
  <div class="banner-wrap pt-md-4">
    <v-container>
      <swiper :options="swiperOptions" ref="el">
        <template v-for="(slide) in slides">
          <swiper-slide :key="slide.id">
            <v-card class="position-relative rounded overflow-hidden" dark elevation="0">
              <v-img
                :aspect-ratio="4/7" :gradient="slide.title ? 'to right, rgba(0,0,0,.5), rgba(0,0,0,.3)' : ''" :src="slide.image"
                class="ma-0 fill-height"
              />
              <div class="d-flex flex-column align-start justify-end text-left mb-3 px-4 absolute top left fill-height fill-width py-8">
                <div class="banner-title text-h5 text-md-h5 font-weight-bold">{{ slide.title}}</div>
                <div class="text-title-md mt-5" v-if="slide.subtitle && slide.subtitle !== 'null'">{{ slide.subtitle}}</div>
                <v-btn :to="`/${$store.state.merchant.slug}/collections`" class="mt-7 px-4" outlined>Shop now</v-btn>
              </div>
            </v-card>
          </swiper-slide>
        </template>
      </swiper>
    </v-container>
  </div>
</template>
<script>
import defaultSlides from '../../../lib/default-slides';

export default {
		name: 'Banner',
		data() {
			return {
				items: this.$store.state.catalogue.merchantItems,
				merchant: this.$store.state.merchant,
				swiperOptions: {
					slidesPerView: 1.5,
					spaceBetween: 10,
					breakpoints: {
						640: {
							slidesPerView: 2.5
						},
						700: {
							slidesPerView: 3.5
						},
						900: {
							slidesPerView: 4
						}
					}
				}
			}
		},
		computed: {
			slides() {
				const slides = this.$store.state.merchant.banner_slides || [];
				let more = [];
				if (slides.length < 4) more = defaultSlides.slice(0, 4 - slides.length)
				return [...slides, ...more]
			},
			swiper() {
				return this.$refs.el.$swiper
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "./src/assets/variables.scss";

  .banner-wrap {
    position: relative;
  }
</style>
