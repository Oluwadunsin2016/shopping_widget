<template>
  <div class="min-screen-height position-relative">
    <InstoreOrderTemplateNav :absolute="false" />
    <div class="bg-cc-light"></div>
    <div style="z-index: 2" class="position-relative product-image">
      <img :src="images[0]" alt="" style="height: 250px; object-fit: contain" />
    </div>
    <div class="position-relative">
      <div style="z-index: 2" class="position-relative d-flex align-center">
        <div class="tiny-img">
          <img :src="images[1]" alt="" />
        </div>
        <div class="details">
          <p class="w-250 text-cc-dark mt-8 title-text">
            Over 500+ items sold by {{ $store.state.merchant.name }}
          </p>
          <hr class="line-cc" />
        </div>
      </div>
      <div style="z-index: 2" class="position-relative d-flex align-center">
        <div class="tiny-img">
          <img :src="images[2]" alt="" />
        </div>
        <div class="mb-8 mt-8 details">
          <v-btn
            @click="$router.push(`/${$store.state.merchant.slug}/collections`)"
            class="pa-8 primary"
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
  </div>
</template>

<script>
import InstoreOrderTemplateNav from './InstoreOrderTemplateNav.vue'

export default {
  components: {
    InstoreOrderTemplateNav,
  },
  data() {
    return {
      theme: this.$store.getters['merchant/theme'],
    }
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

.position-relative {
  position: relative;
}

.bg-cc-light {
  background: url(/img/1.png);
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}

.mr-30 {
  margin-right: 30px;
}

.line-cc {
  border: 1px solid #172336;
  width: 5rem;
  margin-top: 1.5rem !important;
}

.product-image {
  padding: 1rem 4rem;
}

.text-cc {
  color: $color-cc;
}

.text-cc-dark {
  color: $color-cc-dark;
}

.font-20 {
  font-size: 20px;
}

.font-30 {
  font-size: 30px;
}

.font-18 {
  font-size: 18px;
}

.mb-40 {
  margin-bottom: 40px;
}

.font-15 {
  font-size: 15px;
}

.image {
  z-index: 2;
  position: relative;

  img {
    width: 100%;
  }
}

.bg-white {
  background-color: #fff;
}

img {
  width: 100%;
}

.mt-50 {
  margin-top: 50px;
}

.ml-30 {
  margin-left: 30px;
}

.w-100 {
  width: 100%;
}

.w-250 {
  width: 250px;
}

.w-200 {
  width: 200px;
}

.bg-grey {
  background: #f1eeee;
  height: 370px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.circle {
  width: 200px;
  height: 200px;
  position: absolute;
  background: #fb8627;
  right: 20%;
  border-radius: 50%;
  bottom: 21%;
  z-index: -1;
}

.tiny-img {
  padding: 1rem 1.5rem;

  img {
    width: 120px;
  }
}

.pt-90 {
  padding-top: 90px;
}

.text-white {
  color: #fff;
}

.position-relative {
  position: relative;
}

.pb-8rem {
  padding-bottom: 8rem;
}

.item-card {
  border-radius: 12px;
  padding: 1.2rem;
  height: 120px;
  background-size: cover;
  background: #f5f5f4;

  img {
    width: 100%;
    height: 100%;
  }
}

.title-text {
  font-size: 3rem;
  line-height: 3rem;
}

.details {
  padding: 0 4px !important;
  overflow: hidden;
}

@media only screen and (min-width: 470px) {
  .bg-cc-light {
    background: url(/img/1.png);
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .details {
    padding: 0 3rem !important;
  }

  .product-image {
    padding: 5rem 4rem;
  }
}
</style>
