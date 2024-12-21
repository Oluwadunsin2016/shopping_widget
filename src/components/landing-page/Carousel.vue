<template>
  <v-container fluid>
    <!-- Row to align Left Bar, Carousel (Middle), and Right Bar -->
    <div class="mx-4 mx-md-8">
      <v-row>
        <!-- Left Bar -->
        <v-col cols="12" md="3" class="d-none d-md-block">
          <v-card flat outlined class="nav px-4 mb-4">
            <v-list dense>
            <!-- <v-list-item>
            <v-list-item-content>
             <v-expansion-panels class="pa-0 ma-0" flat accordion>
      <v-expansion-panel
      class="pa-0 ma-0"
      flat
      >
        <v-expansion-panel-header class="pa-0 ma-0 text-h6">Deals</v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0 ma-0">
         <v-list class="pa-0 ma-0">
         <v-list-item
         class="py-0 ma-0"
                v-for="(item, index) in subLinks"
                :key="index"
                @click="navigate(item.path)"
              >
                <v-list-item-content class="text-subtitle-2">
                  {{ item.name }}
                </v-list-item-content>
              </v-list-item>
         </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
            </v-list-item-content>
            </v-list-item> -->
              <v-list-item
                v-for="(item, index) in navLinks"
                :key="index"
                @click="navigate(item.path)"
              >
                <v-list-item-content class="text-h6">
                  {{ item.name }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="isApp=true"
              >
                <v-list-item-content class="text-h6">
                  App
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card flat outlined class="white py-2">
            <Platforms />
          </v-card>
        </v-col>

        <!-- Middle Section: Carousel -->
        <v-col cols="12" md="6">
          <v-skeleton-loader
            type="image"
            class="carousel-loader"
            v-if="loading"
          ></v-skeleton-loader>
          <div class="white border" v-else>
            <v-carousel
              cycle
              :interval="4000"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="400px"
            >
              <v-carousel-item
                v-for="deal in deals"
                :key="deal.id"
                :src="deal.image"
                :alt="deal.name"
                cover
                @click="goToProduct"
              >
                <!-- <v-img ></v-img> -->
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>

        <!-- Right Bar -->
        <v-col cols="12" md="3" class="d-none d-md-flex flex-column">
          <v-card flat outlined class="white py-2 border">
            <Countries />
          </v-card>
          <div
            class="blue-grey lighten-5 rounded-xl fill-width d-flex flex-column text-center align-start py-8 px-8 mt-auto justify-space-between align-center"
          >
            <p
              class="grey--text text--darken-3 pr-6"
              style="max-width: 300px; line-height: 1.2; font-size: 1.2rem"
            >
              Claim your N20,000 Giveaway now. Download the
              <strong>440 Global Shopping</strong> app
            </p>
            <div class="d-flex align-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.get440.com&hl=en&gl=US"
                target="_blank"
              >
                <PlayStoreBadge width="120" />
              </a>
              <a
                href="https://apps.apple.com/ng/app/440/id6474253185"
                target="_blank"
                class="ml-2"
              >
                <AppStoreBadge width="120" />
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

     <v-dialog v-model="isApp" persistent max-width="400">
      <div
        class="blue-grey lighten-5 rounded-md fill-width d-flex flex-column text-center align-start py-8 px-8 justify-space-between align-center"
      >
          <p
              class="grey--text text--darken-3 pr-6"
              style="max-width: 300px; line-height: 1.2; font-size: 1.2rem"
            >
              Claim your N20,000 Giveaway now. Download the
              <strong>440 Global Shopping</strong> app
            </p>
            <div class="d-flex align-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.get440.com&hl=en&gl=US"
                target="_blank"
              >
                <PlayStoreBadge width="120" />
              </a>
              <a
                href="https://apps.apple.com/ng/app/440/id6474253185"
                target="_blank"
                class="ml-2"
              >
                <AppStoreBadge width="120" />
              </a>
            </div>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="isApp = false">
              Cancel
            </v-btn>
        </v-card-actions>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import Platforms from "@/components/landing-page/Platforms.vue";
import Countries from "@/components/landing-page/Countries.vue";
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";
export default {
  components: { Platforms, Countries, AppStoreBadge, PlayStoreBadge },
  data() {
    return {
      deals: [],
      loading: true,
      next: null,
      end: false,
      prev: null,
      isApp: false,
      referralCode: "",
      subLinks: [
        { name: "Global Deals", path: `/global` },
        { name: "Local Deals", path: `/local` },
        { name: "440 Deals", path: `/deals/8006` },
        { name: "Flash Sales", path: `/flash-sales` },
      ],
      navLinks: [
        { name: "Deals", path: `/global` },
        { name: "Store", path: `/store` },
      ],
      images: [
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/Week_40/Fasion_forward/660x330_B.png",
        "https://ng.jumia.is/cms/0-1-initiatives/flashsale/2024/Mobile_Homepage_Slider__660x330.jpg",
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/0-1Advertising/OCtober/itel/Banner-660X330.jpg",
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/0-1Advertising/OCtober/skechers/mobile-slider.jpg",
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/Week_40/Skyrun-week/Mobile-Homepage-Slider_-660x330.gif",
        "https://ng.jumia.is/cms/0-CMS-MIGRATION-2020/Star-link/sep/mobile.jpg",
        "https://ng.jumia.is/cms/0-1-weekly-cps/0-2024/mini-deals/Television/660X330.png",
      ], // Sample images for the carousel
    };
  },
  async created() {
    this.setReferralCode();
    await this.getItems();
  },
  methods: {
    async getItems() {
      this.loading = true;
      try {
        const res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/get_deals",
          {
            search: "",
            page: 1,
            platform: "",
            is_deals: 0,
            is_ads: 1,
            is_web: true,
          }
        );

        this.deals = res.data.data;
        this.next = res.data.next;
        this.prev = res.data.prev;
        this.end = res.data.end;
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message ?? e.message,
          color: "red",
        });
      }
      this.loading = false;
    },
    setReferralCode() {
      const referralCode = this.$route.params.referralCode;
      const fromSession = sessionStorage.getItem("referralCode");
      if (referralCode !== undefined) {
        this.referralCode = referralCode;
        sessionStorage.setItem("referralCode", referralCode);
      } else if (fromSession) {
        this.referralCode = fromSession;
      } else {
        this.referralCode = "";
      }
    },
    navigate(path) {
      if (this.referralCode == "" || this.referralCode == undefined) {
        this.$router.push(`${path}`);
      } else {
        this.$router.push(`${path}/${this.referralCode}`);
      }
    },

       goToProduct() {
        // sessionStorage.setItem('isDeals',JSON.stringify(true))
     this.$router.push({ name: 'search', query: { platform: '440 store' } });
    //  this.$router.push(`/search/${this.searchQuery}`);
    },
  },
};
</script>

<style scoped>
.nav{
height: 14rem;
/* overflow-y: auto; */
}

/* .nav::-webkit-scrollbar{
display: none;
} */
/deep/.carousel-loader .v-skeleton-loader__image {
  height: 25rem;
}
</style>
