<template>
  <div class="setMargin">
  <Carousel/>
  <div class="white elevation-1 d-block d-md-none pa-2 my-8 mx-6 mx-md-12">
  <Platforms/>
  <Countries/>
  </div>
  <FlashSales/>
  <LocalDeals/>
  <GlobalDeals/>
  </div>
</template>

<script>
import Carousel from "@/components/landing-page/Carousel.vue";
import Platforms from "@/components/landing-page/Platforms.vue";
import Countries from "@/components/landing-page/Countries.vue";
import FlashSales from "@/components/landing-page/FlashSales.vue";
import GlobalDeals from "@/components/landing-page/GlobalDeals.vue";
import LocalDeals from "@/components/landing-page/LocalDeals.vue";
export default {
name:'Landing_Page',
components:{Carousel,Platforms,Countries,FlashSales,GlobalDeals,LocalDeals},

async created(){
this.setReferralCode()
},

methods: {
  setReferralCode() {
const referralCode=this.$route.params.referralCode
  if (referralCode!==undefined) {
    sessionStorage.setItem('referralCode',referralCode)
  }
  },
},
}
</script>

<style scoped>
.setMargin {
  @media (max-width: 960px) {
    margin-top: 10rem;
  }
}
</style>