<template>
  <div class="min-screen-height">
    <div
      class="bg-wallpaper min-screen-height"
      :style="{ backgroundImage: `url(${banners[0]})` }"
    ></div>
    <InstoreOrderTemplateNav dark />
    <div class="carousel-card">
      <div class="text-center my-3 pt-8">
        <h1 class="mx-auto" style="width: 80%">{{ getHeading() }}</h1>
      </div>
      <v-carousel
        :continuous="false"
        :interval="5000"
        class="pa-0 carousel"
        hide-delimiter-background
        :show-arrows="false"
        v-model="current"
        light
        height="100%"
      >
        <v-carousel-item
          v-for="i in 4"
          :key="i"
          class="fill-height pb-12"
          style="overflow-y: auto"
        >
          <div
            class="fill-height d-flex flex-column justify-center align-center px-2 pt-2"
          >
            <v-card flat style="width: 70%">
              <v-img :aspect-ratio="3 / 4" :src="images[i]" contain />
            </v-card>
            <v-btn
              @click="
                $bus.$emit('options')
                $router.push(`/${$store.state.merchant.slug}/collections`)
              "
              color="primary"
              elevation="0"
              class="mt-8"
              large
            >
              Start shopping
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import InstoreOrderTemplateNav from '@/components/templates/InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'

export default {
  name: 'InstoreOrderTemplate5',
  components: { InstoreOrderTemplateNav },
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
.bg-wallpaper {
  background: linear-gradient(rgb(14 25 59 / 70%), rgb(36 43 81 / 70%));
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-position-x: 43%;
}

.carousel {
  &-card {
    position: relative;
    width: 80%;
    border-radius: 6px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.1);
    z-index: 3;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      height: 15px;
      border-radius: 0 0 6px 6px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 2;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 30px;
      border-radius: 0 0 6px 6px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 1;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}

::v-deep {
  .v-carousel__item {
    height: 100% !important;
  }

  .v-responsive__content {
    height: 100% !important;
    overflow-y: auto;
    padding: 1rem;
  }

  .v-window__prev,
  .v-window__next {
    z-index: 5;
  }
}
</style>
