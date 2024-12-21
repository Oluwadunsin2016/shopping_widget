<template>
  <div class="min-h-screen container" style="max-width: 600px">
    <!-- <v-app-bar color="transparent" elevation="0" height="90" max-height="90">
      <div class="d-flex align-center fill-width">
        <div
          class="d-flex align-center font-weight-bold ma-0"
          style="font-size: 1rem"
        >
        <v-avatar
            class="mr-3"
            size="80"
            tile
            cover
          >
            <v-img 
            src="/img/logos/440logo.png"
             height="100%" 
             contain
            ></v-img>
          </v-avatar>
          
          440 Global Shopping
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge
            :content="`${$store.state.cart.items.length}`"
            color="red"
            overlap
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar> -->
    <!-- <v-carousel
      show-arrows="hover"
      cycle
      delimiter-icon="mdi-minus"
      height="150px"
      hide-delimiter-background
    >
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
    </v-carousel> -->
    <div class="d-flex flex-column">
      <div>
        <v-row dense v-if="loading">
          <v-col :key="i" cols="6" v-for="i in 4">
            <ItemCardLoading />
          </v-col>
        </v-row>
        <div v-else>
        <v-row v-if="deals.length>0">
          <v-col
            cols="6"
            v-for="deal in deals"
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
                <div
                  class="text-subtitle mb-2"
                  style="overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;"
                >
                  {{ deal.name }}
                </div>
               <div class="d-flex">
                  <p class="text-subtitle mr-2 font-bold">
                    {{ formatToNaira(deal.price)}}
                  </p>
                  <p class="text-subtitle mr-2 text-strikethrough red--text">
                    {{ formatToNaira(deal.old_price)}}
                  </p>
                </div>
                <v-chip class="my-md-1" small>{{ deal.source }}</v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <div v-else style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 80vh">
        <p>No product at the moment</p>
        <v-icon   x-large
          dark>mdi-cart-outline</v-icon>
        </div>
        </div>
      </div>
    </div>

    <v-container class="my-8" v-if="!end && !loading">
    <v-btn
       v-if="moreLoading"
        outlined
        rounded
        block
        class="d-flex align-center"
      >
        <v-progress-circular class="mr-2" indeterminate size="20"></v-progress-circular>
        Loading...
      </v-btn>
      <v-btn
      v-else
        @click="loadMore()"
        outlined
        rounded
        block
        class="d-flex align-center"
      >
        Load more
        <v-icon class="ml-3">mdi-chevron-down</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import ItemCardLoading from "@/components/templates/elements/ItemCardLoading.vue";
import { EventBus } from "../lib/event-bus";

export default {
  name: "flash",
  components: { ItemCardLoading },
  data() {
    return {
      deals: [],
      loading: true,
      next: null,
      end: false,
      prev: null,
      referralCode: '',
       moreLoading: false,
      searchText:''
    };
  },
  async created() {
     this.setReferralCode();
          EventBus.$on('search-query', query => {
      this.searchText=query
      this.getItems(query);
    });
    await this.getItems();
  },
  methods: {
    async getItems(searchText) {
      this.loading = true;
      let res=[]
      try {
      if (searchText) {
        res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/get_deals",
          { search:searchText, page: 1, platform: "", is_deals: 0, is_ads: 0, is_web: true }
        );
      } else {
        res = await this.$http.post(
          "https://lendnode.creditclan.com/gateway/store/stores/get_deals",
          { search: "", page: 1, platform: "", is_deals: 0, is_ads: 0, is_web: true }
        );  
      }
        

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

        getCalculatedDiscount(oldPrice, newPrice) {
        const cleanOldPrice = this.removeNairaSign(oldPrice);
      const cleanNewPrice = this.removeNairaSign(newPrice);
      if (cleanOldPrice <= 0 || cleanNewPrice <= 0) return 0; // Ensure prices are greater than 0

      const discount = ((cleanOldPrice - cleanNewPrice) / cleanOldPrice) * 100;
      return Math.ceil(discount);  // Return discount as percentage rounded to 2 decimal places
    },

     formatToNaira(value) {
    const cleanPrice = this.removeNairaSign(value);
      if (!cleanPrice) return '';  // Return empty string if value is null or undefined
      
      // Ensure the value is a number
      const numericValue = parseFloat(cleanPrice);
      if (isNaN(numericValue)) return '';

      // Format the value as Naira with commas
      return `₦${numericValue.toLocaleString('en-NG', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`;
    },

      removeNairaSign(price) {
      // Remove '₦' and any commas in the price string, then convert to a number
    //   return parseFloat(
    //     price.toString().replace(/₦|,/g, '') // Replace ₦ and commas with an empty string
    //   );
      return  price.replace(/₦|,/g, '')
    },

    async loadMore() {
    let res=[]
    this.moreLoading=true
    
    if(this.searchText){
      res = await this.$http.post(
        "https://lendnode.creditclan.com/gateway/store/stores/get_deals",
        { search: this.searchText, page: this.next, platform: "", is_deals: 0, is_ads: 0, is_web: true }
      );
    }else{
      res = await this.$http.post(
        "https://lendnode.creditclan.com/gateway/store/stores/get_deals",
        { search: "", page: this.next, platform: "", is_deals: 0, is_ads: 0, is_web: true }
      );
    }

      this.deals = this.deals.concat(res.data.data);
      this.next = res.data.next;
      this.prev = res.data.prev;
      this.end = res.data.end;
       this.moreLoading=false
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

.productImg{
height: 250px;
  @media (max-width: 960px) {
    height: 150px;
  }
}
</style>
