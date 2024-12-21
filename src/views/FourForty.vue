<template>
  <div class="min-h-screen container py-6" style="max-width: 600px;">
    <v-row justify="center">
    <!-- <v-button @click="showMobileAds=true">ShowAds</v-button> -->
      <v-dialog id="mobile-ads-dialog" v-model="showMobileAds" max-width="290">
        <v-card>
          <v-card-title class="text-h6 p-5 text-center d-inline mx-auto">
            <h5 class="m-0">Claim your N20,000</h5>
            <h5 class="m-0">Giveaway now</h5>
          </v-card-title>
          <v-card-text>
            Click the button below to Download the
            <strong>440 Global Shopping</strong> app to claim your N20,000
            Giveaway now
            <div class="d-flex align-center mt-10">
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="showMobileAds = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-dialog v-model="showPlatform" max-width="300">
      <v-card>
        <v-card-title class="text-h6 p-5 text-center d-inline mx-auto">
          <!-- <h2 class="m-0">Explore more of our products on</h2> -->
          <h6 class="m-0">To explore more of our products on</h6>
          <h6 class="m-0">
            <strong v-if="platformToView"
              >{{ platformToView.platform_name }} and others...</strong
            >
          </h6>
        </v-card-title>
        <v-card-text>
          <h4>
            Click the button below to Download the
            <strong>440 Global Shopping</strong> app.
          </h4>
          <div class="d-flex align-center mt-10">
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="showPlatform = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <div>
        <v-row dense v-if="loading">
          <v-col :key="i" cols="6" v-for="i in 4" class="d-flex flex-column align-start">
            <ItemCardLoading />
          </v-col>
        </v-row>
        <div v-else>
        <div v-if="productRows.length>0">
        <v-row v-for="(row, rowIndex) in productRows" :key="rowIndex">
          <v-col
            cols="6 view_item"
            v-for="deal in row"
            :key="deal.id"
            class="d-flex flex-column align-start"
          >
            <v-card
              flat
              outlined
              @click="navigate(deal.id)"
              class="shopping-card"
            >
              <div class="discount-badge">
                <span class="pl-4">{{ getCalculatedDiscount(deal.old_price, deal.price) }}%</span>
              </div>
              <v-img :src="deal.image" class="mb-4 productImg"></v-img>
              <div class="ma-4">
                <div   class="text-subtitle mb-2"
                    style="overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;">
                  {{ deal.name }}
                </div>
                <div class="d-flex">
                  <p class="text-subtitle mr-2 font-bold">
                    {{ deal.price | currency }}
                  </p>
                  <p class="text-subtitle mr-2 text-strikethrough red--text">
                    {{ deal.old_price | currency }}
                  </p>
                </div>
                <v-chip class="my-md-1" small>{{ deal.source }}</v-chip>
              </div>
            </v-card>
          </v-col>

          <v-col
            class="container mt-10"
            v-if="(rowIndex + 1) % 10 === 0"
            cols="12"
          >
            <div
              class="blue-grey lighten-5 mb-10 rounded-xl fill-width d-flex flex-column text-center align-start py-8 px-8 mt-auto justify-space-between align-center"
            >
              <h5 class="grey--text text--darken-3 pr-6 mb-5">
                Explore more deals from your favourite platforms when you
                download the 440 app.
              </h5>
              <div class="platforms">
                <div
                  class="cursor-pointer"
                  v-for="platform in platforms"
                  :key="platform.id"
                  @click="viewPlatform(platform)"
                >
                  <div class="platform">
                    <img
                      :src="platform.logo"
                      :alt="platform.short_name"
                      style="width: 30px; height: 30px"
                    />
                  </div>
                  <p style="font-size: 8px">{{ platform.platform_name }}</p>
                </div>
              </div>
              <h5 class="grey--text text--darken-3 pr-6 mt-5">And more....</h5>
            </div>
          </v-col>
        </v-row>
        </div>
         <div v-else style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 80vh">
          <p>No deals at the moment</p>
          <v-icon   x-large
            dark>mdi-cart-outline</v-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-10">
      <div
        class="blue-grey lighten-5 mb-10 rounded-xl fill-width d-flex flex-column text-center align-start py-8 px-8 mt-auto justify-space-between align-center"
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
    </div>
  </div>
</template>

<script>
import ItemCardLoading from "@/components/templates/elements/ItemCardLoading.vue";
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";
import { EventBus } from "../lib/event-bus";

