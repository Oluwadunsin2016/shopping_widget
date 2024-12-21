<template>
  <div class="min-screen-height bg-white">
    <InstoreOrderTemplateNav :absolute="false" />
    <div class="pb-5 px-5">
      <p class="font-25 text-cc-dark mb-1 font-weight-bold">
        {{ getHeading() }}
      </p>
      <p style="font-size: 1rem" class="text-cc-dark mt-2">
        Over 500+ items sold by {{ $store.state.merchant.name }}
      </p>
      <div class="d-flex justify-content-space-between mt-10">
        <div class="image-card">
          <img style="height: 200px" :src="banners[0]" alt="" />
          <div
            class="icon"
            @click="
              $bus.$emit('options')
              $router.push(`/${$store.state.merchant.slug}/collections`)
            "
          >
            <v-icon color="#000">mdi-arrow-right</v-icon>
          </div>
        </div>
      </div>
      <div class="py-8">
        <swiper :options="swiperOptions" ref="el">
          <template v-for="i in 6">
            <swiper-slide :key="i">
              <v-img
                :src="images[i]"
                alt=""
                :aspect-ratio="1"
                contain
                class="border rounded-lg mb-1"
              />
            </swiper-slide>
          </template>
        </swiper>
      </div>
      <div class="mt-5">
        <v-btn
          @click="$bus.$emit('modal', 'options')"
          class="py-6 primary"
          block
          large
          elevation="0"
          rounded
          dark
        >
          Shop now
          <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
        </v-btn>
      </div>
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
          760: { slidesPerView: 2, spaceBetween: 20 },
          1100: { slidesPerView: 2, spaceBetween: 20 },
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

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.font-20 {
  font-size: 20px;
}

.font-25 {
  font-size: 25px;
}

.font-18 {
  font-size: 18px;
}

.font-15 {
  font-size: 15px;
}

.image-card {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;
  height: 200px;

  img {
    height: 100%;
    object-fit: cover;
  }
}

.icon {
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e1e1e1;
  }
}

.bg-white {
  background-color: #fff;
}

.bg-light-blue {
  background-color: #f5f5f9;
}

.item-card {
  border-radius: 12px;
  padding: 2rem;
  height: 260px;
  background-size: cover;
  background: #d2d2d24d;

  img {
    width: 100%;
    height: 100%;
  }
}

.mt-50 {
  margin-top: 50px;
}

.w-100 {
  width: 100%;
}
</style>
