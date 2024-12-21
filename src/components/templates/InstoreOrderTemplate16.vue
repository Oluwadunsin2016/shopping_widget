<template>
  <div style="position: relative" class="min-screen-height bg-cc-dark">
    <div class="image">
      <InstoreOrderTemplateNav :absolute="false" />
      <div class="px-5 pb-120 category-image">
        <p
          style="font-size: 2rem"
          class="w-250 font-30 text-cc-dark mb-5 font-weight-bold"
        >
          {{ getHeading() }}
        </p>
        <img
          style="height: 250px; object-fit: contain"
          :src="images[0]"
          alt=""
        />
      </div>
      <div class="circle">
        <img src="/img/circle.png" alt="" />
      </div>
      <div class="triangle">
        <img src="/img/triangle.svg" alt="" />
      </div>
    </div>
    <div class="px-5 pb-8 details bg-cc-dark position-relative px-5">
      <div class="curve"></div>

      <p class="position-relative w-250 font-20 mb-10 text-white">
        Today's categories
      </p>
      <div class="position-relative icons">
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
        <div></div>
        <div></div>
      </div>
      <div class="position-relative shop">
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          class="ml-3 pa-8 primary"
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

.font-30 {
  font-size: 30px;
}

.font-20 {
  font-size: 20px;
}

.pb-120 {
  padding-bottom: 120px !important;
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
  background-color: #fff;
  min-height: 610px;
  background-size: cover;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.curve {
  min-height: 180px;
  background: url(/img/bg-clip-path-4.svg);
  width: 100%;
  background-size: cover;
  right: 1px;
  position: absolute;
  top: -10rem;
}

.circle {
  position: absolute;
  right: 1rem;
  bottom: 15rem;
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
  top: 4rem;
  right: 5rem;
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
  margin-top: 1rem;
}

.icons {
  display: flex;
  justify-content: space-between;

  .icon {
    height: 80px;
    padding: 1rem;
    width: 70px;
    display: flex;
    background: rgb(255 255 255 /5%);
    border-radius: 12px;
    margin-bottom: 1.2rem;
    align-items: center;

    img {
      width: 100%;
    }
  }
}

.shop {
  background-size: cover;
  z-index: 99;
  height: 8rem;
  position: absolute;
  bottom: 11rem;
  right: 1rem;
  border-radius: 50%;
}

@media only screen and (min-width: 470px) {
  .category-image {
    padding-bottom: 7rem !important;
  }
  .curve {
    min-height: 212px;
    background: url(/img/bg-clip-path-4.svg);
    width: 100%;
    background-size: cover;
    right: 0;
    position: absolute;
    top: -11rem;
  }
}
</style>
