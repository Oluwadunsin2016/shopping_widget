<template>
  <div class="banner-wrap">
    <v-carousel
      :continuous="false"
      :hide-delimiters="slides.length < 2"
      :interval="5000"
      class="pa-0"
      height="100%"
      hide-delimiter-background
      v-model="current"
      :show-arrows="false"
    >
      <template v-if="slides.length">
        <v-carousel-item :key="slide.id" v-for="slide in slides">
          <v-card class="fill-height pa-0 overflow-hidden" rounded="0">
            <v-img
              :gradient="slide.title ? 'to right, rgba(0,0,0,.5), rgba(0,0,0,.3)' : ''" :src="slide.image"
              class="fill-width fill-height d-block"
            ></v-img>
            <v-card-text class="banner-content d-flex justify-space-between align-center fill-height pa-0">
              <v-slide-y-transition mode="in-out" v-if="slide.title">
                <v-container>
                  <v-card class="banner-text" color="transparent" elevation="0">
                    <div class="banner-title text-h4 text-md-h3 font-weight-bold">{{ slide.title }}</div>
                    <div class="text-title-md mt-5" v-if="slide.subtitle && slide.subtitle !== 'null'">
                      {{ slide.subtitle }}
                    </div>
                    <v-btn @click="$bus.$emit('modal', 'options')" class="mt-6 mt-md-12" elevation="0" large outlined>
                      Shop now
                    </v-btn>
                  </v-card>
                </v-container>
              </v-slide-y-transition>
            </v-card-text>
          </v-card>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>

export default {
  name: 'InstoreOrderBanner',
  data() {
    return {
      current: 0,
      merchant: this.$store.state.merchant,
      slides: [
        {
          image: '/img/categories/1/fridge.png',
          title: 'Explore a variety of payment options',
          subtitle: 'Start shopping now'
        },
        {
          image: '/img/categories/1/furniture.png',
          title: 'Shop wherever you are in Lagos',
          subtitle: 'We will deliver at your door step'
        },
        {
          image: '/img/categories/1/laptop.jpg',
          title: 'Buy on credit and payback in installments',
          subtitle: 'Terms and charges apply'
        },
        {
          image: '/img/categories/1/phone.jpg',
          title: 'Fast, Safe & Secure Shopping',
          subtitle: 'Start shopping now'
        },
      ]

    }
  },
}
</script>

<style lang="scss" scoped>
@import "./src/assets/variables.scss";

.banner-wrap {
  height: 80vh;
  transition: all .15s linear;
  @media (max-width: 960px) {
    height: 50vh;
  }
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  margin-top: 20px;

  .banner-text {
    min-width: 300px;
    max-width: 700px;
    width: fit-content;
  }
}
</style>
