<template>
  <div class="min-screen-height white">
    <InstoreOrderTemplateNav :absolute="false" />
    <div class="pb-10 position-relative">
      <div class="bg-grey rounded-lg mx-auto d-flex" style="width: 85%">
        <div
          class="position-relative d-flex justify-center"
          style="transform: translateY(50px)"
        >
          <img :src="images[0]" alt="" style="width: 60%" />
        </div>
      </div>
    </div>
    <div class="pb-5 px-5 mt-10">
      <p
        style="margin: auto; width: 300px"
        class="text-h4 text-center text-cc-dark mb-5 font-weight-bold"
      >
        {{ getHeading() }}
      </p>
      <p
        style="font-size: 18px; width: 250px; margin: auto"
        class="text-center mb-5 text-cc-dark"
      >
        Over 500+ items sold by {{ $store.state.merchant.name }}
      </p>
      <div class="mt-5 d-flex justify-center">
        <v-btn
          @click="$router.push(`${$store.state.merchant.slug}/collections`)"
          class="px-6"
          elevation="0"
          large
          rounded
          dark
        >
          View more
        </v-btn>
        <v-btn
          @click="
            $bus.$emit('options')
            $router.push(`/${$store.state.merchant.slug}/collections`)
          "
          class="ml-3 px-6 primary"
          large
          rounded
          elevation="0"
          color="orange"
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
.bg-grey {
  background: #f1eeee;
}
</style>
