<template>
  <div style="overflow: hidden auto" class="bg-cc">
    <InstoreOrderTemplateNav dark :absolute="false" />
    <div class="inner-bg">
      <p class="font-20 title-small mb-0 text-cc-dark">
        Over 500+ items sold by {{ $store.state.merchant.name }}
      </p>
      <div class="pb-16 details">
        <div>
          <p class="title-big mb-0 text-cc-dark">
            {{ getHeading() }}
          </p>
          <v-btn
            @click="
              $bus.$emit('options')
              $router.push(`/${$store.state.merchant.slug}/collections`)
            "
            class="mt-10 pa-8 primary"
            elevation="0"
            rounded
            dark
          >
            Shop now
            <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
          </v-btn>
        </div>
        <div class="mt-10 mb-10">
          <img
            style="height: 250px; object-fit: contain"
            :src="images[0]"
            alt=""
          />
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

.inner-bg {
  min-height: 300px;
  background: #fdea9c;
  border-radius: 5rem 5rem 0 0;
}

.title-small {
  padding: 2em 3rem;
}

.details {
  border-radius: 5rem 5rem 0 0;
  background: white;
  padding: 2rem 3rem;
  height: 100%;
  position: relative;

  img {
    width: 70%;
  }
}

.title-big {
  font-size: 3rem;
  line-height: 3.5rem;
  width: 250px;
}

.icons {
  width: 25%;
  position: absolute;
  top: 15rem;
  right: 0;

  .icon {
    height: 65px;
    padding: 1rem;
    width: 65px;
    background: #172336;
    border-radius: 50%;
    margin-bottom: 2.5rem;

    img {
      width: 100%;
    }
  }
}

.triangle {
  position: absolute;
  top: 3rem;
  left: 19rem;
  animation: spin 5s linear infinite;

  img {
    width: 60px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
