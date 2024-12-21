<template>
  <swiper :options="swiperOptions" ref="el">
    <template v-for="item in items">
      <swiper-slide :key="item.id">
        <ItemCardSquare :value="item"/>
      </swiper-slide>
    </template>
    <swiper-slide>
      <ItemCardViewMore/>
    </swiper-slide>
  </swiper>
</template>

<script>
	import ItemCardSquare from "./ItemCardSquare";
	import ItemCardViewMore from "./ItemCardViewMore";

	export default {
		name: "ItemCardSquareSlider",
		components: { ItemCardViewMore, ItemCardSquare },
		props: {
			items: {
				type: Array,
				required: true
			},
			columns: {
				type: Number,
				default: 4
			},
			gap: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
				swiperOptions: {
					slidesPerView: 1.5,
					spaceBetween: this.gap,
					breakpoints: {
						640: {
							slidesPerView: 2.5
						},
						700: {
							slidesPerView: 3.5
						},
						900: {
							slidesPerView: this.columns
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
