<template>
  <div
    style="overflow-x: hidden"
    class="min-screen-height d-flex flex-column bg-wallpaper"
  >
    <InstoreOrderTemplateNav absolute dark />
    <v-card
      :img="banners[0]"
      class="position-relative overlay"
      style="height: 400px; position: relative; z-index: 3"
      rounded="0"
    >
    </v-card>
    <div style="position: relative">
      <div class="curve"></div>
      <div class="white fill-width py-3 border">
        <div class="container justify-space-between position-relative">
          <h2
            class="pb-8 pt-4 ma-0"
            style="width: 250px; font-size: 3rem; line-height: 3.5rem"
          >
            {{ getHeading() }}
          </h2>
          <v-btn
            @click="
              $bus.$emit('options')
              $router.push(`/${$store.state.merchant.slug}/collections`)
            "
            color="primary"
            elevation="0"
            class="ml-2"
            outlined
          >
            Shop
            <v-icon class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="container blue lighten-5 flex-grow-1 py-4">
        <v-row dense>
          <v-col v-for="i in 3" :key="i">
            <v-card outlined>
              <v-img
                :aspect-ratio="1"
                class="rounded-lg border"
                :src="images[i]"
                contain
              />
            </v-card>
          </v-col>
        </v-row>
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
  </div>
</template>

<script>
import InstoreOrderTemplateNav from '@/components/templates/InstoreOrderTemplateNav.vue'
import { getRandomIntInclusive } from '@/lib/utils.js'

export default {
  name: 'InstoreOrderTemplate6',
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
.curve {
  background: url('/img/svg/curve-1.svg');
  position: absolute;
  top: -1rem;
  height: 260px;
  background-size: cover;
  right: -1rem;
  width: 160px;
}

.carousel {
  height: calc((var(--vh, 1vh) * 100) - 70px) !important;
  width: 100%;
  overflow: hidden;
  background: rgb(236, 239, 241);

  &-card {
    position: relative;
    width: 90%;
    height: 60%;
    border-radius: 6px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.1);
    z-index: 3;
    margin: 20px auto;

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
