<template>
  <div style="position: relative" class="bg-dark min-screen-height">
    <InstoreOrderTemplateNav dark :absolute="false" />
    <div class="line">
      <img src="/img/svg/lines-1.svg" alt="" />
    </div>
    <div class="twist">
      <img src="/img/svg/twist.svg" alt="" />
    </div>
    <div class="arrow">
      <img src="/img/svg/curved-arow.svg" alt="" />
    </div>
    <div class="px-4 d-flex justify-space-between">
      <div class="box-container">
        <div
          class="box-one"
          :style="{ backgroundImage: `url(${banners[0]})` }"
        ></div>
        <div
          class="box-two"
          :style="{ backgroundImage: `url(${banners[1]})` }"
        ></div>
      </div>
      <div class="box-container">
        <div
          class="box-three"
          :style="{ backgroundImage: `url(${banners[2]})` }"
        ></div>
        <div
          class="box-four"
          :style="{ backgroundImage: `url(${banners[3]})` }"
        ></div>
      </div>
    </div>
    <div class="bg-dark" style="padding: 2rem">
      <p class="text-block">{{ getHeading() }}</p>
      <v-btn
        @click="
          $bus.$emit('options')
          $router.push(`/${$store.state.merchant.slug}/collections`)
        "
        class="pa-8 mt-4 primary"
        elevation="0"
        dark
      >
        Shop now
        <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
      </v-btn>
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
    banners() {
      return this.$store.getters['merchant/banners']
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-dark {
  background-color: #030a21;
}

.box-one {
  background-image: linear-gradient(rgb(11 24 61 / 50%), rgb(9 13 40 / 50%));
  height: 215px;
  width: 100%;
  border-radius: 50px 0 50px 0;
  margin-bottom: 1rem;
  background-size: cover;
  border: 1px solid #fff;
  background-position: center;
  position: relative;
}

.box-two {
  background-image: linear-gradient(rgb(11 24 61 / 50%), rgb(9 13 40 / 50%));
  height: 180px;
  width: 100%;
  border-radius: 50px 0 50px 0;
  background-size: cover;
  border: 1px solid #fff;
  background-position: center;
  position: relative;
}

.box-three {
  background-image: linear-gradient(rgb(11 24 61 / 50%), rgb(9 13 40 / 50%));
  height: 143px;
  width: 100%;
  border-radius: 60px 60px 60px 0;
  margin-bottom: 1rem;
  background-size: cover;
  border: 1px solid #fff;
  background-position: center;
  position: relative;
}

.box-four {
  background-image: linear-gradient(rgb(11 24 61 / 50%), rgb(9 13 40 / 50%));
  height: 250px;
  width: 100%;
  border-radius: 50px 0 50px 0;
  background-size: cover;
  border: 1px solid #fff;
  background-position: center;
  position: relative;
}

.box-container {
  width: 100%;
  margin: 1rem;
}

.text-block {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  -webkit-background-clip: text;
  font-family: Khand, sans-serif;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  width: 250px;
  line-height: 3.5rem;
}

.line {
  position: absolute;
  height: 200px;
  width: 200px;
  top: 6rem;
  left: 0.5rem;

  img {
    width: 40px;
  }
}

.twist {
  img {
    width: 100px;
    transform: rotate(339deg);
    position: absolute;
    bottom: 14rem;
    right: 2rem;
  }
}

.arrow {
  img {
    width: 115px;
    position: absolute;
    border: 6rem;
    top: 32rem;
    right: 0rem;
  }
}
</style>
