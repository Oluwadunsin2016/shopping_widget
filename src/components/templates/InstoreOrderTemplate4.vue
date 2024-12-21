<template>
  <div class="min-screen-height d-flex flex-column">
    <div style="min-height: 450px" class="white pb-90 position-relative">
      <InstoreOrderTemplateNav dark />
      <div class="curve">
        <img src="/img/svg/line-curve.svg" alt="" />
      </div>
      <div class="cross">
        <img src="/img/svg/cross.svg" alt="" />
      </div>
      <div class="double-circle">
        <img src="/img/svg/double-circle.svg" alt="" />
      </div>
      <div class="triangle">
        <img src="/img/triangle.svg" alt="" />
      </div>
      <div class="stairs">
        <img src="/img/stairs.svg" alt="" />
      </div>
      <div
        class="bg-wallpaper overlay"
        :style="{ backgroundImage: `url(${banners[0]})` }"
      ></div>
    </div>
    <div class="bg-white mt-8 flex-grow-1 py-4">
      <div class="pb-16 container position-relative overflow-hidden fill-width">
        <h1
          style="font-size: 3rem; line-height: 3.5rem; width: 250px; position: relative; z-index: 3;"
        >
          {{ getHeading() }}
        </h1>
        <p style="font-size: 18px; width: 250px" class="mt-4">
          Over 500+ products sold by {{ $store.state.merchant.name }}
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
        <v-icon
          size="200"
          style="position: absolute; right: -25%; top: 6rem; opacity: 0.6"
          >mdi-cart</v-icon
        >
      </div>
      <div class="container">
        <v-row dense>
          <v-col cols="9">
            <v-card
              class="position-relative flex-grow-1 rounded-lg d-flex flex-column item-card"
              light
              style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, 0.05); border: 1px solid rgba(0, 0, 0, 0.08);"
            >
              <v-img
                :aspect-ratio="4 / 4"
                :src="images[0]"
                width="100%"
                @click="$emit('click', $event)"
                class="ma-0 fill-height rounded-lg"
                contain
              />
              <v-divider></v-divider>
              <div
                class="px-3 py-3 px-md-4 flex-grow-1 d-flex flex-column align-start justify-center"
              >
                <v-btn
                  @click="$bus.$emit('modal', 'order')"
                  outlined
                  color="primary"
                  small
                  block
                >
                  <v-icon size="16" class="mr-2">mdi-cart-outline</v-icon>
                  Order now
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card outlined class="d-flex justify-center align-center mb-2">
              <v-img :aspect-ratio="5 / 6" :src="images[1]" contain />
            </v-card>
            <v-card outlined class="d-flex justify-center align-center mb-2">
              <v-img :aspect-ratio="5 / 6" :src="images[2]" contain />
            </v-card>
            <v-card outlined class="d-flex justify-center align-center mb-2">
              <v-img :aspect-ratio="5 / 6" :src="images[3]" contain />
            </v-card>
          </v-col>
        </v-row>
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
import InstoreOrderTemplateNav from '@/components/templates/InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'

export default {
  name: 'InstoreOrderTemplate4',
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
    banners() {
      return this.$store.getters['merchant/banners']
    },
  },
}
</script>

<style lang="scss" scoped>
.mt-70 {
  margin-top: 70px !important;
}

.bg-white {
  background: #fff !important;
}

.pb-90 {
  padding-bottom: 90px !important;
}

.curve {
  position: absolute;
  bottom: -8rem;
  width: 100%;
  z-index: 2;
}

.bg-wallpaper {
  background: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%));
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  top: 0;
}

.cross {
  position: absolute;
  z-index: 4;
  height: 70px;
  width: 70px;
  top: 6rem;
  right: 3rem;
  animation: spin 5s linear infinite;
}

.triangle {
  position: absolute;
  z-index: 4;
  height: 70px;
  width: 70px;
  top: 12rem;
  right: 12rem;
  animation: spin 5s linear infinite;
}

.double-circle {
  position: absolute;
  z-index: 4;
  height: 70px;
  width: 70px;
  top: 15rem;
  right: 5rem;
  animation: spin 5s linear infinite;
}

.stairs {
  position: absolute;
  z-index: 4;
  height: 70px;
  width: 70px;
  top: 19rem;
  right: 9rem;
  transform: rotate(185deg);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