export default {
  name: "FourForty",
  components: { ItemCardLoading, AppStoreBadge, PlayStoreBadge },
  data() {
    return {
      products: [],
      platforms: [],
      platformToView: null,
      loading: true,
      showMobileAds: false,
      adsOpened: false,
      showPlatform: false,
      referralCode: '',
       moreLoading: false,
      searchText:''
    };
  },
  async created() {
     this.setReferralCode();
     this.showAds();
          EventBus.$on('search-query', this.handleSearchQuery);
    await this.getItems();
    await this.getIcons();
  },
  computed: {

    productRows() {
      const deals = [];
      for (let i = 0; i < this.products.length; i += 2) {
        deals.push(this.products.slice(i, i + 2));
      }
      return deals;
    },
  },
  mounted() {
//  if (!this.showMobileAds) {
//       setTimeout(() => {
//         this.showMobileAds = true;
//       }, 30000); // Delay to prevent immediate duplicate open
//     }

      // this.showAds();
//  if (!this.adsOpened) {
//       // Open ads only once
//       this.adsOpened = true;
//     }
},
 methods: {
   handleSearchQuery(query){
      console.log('Search Query:', query);
      this.searchText=query
  },
   showAds() {
      console.log('Opening Ads');
      this.showMobileAds = true;
    },
    async getItems() {
      const id = this.$route.params.id;
      this.loading = true;
      try {
        const res = await this.$http.get(
          `https://lendnode.creditclan.com/gateway/store/stores/get_group_deals/${id}`
        );
        this.products = res.data.data;
        console.log(res.data.data);
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message ?? e.message,
          color: "red",
        });
      }
      this.loading = false;
    },

    getCalculatedDiscount(oldPrice, newPrice) {
      if (oldPrice <= 0 || newPrice <= 0) return 0; // Ensure prices are greater than 0

      const discount = ((oldPrice - newPrice) / oldPrice) * 100;
      return Math.ceil(discount);  // Return discount as percentage rounded to 2 decimal places
    },
    async getIcons() {
      // console.log('seen');

      try {
        const res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/platforms",
          {
            country: "Nigeria",
            page: 0,
            is_deal: 1,
            all: false,
          }
        );
        // this.products = res.data.data;
        // this.platforms = res?.data?.data?.filter(
        //   (platform) =>
        //     platform.platform_name == "Alibaba" ||
        //     platform.platform_name == "Jumia" ||
        //     platform.platform_name == "Ali Express" ||
        //     platform.platform_name == "Amazon"
        // );
        this.platforms = res?.data?.data?.filter(
          (platform) =>
            platform.platform_name == "Alibaba" ||
            platform.platform_name == "Jumia" ||
            platform.platform_name == "Ali Express" ||
            platform.platform_name == "Amazon" ||
            platform.platform_name == "Adidas" ||
            platform.platform_name == "SSENSE"
        );

        //   res?.data?.data?.map((platform)=>
        // {
        // if (platform.platform_name=="Jumia") {
        //   this.platforms.push(platform)
        // }
        // else if (platform.platform_name=="Ali Express") {
        //   this.platforms.push(platform)
        // }
        // else if (platform.platform_name=="Amazon") {
        //   this.platforms.push(platform)
        // }
        // else if (platform.platform_name=="Alibaba") {
        //   this.platforms.push(platform)
        // }
        // // || || platform.platform_name=="Ali Express" || platform.platform_name=="Amazon"
        // // return platform.platform_name==="Alibaba"
        // })

        console.log(this.platforms);
      } catch (e) {
        this.$bus.$emit("toast", {
          message: e?.response?.data?.message ?? e.message,
          color: "red",
        });
      }
    },
    viewPlatform(view) {
      // console.log(view?.platform_name);
      this.platformToView = view;
      // this.platformToView =  this.platforms?.find(reccent=>reccent.platform_name==view.platform_name)
      this.showPlatform = true;
      // console.log(this.platformToView);
    },

            setReferralCode() {
const referralCode=this.$route.params.referralCode
const fromSession=sessionStorage.getItem('referralCode')
  if (referralCode!==undefined) {
  this.referralCode=referralCode
    sessionStorage.setItem('referralCode',referralCode)
  }else if(fromSession){
  this.referralCode=fromSession 
  }else{
  this.referralCode='' 
  }
  },

         navigate(id){
  if (this.referralCode==''||this.referralCode==undefined) {
     this.$router.push(`/deal/${id}`);
  }else{
     this.$router.push(`/deal/${id}/${this.referralCode}`);
  }
  }
  },
  beforeDestroy() {
  EventBus.$off('search-query', this.handleSearchQuery);
}
};
</script>

<style scoped>
.shopping-card {
  position: relative;
  overflow: hidden;
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: -60px;
  background-color: red;
  color: white;
  padding: 5px;
  transform: rotate(-45deg);
  font-weight: bold;
  z-index: 1;
  width: 150px;
  text-align: center;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}
.platform {
  width: 3rem;
  height: 3rem;
}
.platform img {
  width: 100%;
  height: 100%;
}

.productImg{
height: 250px;
  @media (max-width: 960px) {
    height: 150px;
  }
}

</style>