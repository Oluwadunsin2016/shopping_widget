<template>
  <swiper :options="swiperOptions" ref="el">
    <template v-for="item in items">
      <swiper-slide :key="item.id">
        <CategoryCard :tag="item"/>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
	import CategoryCard from "./CategoryCard";

	export default {
		name: "CategoryCardSlider",
		components: { CategoryCard },
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
