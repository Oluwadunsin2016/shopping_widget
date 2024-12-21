<template>
  <div class="min-screen-height d-flex flex-column">
    <InstoreOrderTemplateNav absolute dark />
    <div
      class="rounded-lg position-relative overlay top-card white--text"
      :style="{ backgroundImage: `url(${banners[0]})` }"
    >
      <div class="absolute left center-y" style="z-index: 3;">
        <div class="container pt-10">
          <h2
            class="ma-0"
            style="font-size: 3rem; line-height: 3.5rem; width: 250px"
          >
            {{ getHeading() }}
          </h2>
          <v-btn
            @click="$bus.$emit('modal', 'options')"
            color="primary"
            elevation="0"
            class="mt-8"
          >
            Shop
            <v-icon class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
      <svg
        fill="#E3F2FD"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180.55 92"
        class="absolute bottom"
        style="transform: translateY(40px)"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="Layer_2-2" data-name="Layer 2">
              <g id="Layer_1-2-2" data-name="Layer 1-2">
                <path d="M180.55,0C54.72,118,0,51,0,51V92l180.55-3Z" />
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div class="lines">
        <img src="/img/svg/lines-2.svg" alt="" />
      </div>
      <div class="triangle">
        <img src="img/triangle.svg" alt="" />
      </div>
    </div>
    <div class="pt-5 bg-position blue lighten-5 flex-grow-1 py-3">
      <p
        style="font-size: 20px; width: 250px; padding: 1rem"
        class="mb-5 text-cc-dark"
      >
        Items sold by {{ $store.state.merchant.name }}
      </p>
      <InstoreOrderPictures />
    </div>
    <v-btn
      @click="
        $bus.$emit('options')
        $router.push(`/${$store.state.merchant.slug}/collections`)
      "
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

.text-white {
  color: #fff;
}

.top-card {
  background-size: cover;
  background-position: center;
  height: 450px;
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
