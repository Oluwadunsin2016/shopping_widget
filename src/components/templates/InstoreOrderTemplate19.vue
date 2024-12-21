<template>
  <div class="min-screen-height d-flex flex-column">
    <InstoreOrderTemplateNav absolute dark />
    <div class="position-relative">
      <div
        class="rounded-lg overlay top-card white--text"
        :style="{ backgroundImage: `url(${banners[0]})` }"
      >
        <div class="curve"></div>
        <div style="z-index: 3; height: 90%;" class="position-relative">
          <div
            style="height: 100%;"
            class="container pt-10 d-flex align-center"
          >
            <h2
              class="ma-0"
              style="font-size: 3rem; line-height: 3.5rem; width: 250px"
            >
              {{ getHeading() }}
            </h2>
          </div>
        </div>
        <div class="lines">
          <img src="/img/svg/lines-2.svg" alt="" />
        </div>
        <div class="triangle">
          <img src="img/triangle.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="pt-5 bg-position bg-cc-dark flex-grow-1 py-3">
      <div style="margin-top: -3rem" class="container">
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          color="primary"
          elevation="0"
          class="mt-8 px-7 py-6 mb-2"
        >
          Shop
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
        <p
          style="font-size: 20px; width: 250px; padding: 1rem 0"
          class="mb-5 text-white"
        >
          Over 500+ items sold by {{ $store.state.merchant.name }}
        </p>
      </div>
      <InstoreOrderPictures />
    </div>
    <v-btn
      @click="$bus.$emit('modal', 'options')"
      large
      fab
      fixed
      bottom
      right
      color="primary"
      elevation="0"
      style="margin-bottom: 90px"
      class="updown-animation"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import InstoreOrderTemplateNav from '@/components/templates/InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'
import InstoreOrderPictures from '@/components/templates/InstoreOrderPictures.vue'

export default {
  name: 'InstoreOrderTemplate3',
  components: { InstoreOrderPictures, InstoreOrderTemplateNav },
  data() {
    return {
      theme: this.$store.getters['merchant/theme'],
      current: 0,
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
$color-cc: #fb8627;
$color-cc-dark: #172336;
$color-cc-light: #758398;

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.text-dark {
  color: #000;
}

.bg-cc-dark {
  background: #030a21;
}

.w-100 {
  width: 100%;
}

.text-white {
  color: #fff;
}

.top-card {
  background-size: cover;
  background-position: center;
  height: 450px;
}

.curve {
  background: url('/img/test-curve.png');
  position: absolute;
  height: 110%;
  width: 100%;
  background-size: cover;
}

.lines {
  position: absolute;
  width: 50px;
  top: 7rem;
  right: 5rem;
  transform: rotate(24deg);
}

.bg-position {
  position: relative;
  z-index: 2;
}

.triangle {
  position: absolute;
  top: 22rem;
  right: 2rem;
  animation: spin 5s linear infinite;
  z-index: 3;

  img {
    width: 60px;
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

.icon {
  width: 50px;
  border-radius: 50%;
}

.link-icon {
  width: 35px;
}

.w-70 {
  width: 70% !important;
}

.absolute.center-y {
  top: 45%;
  transform: translateY(-55%);
}

@media only screen and (max-width: 478px) {
  .top-card {
    background-size: cover;
    background-position: center;
    height: 350px !important;
  }
}
</style>
