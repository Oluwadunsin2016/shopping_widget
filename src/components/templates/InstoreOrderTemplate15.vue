<template>
  <div style="position: relative" class="min-screen-height bg-white">
    <div
      class="image overlay position-relative"
      :style="{ backgroundImage: `url(${banners[0]})` }"
    >
      <div class="curve fill-width"></div>

      <div class="position-relative" style="z-index: 2">
        <InstoreOrderTemplateNav dark :absolute="false" />
        <div class="px-5 pt-5 pb-120 overflow-hidden">
          <p
            style="font-size: 2.5rem"
            class="w-250 font-30 text-white mb-5 font-weight-bold"
          >
            {{ getHeading() }}
          </p>
          <v-btn
            @click="
              $bus.$emit('options')
              $router.push(`/${$store.state.merchant.slug}/collections`)
            "
            class="pa-8 mt-3 primary"
            elevation="0"
            rounded
            dark
          >
            Shop now
            <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
          </v-btn>
        </div>
        <div class="circle">
          <img src="/img/circle.png" alt="" />
        </div>
        <div class="triangle">
          <img src="/img/triangle.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="px-5 pb-8 details position-relative px-5">
      <p class="w-250 font-20 mb-5 text-cc-dark">
        items sold by {{ $store.state.merchant.name }}
      </p>
      <swiper :options="swiperOptions" ref="el">
        <template v-for="i in 6">
          <swiper-slide :key="i">
            <div class="mt-50">
              <div class="item-card">
                <img :src="images[i]" alt="" />
              </div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>

<script>
import InstoreOrderTemplateNav from './InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'

export default {
  components: {
    InstoreOrderTemplateNav,
  },
  data() {
    return {
      theme: this.$store.getters['merchant/theme'],
      swiperOptions: {
        loop: true,
        slidesPerView: 1.8,
        spaceBetween: 20,
        autoplay: { delay: 0, disableOnInteraction: false },
        breakpoints: {
          470: { slidesPerView: 1.5, spaceBetween: 1.5 },
          760: { slidesPerView: 2.5, spaceBetween: 20 },
          1100: { slidesPerView: 2.5, spaceBetween: 20 },
        },
        speed: 10000,
      },
    }
  },
  methods: {
    getHeading() {
      const headings = this.$store.getters['merchant/headings']
      return headings[getRandomIntInclusive(1, headings.length - 1)]
    },
  },
  computed: {
    images() {
      return this.$store.getters['merchant/images']
    },
    banners() {
      return this.$store.getters['merchant/banners']
    },
  },
}
</script>

<style lang="scss" scoped>
$color-cc: #fb8627;
$color-cc-dark: #172336;
$color-cc-light: #758398;

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.text-white {
  color: #fff;
}

.bg-cc {
  background-color: $color-cc;
}

.bg-cc-dark {
  background-color: $color-cc-dark;
}

.bg-white {
  background-color: #fff;
}

.pb-120 {
  padding-bottom: 120px !important;
}

.font-30 {
  font-size: 30px;
}

.font-20 {
  font-size: 20px;
}

.font-18 {
  font-size: 18px;
}

.w-250 {
  width: 250px;
}

.w-300 {
  width: 300px;
}

.bg-gray {
  background-color: #f5f5f4;
}

.image {
  background: linear-gradient(rgb(2 16 38 / 70%), rgb(0 0 0 / 70%));
  min-height: 470px;
  background-size: cover;
  position: relative;
  z-index: 1;
}

.curve {
  min-height: 250px;
  background: url(/img/svg/downhill-curve.svg);
  width: 420px;
  background-size: cover;
  position: absolute;
  bottom: -4rem;
}

.curve-two {
  border-top-right-radius: 30%;
  height: 300px;
}

.circle {
  position: absolute;
  right: 1rem;
  bottom: 12rem;
  transition: linear;
  animation: spin 4s linear infinite;

  img {
    width: 80px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes reverse-spin {
  to {
    transform: rotate(-360deg);
  }
}

.triangle {
  position: absolute;
  top: 6rem;
  right: 2rem;
  animation: reverse-spin 5s linear infinite;

  img {
    width: 50px;
  }
}

.position-relative {
  position: relative;
}

.item-card {
  border-radius: 15px;
  padding: 2rem;
  height: 200px;
  background: #d2d2d24d;

  img {
    width: 100%;
    height: 100%;
  }
}

.details {
  z-index: 2;
  margin-top: -2rem;
  overflow: hidden;
}

@media only screen and (min-width: 470px) {
  .curve {
    min-height: 290px;
    width: 100%;
    background-size: cover;
    position: absolute;
    bottom: -4rem;
  }
}
</style>
