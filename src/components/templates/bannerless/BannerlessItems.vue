<template>
  <v-container class="position-relative">
    <v-chip class="mb-3 absolute left top mt-5 ml-5" color="primary" small style="z-index: 10" v-if="swiper">
      <span v-if="swiper.activeIndex >= [...deals, ...best_sellers].length">New arrivals</span>
      <span v-else-if="swiper.activeIndex >= [...deals].length">Best sellers</span>
      <span v-else-if="swiper.activeIndex >= 0">Deals of the day</span>
    </v-chip>
    <swiper :options="swiperOptions" ref="el">
      <template v-for="(item) in deals">
        <swiper-slide :key="item.id + 'deals'">
          <ItemCardSquare :value="item"/>
        </swiper-slide>
      </template>
      <template v-for="(item) in best_sellers">
        <swiper-slide :key="item.id + 'best_sellers'">
          <ItemCardSquare :value="item"/>
        </swiper-slide>
      </template>
      <template v-for="(item) in new_arrivals">
        <swiper-slide :key="item.id + 'new_arrivals'">
          <ItemCardSquare :value="item"/>
        </swiper-slide>
      </template>
      <swiper-slide>
        <ItemCardViewMore/>
      </swiper-slide>
    </swiper>
  </v-container>
</template>

<script>
	import ItemCardViewMore from "../elements/ItemCardViewMore";
	import ItemCardSquare from "../elements/ItemCardSquare";

	export default {
		name: "BannerlessItems",
		components: { ItemCardSquare, ItemCardViewMore },
		data() {
			return {
				swiperOptions: {
					slidesPerView: 1.2,
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
				},
				swiper: null
			}
		},
		mounted() {
			this.swiper = this.$refs.el?.$swiper
		},
		computed: {
			deals() {
				return this.$store.state.global.best_deals
			},
			best_sellers() {
				return this.$store.state.global.best_seller;
			},
			new_arrivals() {
				return this.$store.state.global.new_arrivals;
			},
		}
	}
</script>
