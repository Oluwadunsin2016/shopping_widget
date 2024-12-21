<template>
  <div class="min-screen-height bg-cc-dark" ref="scroller">
    <InstoreOrderTemplateNav absolute dark />

    <div style="position: relative;">
      <svg
        fill="#030a21"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 191 82"
        class="absolute bottom mb-n16"
        style="z-index: 2"
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0S55,75,86,28s69-17,69-17l36,32V82L0,77Z" />
          </g>
        </g>
      </svg>
      <div class="circle">
        <img src="/img/circle.png" alt="" />
      </div>
      <v-carousel height="100%" hide-delimiter-background>
        <v-carousel-item :key="i" v-for="i in 4">
          <div style="position: absolute; inset: 0;" class="overlay"></div>
          <v-img :aspect-ratio="1" :src="banners[i]" cover />
        </v-carousel-item>
      </v-carousel>
    </div>

    <div
      style="z-index: 3"
      class="pb-8 container position-relative overflow-hidden mt-3"
    >
      <v-icon
        size="150"
        style="position: absolute;right: -15%;top: 0;opacity: 0.6;z-index: 3;"
      >
        mdi-cart
      </v-icon>
      <h1
        style="color: #fff; font-size: 3rem; line-height: 3.5rem; width: 250px"
        class="pb-4"
      >
        {{ getHeading() }}
      </h1>
      <p
        style="color: #fff !important; font-size: 18px; width: 250px"
        class="black--text mt-3"
      >
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
  name: 'InstoreOrderTemplate8',
  components: { InstoreOrderTemplateNav },
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
.bg-cc-dark {
  background-color: #030a21 !important;
}

.circle {
  position: absolute;
  right: 3rem;
  bottom: -21rem;
  transition: linear;
  -webkit-animation: spin 4s linear infinite;
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
</style>
