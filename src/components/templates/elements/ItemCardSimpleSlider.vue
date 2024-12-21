<template>
  <swiper :options="swiperOptions" ref="el">
    <template v-for="item in items">
      <swiper-slide :key="item.id">
        <ItemCardSimple :value="item"/>
      </swiper-slide>
    </template>
    <swiper-slide>
      <ItemCardViewMore/>
    </swiper-slide>
  </swiper>
</template>

<script>
	import ItemCardSimple from "./ItemCardSimple";
	import ItemCardViewMore from "./ItemCardViewMore";

	export default {
		name: "ItemCardSimpleSlider",
		components: { ItemCardViewMore, ItemCardSimple },
		props: {
			items: {
				type: Array,
				required: true
			},
			columns: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				swiperOptions: {
					slidesPerView: 1.5,
					spaceBetween: 20,
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
