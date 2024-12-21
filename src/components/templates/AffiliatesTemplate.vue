<template>
  <div style="overflow: hidden auto" class="min-screen-height d-flex flex-column">
    <InstoreOrderTemplateNav absolute dark/>
    <div class="rounded-lg position-relative overlay top-card white--text background-img">
      <div class="absolute left center-y" style="z-index: 3;">
      </div>
      <svg fill="#E3F2FD" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.55 92" class="absolute bottom"
           style="transform: translateY(30px)">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="Layer_2-2" data-name="Layer 2">
              <g id="Layer_1-2-2" data-name="Layer 1-2">
                <path d="M180.55,0C54.72,118,0,51,0,51V92l180.55-3Z"/>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div class="lines">
        <img src="/img/svg/lines-2.svg" alt=""/>
      </div>
      <div class="triangle">
        <img src="img/triangle.svg" alt=""/>
      </div>
    </div>
    <div class="pt-5 bg-position blue lighten-5 flex-grow-1 py-3 d-flex justify-space-between">
      <div class="container">
        <h2 class="ma-0" style="font-size: 3rem; line-height: 3.5rem; width: 250px">
          Shop with us today
        </h2>
        <p style="font-size: 18px; width: 250px" class="black--text mt-4 mb-4">
          Over 500+ products sold by {{ $store.state.merchant.name }}
        </p>
        <v-btn @click="$bus.$emit('modal', 'options')" color="primary" elevation="0">
          Shop
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <div class="icons">
        <div class="icon">
          <img src="/img/icons/shopping_bag_FILL0_wght400_GRAD0_opsz48.svg" alt=""/>
        </div>
        <div class="icon">
          <img src="/img/icons/local_shipping_FILL0_wght400_GRAD0_opsz48.svg" alt=""/>
        </div>
        <div class="icon">
          <img src="/img/icons/shopify.svg" alt=""/>
        </div>
      </div>
    </div>
    <v-btn @click="$bus.$emit('modal', 'options')" large fab fixed bottom right color="primary" elevation="0"
           style="margin-bottom: 90px" class="updown-animation">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import InstoreOrderTemplateNav from "@/components/templates/InstoreOrderTemplateNav.vue";

export default {
  name: "AffiliatesTemplate",
  components: { InstoreOrderTemplateNav },
  data() {
    return {
      theme: this.$store.getters["merchant/theme"],
      current: 0,
    };
  },
  computed: {
    banners() {
      return this.$store.getters["merchant/banners"];
    },
  },
};
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

.text-dark {
  color: #000;
}

.text-white {
  color: #fff;
}

.top-card {
  background-size: cover;
  background-position: center;
  height: 400px;
}

.lines {
  position: absolute;
  width: 50px;
  top: 7rem;
  right: 5rem;
  transform: rotate(24deg);
}

.bg-position {
  position: relative;
  z-index: 2;
}

.triangle {
  position: absolute;
  top: 22rem;
  right: 2rem;
  animation: spin 5s linear infinite;
  z-index: 3;

  img {
    width: 60px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes reverse-spin {
  to {
    transform: rotate(-360deg);
  }
}

.icon {
  width: 50px;
  border-radius: 50%;
}

.link-icon {
  width: 35px;
}

.w-70 {
  width: 70% !important;
}

.animation-style {
  position: absolute;
  bottom: 0;
  width: 15px;
}

.background-img {
  background: url('../../../public/img/happy-man-2.jpg');
  background-size: cover;
  background-position: center;
}

.icons {
  width: 30%;

  .icon {
    height: 65px;
    padding: 1rem;
    width: 65px;
    background: $color-cc-dark;
    border-radius: 50%;
    margin-bottom: 1.2rem;

    img {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 320px) {
  .icons {
    display: none;
  }
}
</style>
