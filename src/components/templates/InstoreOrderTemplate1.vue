<template>
  <div>
    <InstoreOrderTemplateNav absolute/>
    <swiper :options="swiperOptions" ref="el">
      <template v-for="i in 6">
        <swiper-slide :key="i">
          <div class="white">
            <div
              class="d-flex flex-column pt-16 overflow-hidden screen-height-w-bottom-nav"
              style="height: calc(100vh - 70px)"
            >
              <v-img :src="images[i]" contain eager class="product-image"></v-img>
              <div
                class="container position-relative overflow-hidden mt-4 pt-8"
                style="z-index: 10"
              >
                <h1 style="
                    font-size: 3.5rem;
                    line-height: 4rem;
                    width: 100%;
                    max-width: 350px;
                  ">
                  {{ $store.getters['merchant/headings'][i] }}
                </h1>
                <p class="black--text mt-6" style="font-size: 1.1rem; max-width: 200px">
                  Over 500+ products sold by {{ $store.state.merchant.name }}
                </p>
                <!-- @click="$bus.$emit('/collections')" -->
                <v-btn
                @click="$bus.$emit( 'options'); $router.push(`/${$store.state.merchant.slug}/collections`)"
                  color="primary" elevation="0" class="mt-2" large
                >
                <!-- <router-link to="/collections">Start shopping</router-link> -->
                Start shopping
                  
                </v-btn>
                <!-- <v-btn
                  @click="$bus.$emit('modal', 'options')"
                  color="primary" elevation="0" class="mt-2" large
                >
                  Start shopping
                </v-btn> -->
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import InstoreOrderTemplateNav from "@/components/templates/InstoreOrderTemplateNav.vue";
import { getRandomIntInclusive } from "@/lib/utils.js";

export default {
  name: "InstoreOrderTemplate1",
  components: { InstoreOrderTemplateNav },
  data() {
    return {
      theme: this.$store.getters["merchant/theme"],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
       autoplay: {
        delay: 3000, // Adjust the delay (in milliseconds) as needed
        disableOnInteraction: false, // Allows for autoplay to continue even when the user interacts with the slider
       },
       loop: true, // Enable infinite loop
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  methods: {
    getHeading() {
      const headings = this.$store.getters['merchant/headings'];
      return headings[getRandomIntInclusive(1, headings.length - 1)];
    },
  },
  computed: {
    images() {
      return this.$store.getters["merchant/images"];
    },
  },
};
</script>

<style lang="scss" scoped>
.product-image {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(45%);
  height: 70%;
}

.sidebar {
  padding-top: 6rem;
}

.icon {
  height: 25px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 1.2rem;
}

.link-icon {
  margin-bottom: 0.8rem !important;
}

.w-70 {
  width: 70% !important;
}

@media only screen and (max-width: 470px) {
  .product-image {
    transform: translateX(56%);
  }
}

.merchant-links {
  min-height: 28vh !important;
}

@media only screen and (min-width: 390px) and (max-width: 600px) {
  .merchant-links {
    min-height: 38vh !important;
  }
}

@media only screen and (min-width: 300px) and (max-width: 376px) {
  .merchant-links {
    min-height: 22vh !important;
  }
}

@media only screen and (max-width: 300px) {
  .merchant-links {
    min-height: 20vh !important;
  }
}
</style>
