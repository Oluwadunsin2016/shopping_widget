<template>
  <div class="py-5 py-md-10 overflow-hidden">
    <v-container>
      <v-card class="features py-5 mb-10 overflow-visible" elevation="0" outlined>
        <swiper :options="swiperOptions" class="fill-width" ref="el">
          <swiper-slide>
            <div class="d-flex align-center flex-column justify-center py-4">
              <v-icon class="mb-3" color="orange" size="40">mdi-credit-card-clock-outline</v-icon>
              Make an easy payment now
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="d-flex align-center flex-column justify-center py-4">
              <v-icon class="mb-3" color="blue" size="40">mdi-hours-24</v-icon>
              24/7 support
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="d-flex align-center flex-column justify-center py-4">
              <v-icon class="mb-3" color="teal" size="40">mdi-whatsapp</v-icon>
              {{ $store.state.merchant.phone}}
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="d-flex align-center flex-column justify-center py-4">
              <v-icon class="mb-3" color="red" size="40">mdi-lock-check</v-icon>
              Secure checkout
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" v-if="$vuetify.breakpoint.smAndDown"></div>
        </swiper>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	export default {
		name: 'Features',
		data() {
			return {
				swiperOptions: {
					pagination: {
						el: '.swiper-pagination'
					},
					slidesPerView: 2,
					spaceBetween: 20,
					breakpoints: {
						640: {
							slidesPerView: 4
						},
						700: {
							slidesPerView: 4
						},
						900: {
							slidesPerView: 4
						}
					}
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.el.$swiper
			}
		}
	}
</script>

<style lang="scss" scoped>
  .features {
    background-color: #fbfbfb;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233f77d2' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-repeat: repeat;
  }

  ::v-deep {
    .swiper-container {
      overflow: visible;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: -60px;
    }

    .swiper-pagination-bullet-active {
      background: var(--v-primary-base);
    }
  }
</style>
