<!-- <template>
  <swiper :autoplay="true" :loop="true" :slides-per-view="4" :navigation="true">
    <swiper-slide v-for="(platform, index) in platforms" :key="index">
      <img :src="platform.logo" alt="Platform logo">
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      platforms: Array.from({ length: 100 }, (v, i) => ({ name: `Item ${i + 1}` })), // Add your platform data here
    };
  },
};
</script> -->

<template>
  <h1>This is swiper</h1>
</template>

<script>
export default {

}
</script>

<style>

</style>
