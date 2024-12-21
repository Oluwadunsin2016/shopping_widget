<template>
  <div class="min-screen-height d-flex flex-column bottom-nav-spacing">
    <v-container class="fill-height flex" style="max-width: 650px">
      <swiper :options="swiperOptions" ref="swiper">
        <swiper-slide>
          <div class="py-6">
            <div class="d-flex align-center justify-space-between mb-6  ">
              <h5 class="text-h6 font-weight-bold">Explore</h5>
              <v-btn @click="swiper.slideNext()" icon outlined>
                <v-icon size="32">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <v-row dense>
            <!-- <v-row > -->
              <v-col
                v-for="service in services"
                :key="service.id"
                class="text-center cursor-pointer"
                cols="4"
              >
                <v-card
                  @click="showView(service.id)"
                  outlined
                  class="py-8 px-3 fill-height"
                >
                  <v-icon :color="service.color" size="36">{{
                    service.icon
                  }}</v-icon>
                  <div class="text-small mt-3">{{ service.name }}</div>
                  <v-chip v-if="service.avilabity" x-small class="mt-3">{{ service.avilabity }}</v-chip>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="py-6">
            <div class="d-flex align-center justify-space-between mb-6">
              <v-btn @click="swiper.slidePrev()" icon outlined>
                <v-icon size="32">mdi-chevron-left</v-icon>
              </v-btn>
            </div>
            <v-row dense>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card
                  outlined
                  class="py-8 px-3 fill-height"
                  @click="showView('food')"
                >
                  <v-icon color="teal" size="36">mdi-food-fork-drink</v-icon>
                  <div class="text-small mt-3">Buy food</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="blue" size="36">mdi-lightbulb</v-icon>
                  <div class="text-small mt-3">Electronics</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="purple" size="36">mdi-car</v-icon>
                  <div class="text-small mt-3">Cars</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="yellow" size="36">mdi-laptop</v-icon>
                  <div class="text-small mt-3">Computer</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="orange" size="36">mdi-tshirt-crew</v-icon>
                  <div class="text-small mt-3">Fashion</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="teal" size="36">mdi-chair-school</v-icon>
                  <div class="text-small mt-3">Furniture</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="blue" size="36">mdi-flash</v-icon>
                  <div class="text-small mt-3">Inverter & solar</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="red" size="36">mdi-cellphone</v-icon>
                  <div class="text-small mt-3">Phone</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
              <v-col class="text-center cursor-pointer" cols="4">
                <v-card outlined class="py-8 px-3 fill-height">
                  <v-icon color="red" size="36">mdi-airplane</v-icon>
                  <div class="text-small mt-3">Travel</div>
                  <v-chip x-small class="mt-3">Coming soon</v-chip>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </swiper-slide>
      </swiper>
      <img
        src="@/assets/images/happy-straight.png"
        alt=""
        class="fill-width mt-auto"
      />
    </v-container>

    <Modal v-model="views.airtime" fullscreen>
      <Airtime @close="closeViews()" />
    </Modal>

    <Modal v-model="views.pay" fullscreen>
      <PayMerchant @close="closeViews()" />
    </Modal>

    <Modal v-model="views.order" fullscreen>
      <WhatsappPurchaseFlow @close="closeViews()" />
    </Modal>

    <Modal v-model="views.internet" fullscreen>
      <Internet @close="closeViews()" />
    </Modal>

    <Modal v-model="views.cable" fullscreen>
      <CableTv @close="closeViews()" />
    </Modal>

    <Modal v-model="views.movies" fullscreen>
      <Movies @close="closeViews()" />
    </Modal>

    <Modal v-model="views.electricity" fullscreen>
      <Electricity @close="closeViews()" />
    </Modal>

    <Modal v-model="views.hmo" fullscreen>
      <Hmo @close="closeViews()" />
    </Modal>

    <Modal v-model="views.rent" fullscreen>
      <Rent @close="closeViews()" />
    </Modal>

    <BottomNavigationStore />
  </div>
</template>

<script>
import BottomNavigationStore from '@/components/nav/BottomNavigationStore.vue'
import views from '@/mixins/views.js'
import Modal from '@/components/Modal.vue'
import Airtime from '@/components/more/Airtime.vue'
import PayMerchant from '@/components/PayMerchant.vue'
import WhatsappPurchaseFlow from '@/components/whatsapp/WhatsappPurchaseFlow.vue'
import Internet from '@/components/more/Internet.vue'
import CableTv from '@/components/more/Cabletv.vue'
import Movies from '@/components/more/Movies.vue'
import Electricity from '@/components/more/Electricity.vue'
import Hmo from '../components/more/Hmo.vue'
import Rent from '../components/more/Rent.vue'

export default {
  name: 'OtherServices',
  components: {
    Electricity,
    Movies,
    CableTv,
    Internet,
    WhatsappPurchaseFlow,
    PayMerchant,
    Airtime,
    Modal,
    BottomNavigationStore,
    Hmo,
    Rent,
  },
  mixins: [views],
  data() {
    return {
      services: [
        {
          id: 'airtime',
          icon: 'mdi-sim',
          color: 'blue',
          name: 'Buy airtime',
          enabled: true,
        },
        {
          id: 'internet',
          icon: 'mdi-signal-variant',
          color: 'red',
          name: 'Buy data',
          enabled: true,
        },
        {
          id: 'pay', icon: 'mdi-cash', color: 'blue', name: 'Pay merchant',
          enabled: this.$store.state.merchant.reseller !== 1,
          avilabity: 'Coming soon',
        },
        {
          id: 'order', icon: 'mdi-cart-plus', color: 'orange', name: 'Create order',
          enabled: true,
          avilabity: 'Coming soon',
        },
        
        {
          id: 'cable', icon: 'mdi-television', color: 'purple', name: 'DSTV/GoTV',
          enabled: true,
          avilabity: 'Coming soon',
        },
        {
          id: 'movies', icon: 'mdi-movie-open', color: 'orange', name: 'Buy movies',
          enabled: true,
          avilabity: 'Coming soon',
        },
        {
          id: 'hmo', icon: 'mdi-bandage', color: 'green', name: 'Buy HMO',
          enabled: true,
          avilabity: 'Coming soon',
        },
        {
          id: 'rent', icon: 'mdi-home', color: 'teal', name: 'Rent a House',
          enabled: true,
          avilabity: 'Coming soon',
        },
        {
          id: 'electricity', icon: 'mdi-lightbulb-variant', color: 'red', name: 'Buy electricity',
          enabled: true,
          avilabity: 'Coming soon',
        },
      ].filter((i) => i.enabled),
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      views: {
        pay: false,
        order: false,
        airtime: false,
        internet: false,
        cable: false,
        movies: false,
        hmo: false,
        food: false,
        electricity: false,
        rent: false,
      },
    }
  },
  mounted() {
    const { m } = this.$route.query
    if (m && Object.hasOwn(this.views, m)) this.views[m] = true
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },
}
</script>
