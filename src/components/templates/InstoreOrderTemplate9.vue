<template>
  <div class="pb-5 px-5 min-screen-height d-flex flex-column bg-cc">
    <InstoreOrderTemplateNav :absolute="false" />
    <div class="position-relative d-flex justify-center mt-2">
      <svg
        class="position-relative"
        width="90%"
        viewBox="0 0 878 872"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="primary"
          d="M843.001 520.501C797.667 598.834 746.501 676.667 689.501 754.001C632.501 831.334 553.167 870.334 451.501 871.001C349.834 871.667 267.667 835.167 205.001 761.501C142.334 687.834 88.0007 609.667 42.0007 527.001C-3.99929 444.334 -11.8326 356.001 18.5007 262.001C48.834 168.001 106.834 100.834 192.501 60.5006C278.167 20.1673 364.501 0.333968 451.501 1.00064C538.501 1.6673 614.334 29.5006 679.001 84.5006C743.667 139.501 798.501 206.334 843.501 285.001C888.501 363.667 888.334 442.167 843.001 520.501Z"
        />
      </svg>
      <img
        :src="images[0]"
        alt=""
        style="height: 100%; object-fit: contain"
        class="absolute"
      />
    </div>
    <div class="tripple mt-8">
      <div class="double">
        <div class="details">
          <div @click="$bus.$emit('modal', 'options')" class="icon primary">
            <v-icon color="#fff">mdi-arrow-right</v-icon>
          </div>
          <p class="text-cc-dark text-h5 font-weight-bold">
            {{ getHeading() }}
          </p>
          <p class="text-cc-dark text-title">
            Over 500+ products sold by {{ $store.state.merchant.name }}
          </p>
          <v-btn
            @click="
              $bus.$emit('options')
              $router.push(`/${$store.state.merchant.slug}/collections`)
            "
            elevation="0"
            color="primary"
            rounded
            dark
          >
            Shop now
            <v-icon class="ml-2" color="#fff">mdi-cart</v-icon>
          </v-btn>
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

.bg-cc {
  background-color: #fb86277d !important;
}

.primary {
  fill: var(--v-primary-base) !important;
}

.image {
  z-index: 2;
  position: relative;

  img {
    width: 100%;
  }
}

.font-18 {
  font-size: 18px;
}

.font-25 {
  font-size: 25px;
}

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.tripple {
  width: 100%;
  border-radius: 24px;
  background-color: #f4c9a699;
  position: relative;
  padding-top: 0.5rem;
  z-index: 3;
}

.double {
  width: 100%;
  border-radius: 24px;
  background-color: #f8d2b2;
  position: relative;
  padding-top: 0.5rem;
}

.details {
  width: 100%;
  border-radius: 24px;
  background-color: #fff3e9;
  position: relative;
  padding: 2rem;

  .icon {
    position: absolute;
    top: -1.2rem;
    right: 3rem;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.height-100vh {
  height: 100vh;
}

.btn-rounded {
  border-radius: 50px;
  padding: 0.5rem 1rem;
}

.btn-cc {
  background: $color-cc;
  color: #fff;
}

.pattern {
  top: -2rem;
  position: absolute;
  height: 500px;
  background-size: 115%;
  width: 100%;
  z-index: 1;
}
</style>
