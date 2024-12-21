<template>
  <div class="min-screen-height bg-cc-light">
    <InstoreOrderTemplateNav :absolute="false" />
    <div class="pt-3 pb-3 px-5">
      <p
        style="font-size: 3rem; line-height: 3.5rem; width: 250px"
        class="text-white mb-5 font-weight-bold"
      >
        {{ getHeading() }}
      </p>
    </div>
    <div class="position-relative pb-10rem">
      <div class="bg-clipart">
        <img :src="images[0]" alt="" />
      </div>
      <div class="bg-light-orange">
        <p class="font-18 mb-5 text-cc-dark">
          Over 500+ items sold by {{ $store.state.merchant.name }}
        </p>
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          elevation="0"
          dark
          class="primary"
        >
          Shop now
          <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="px-4 pb-5 d-flex justify-space-between align-center">
      <p class="text-white mb-0 font-15">
        More from {{ $store.state.merchant.name }}
      </p>
      <v-icon color="#fff">mdi-arrow-right</v-icon>
    </div>
    <div
      style="margin-top: -1rem"
      class="bg-dark flex-grow-1 py-6 position-relative"
    >
      <div class="container">
        <v-row dense>
          <v-col v-for="i in 3" :key="i" cols="4">
            <div class="border rounded-lg white">
              <v-img :aspect-ratio="4 / 5" :src="images[i]" contain />
            </div>
          </v-col>
        </v-row>
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
  },
}
</script>

<style lang="scss" scoped>
$color-cc: #fb8627;
$color-cc-dark: #172336;
$color-cc-light: #758398;

.bg-cc-light {
  background-color: $color-cc-light;
}

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.font-20 {
  font-size: 20px;
}

.font-30 {
  font-size: 30px;
}

.font-18 {
  font-size: 18px;
}

.mb-40 {
  margin-bottom: 40px;
}

.font-15 {
  font-size: 15px;
}

.image {
  z-index: 2;
  position: relative;

  img {
    width: 100%;
  }
}

.bg-white {
  background-color: #fff;
}

img {
  width: 100%;
}

.mt-50 {
  margin-top: 50px;
}

.w-100 {
  width: 100%;
}

.bg-grey {
  background: #f1eeee;
  height: 370px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.circle {
  width: 200px;
  height: 200px;
  position: absolute;
  background: #fb8627;
  right: 20%;
  border-radius: 50%;
  bottom: 21%;
  z-index: -1;
}

.bg-clipart {
  background: url(/img/bg-clipart.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  height: 290px;
  padding: 2rem;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;

  img {
    width: 90%;
    height: 100%;
    object-fit: contain;
  }
}

.bg-light-orange {
  top: 5rem;
  background: #f8bd8e;
  position: absolute;
  z-index: 1;
  width: 300px;
  border-radius: 34px;
  right: 0;
  padding: 220px 1rem 1.5rem;
}

.pt-90 {
  padding-top: 90px;
}

.text-white {
  color: #fff;
}

.position-relative {
  position: relative;
}

.pb-10rem {
  padding-bottom: 10rem;
}

.item-card {
  border-radius: 12px;
  padding: 1rem;
  height: 120px;
  background-size: cover;
  background: #f5f5f482;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
