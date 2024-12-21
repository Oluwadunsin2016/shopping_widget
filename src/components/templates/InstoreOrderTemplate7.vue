<template>
  <div class="min-screen-height d-flex flex-column">
    <div class="white pb-8 position-relative">
      <InstoreOrderTemplateNav dark />
      <div
        style="z-index: 3"
        class="container position-relative overflow-hidden mt-3"
      >
        <h1
          style="color: #fff; font-size: 3rem; line-height: 3.5rem; width: 250px;"
        >
          {{ getHeading() }}
        </h1>
        <p style="color: #fff; font-size: 18px; width: 250px" class="mt-2">
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
      </div>
      <div class="curve"></div>
      <div
        class="bg-wallpaper overlay"
        :style="{ backgroundImage: `url(${banners[0]})` }"
      ></div>
    </div>
    <div
      style="margin-top: -1rem"
      class="bg-dark flex-grow-1 py-6 position-relative"
    >
      <div class="container">
        <v-row dense>
          <v-col v-for="i in 6" :key="i" cols="4">
            <div class="border rounded-lg white">
              <v-img :aspect-ratio="4 / 5" :src="images[i]" contain />
            </div>
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
  name: 'InstoreOrderTemplate7',
  components: { InstoreOrderTemplateNav },
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
.bg-dark {
  background: #030a21 !important;
}

.bg-wallpaper {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  height: 100%;
  width: 410px;
  position: absolute;
  background-size: cover;
  top: 0;
  right: 0;
}

.curve {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  right: 0;
  background: url('/img/svg/crazy-curve.svg');
  background-size: cover;
  background-position-x: 80%;
  z-index: 2;
}
</style>
