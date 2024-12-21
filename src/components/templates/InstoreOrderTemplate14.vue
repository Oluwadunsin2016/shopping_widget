<template>
  <div
    style="overflow: hidden auto"
    class="min-screen-height bg-gray position-relative"
  >
    <div
      class="image blue-overlay"
      :style="{ backgroundImage: `url(${banners[0]})` }"
    >
      <InstoreOrderTemplateNav :absolute="false" dark />
      <div class="wave"></div>
    </div>
    <div class="details pt-4 px-5 pb-4 d-flex justify-space-between">
      <div>
        <p class="w-250 header-big text-cc-dark mb-5 font-weight-bold">
          {{ getHeading() }}
        </p>
        <p class="w-250 font-20 mb-5 text-cc-dark">
          Over 500+ items sold by {{ $store.state.merchant.name }}
        </p>
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          class="primary"
          px="6"
          py="6"
          large
          elevation="0"
          rounded
          dark
        >
          Shop now
          <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
        </v-btn>
      </div>
      <div class="icons">
        <div class="icon">
          <img
            src="/img/icons/shopping_bag_FILL0_wght400_GRAD0_opsz48.svg"
            alt=""
          />
        </div>
        <div class="icon">
          <img
            src="/img/icons/credit_card_FILL0_wght400_GRAD0_opsz48.svg"
            alt=""
          />
        </div>
        <div class="icon">
          <img
            src="/img/icons/local_shipping_FILL0_wght400_GRAD0_opsz48.svg"
            alt=""
          />
        </div>
        <div class="icon">
          <img src="/img/icons/shopify.svg" alt="" />
        </div>
      </div>
      <div class="triangle">
        <img src="/img/triangle.svg" alt="" />
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

.bg-gray {
  background-color: #f5f5f4;
}
.blue-overlay {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgb(130 142 179 / 50%), rgb(113 128 216 / 50%));
    z-index: 1;
  }

  > * {
    z-index: 2;
  }
}
.image {
  background: linear-gradient(rgb(130 142 179 / 50%), rgb(113 128 216 / 50%));
  min-height: 350px;
  background-size: cover;
  position: relative;
  z-index: 1;
}

.header-big {
  font-size: 3rem;
}

.wave {
  min-height: 300px;
  background: url(/img/bg-clip-path-2.svg);
  width: 100%;
  background-size: cover;
  position: absolute;
  top: 8rem;
}

.icons {
  width: 25%;

  .icon {
    height: 65px;
    padding: 1rem;
    width: 65px;
    background: $color-cc-dark;
    border-radius: 50%;
    margin-bottom: 1.2rem;

    img {
      width: 100%;
    }
  }
}

.triangle {
  position: absolute;
  top: -6rem;
  right: 0;

  img {
    animation: spin 5s linear infinite;
    width: 60px;
  }
}

.details {
  margin-top: -1rem;
  position: relative;
  z-index: 4;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media only screen and (max-width: 470px) {
  .wave {
    top: 11rem;
  }
}

@media only screen and (min-width: 470px) {
  .triangle {
    position: absolute;
    top: -6rem;
    left: 24rem;

    img {
      animation: spin 5s linear infinite;
      width: 60px;
    }
  }
}
@media only screen and (max-width: 320px) {
  .icons {
    display: none;
  }
}
</style>
