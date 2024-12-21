<template>
  <div class="my-8 mx-6 mx-md-12 white">
  <!-- <div style="margin: 2rem 4rem;"> -->
    <h1 class="text-center my-4 font-bold" style="font-size: 1.5rem;">Flash Sales</h1>

    <!-- Hover container to display chevrons on hover -->
    <v-hover style="position: relative">
      <div class="items-container">
        <!-- Left Chevron (visible only when hovering) -->
             <v-btn
             v-if="deals.length>0"
          icon
          @click="scrollLeft"
          style="position: absolute; top: 8rem; left: 0; z-index: 2;"
          x-large
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

            <v-btn
            v-if="deals.length>0"
          icon
          @click="scrollRight"
          style="position: absolute; top: 8rem; right: 0; z-index: 2;"
          x-large
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <!-- Scrollable items -->
        <div>
          <div>
        <div v-if="loading" class="d-flex justify-center">
          <div class="mx-4" style="width: 15rem;" :key="i" v-for="i in 6">
            <ItemCardLoading />
          </div>
        </div>
        <div v-else>
        <div v-if="deals.length>0" class="items pa-4" ref="scrollContainer">
        <div style="width: 15rem;" v-for="deal in deals"
            :key="deal.id">
       <v-card
              flat
              outlined
               @click="navigateToDetails(deal.id)" 
              class="shopping-card"
            >
              <div class="discount-badge">
                <span class="pl-4">{{ getCalculatedDiscount(deal.old_price, deal.price) }}%</span>
              </div>
             <v-img :src="deal.image" :alt="deal.name" class="mb-4" height="200px"></v-img>
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
                <v-chip class="my-1" small>{{ deal.source }}</v-chip>
              </div>
            </v-card>
        </div>
                <div class="cursor-pointer item">
            <v-btn class="more" @click="navigate('/flash-sales')" fab>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <!-- <p class="text-subtitle-2 text-center font-weight-bold">{{ remainingItems }} remaining</p> -->
          </div>
        </div>
        <!-- <div v-else style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 80vh">
        <p>No product at the moment</p>
        <v-icon   x-large
          dark>mdi-cart-outline</v-icon>
        </div> -->
        </div>
      </div>
        </div>

      </div>
    </v-hover>
  </div>
</template>
<script>
import ItemCardLoading from "../templates/elements/ItemCardLoading.vue";
export default {
components: { ItemCardLoading },
  data() {
    return {
     deals: [],
      loading: true,
      next: null,
      end: false,
      prev: null,
      referralCode: '',
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
          { search: "", page: 1, platform: "", is_deals: 0, is_ads: 0, is_web: true }
        );
        console.log(res.data.data);
        

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


    
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft -= 300
    },

    scrollRight() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft += 300; 
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

     navigate(path){
  if (this.referralCode==''||this.referralCode==undefined) {
     this.$router.push(`${path}`);
  }else{
     this.$router.push(`${path}/${this.referralCode}`);
  }
  },

           navigateToDetails(id){
  if (this.referralCode==''||this.referralCode==undefined) {
     this.$router.push(`/deal/${id}`);
  }else{
     this.$router.push(`/deal/${id}/${this.referralCode}`);
  }
  },
  },
};

</script>

<style scoped>
.items-container {
  position: relative;
}

.items {
  display: flex;
  scroll-behavior: smooth;
  white-space: nowrap;
  max-width: 100%;
  align-items: center;
  gap: 2.5rem;
  overflow-x: scroll;
  position: relative;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

.more {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eceff1;
}

/* Hide scrollbar */
.items::-webkit-scrollbar {
  display: none;
}

/* Chevron buttons */
.scroll-chevron {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.items-container:hover .scroll-chevron {
  opacity: 1;
}


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
</style>
