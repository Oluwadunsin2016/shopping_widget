<template>
  <div class="min-screen-height d-flex flex-column">
    <div class="white lighten-5 pb-8 position-relative pb-90">
      <InstoreOrderTemplateNav dark />
      <div
        style="z-index: 2"
        class="container position-relative overflow-hidden"
      >
        <v-icon
          size="200"
          style="position: absolute; right: -25%; top: 0; opacity: 0.6"
          >mdi-cart</v-icon
        >
        <h1
          style="
            color: #fff;
            font-size: 3rem;
            line-height: 3.5rem;
            width: 250px;
          "
        >
          {{ getHeading() }}
        </h1>
        <p style="font-size: 18px; width: 250px; color: #fff" class="mt-4">
          500+ products sold by {{ $store.state.merchant.name }}
        </p>
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          color="primary"
          elevation="0"
          class="mt-2"
          large
        >
          Start shopping
        </v-btn>
      </div>
      <div class="curve">
        <img src="/img/svg/long-curve-2.svg" alt="" />
      </div>
      <div
        class="bg-wallpaper overlay"
        :style="{ backgroundImage: `url(${banners[0]})` }"
      ></div>
    </div>
    <div class="bg-dark flex-grow-1 border-top position-relative">
      <div class="py-2">
        <InstoreOrderPictures />
      </div>
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
import InstoreOrderPictures from './InstoreOrderPictures.vue'
import InstoreOrderTemplateNav from '@/components/templates/InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'

export default {
  name: 'InstoreOrderTemplate2',
  components: {
    InstoreOrderTemplateNav,
    InstoreOrderPictures,
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
$color-cc: #fb8627;
$color-cc-dark: #172336;

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.text-dark {
  color: #000;
}

.pb-90 {
  padding-bottom: 90px !important;
}

.curve {
  position: absolute;
  bottom: -1rem;
  width: 100%;
  z-index: 2;
}

.bg-dark {
  background: #030a21 !important;
}

.bg-wallpaper {
  background: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%));
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  top: 0;
}

.sidebar {
  padding-top: 6rem;
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

.animation-style {
  position: absolute;
  bottom: 0;
  width: 15px;
}

.one {
  right: 75%;
  bottom: 25%;
  z-index: -11;
}

.two {
  left: 15%;
  top: 43%;
  z-index: -11;
}

.three {
  left: 49%;
  top: 22%;
  z-index: -11;
}

.four {
  right: 10%;
  top: 3%;
  z-index: -11;
}

.five {
  left: 70%;
  top: 62%;
  z-index: -11;
}

.scale {
  animation-duration: 2s;
  -webkit-animation: scale 2s alternate infinite;
}

@-webkit-keyframes scale {
  0% {
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
  }

  100% {
    transform: scale(1.08);
    -webkit-transform: scale(1.08);
  }
}

.veritcal {
  animation-name: veritcal;
  animation-timing-function: linear;
  animation-duration: 12s;
  animation-iteration-count: infinite;
}

@keyframes veritcal {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}

.merchant-links {
  min-height: 28vh !important;
}

@media only screen and (min-width: 390px) and (max-width: 600px) {
  .merchant-links {
    min-height: 38vh !important;
  }
}

@media only screen and (min-width: 300px) and (max-width: 376px) {
  .merchant-links {
    min-height: 22vh !important;
  }
}

@media only screen and (max-width: 300px) {
  .merchant-links {
    min-height: 20vh !important;
  }
}
</style>
