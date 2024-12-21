<template>
  <div>
    <v-container>
      <swiper :options="swiperOptions" ref="el">
        <template v-for="(image, i) in images">
          <swiper-slide :key="i">
            <v-card
              class="position-relative flex-grow-1 rounded-lg d-flex flex-column mb-2 item-card" light
              style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
            >
              <v-img
                :aspect-ratio="4/4" :src="image" width="100%" @click="$emit('click', $event)"
                class="ma-0 fill-height rounded-lg" contain
              />
              <v-divider></v-divider>
            </v-card>
          </swiper-slide>
        </template>
      </swiper>
    </v-container>
  </div>
</template>
<script>

export default {
  name: 'InstoreOrderPictures',
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
            slidesPerView: 2.5
          },
          900: {
            slidesPerView: 2.2
          }
        }
      }
    }
  },
  computed: {
    images() {
      return this.$store.getters['merchant/images']
    }
  }
}
</script>
