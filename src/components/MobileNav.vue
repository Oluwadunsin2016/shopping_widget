<template>
<v-app-bar app height="auto" class="d-md-none">
<div style="width: 100%;">
<div class='d-flex align-center justify-space-between'>
  <div class='d-flex align-center'>
     <v-icon large @click="goBack" v-if="!isHomePage" >mdi-chevron-left</v-icon>
        <router-link to="/"  style="color: #EC6A04;">
            <img src="/img/logos/440logo.png" height="20px" width="100px"/>
  </router-link>
  </div>
     <!-- <v-spacer></v-spacer>    -->
 <div class="d-flex align-center">
       <v-menu v-if="isDeals" offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon text v-bind="attrs" v-on="on">mdi-menu</v-icon>
              <!-- <v-icon icon="fa:fas fa-list" v-bind="attrs" v-on="on"></v-icon> -->
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in routeItems"
                :key="i"
                @click="navigate(item.path)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
           <!-- search -->
           <div v-if="whereToShow" class="d-flex align-center flex-grow-1 mx-5 search-bar mr-2">
            <v-icon @click="toggleSearch">mdi-magnify</v-icon>
<!-- >>>>>>> b3c9f3862a5d5e5bddce32a95c0860580abb27b0 -->
      </div>

          <v-btn @click="$store.dispatch('cart/show')" class="mr-2" icon>
          <v-badge
            :content="`${$store.state.cart.items.length}`"
            color="red"
            overlap
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
 </div>
</div>
    <v-tabs
    style="border-top: 2px solid #D6D6D6;"
     class="d-flex align-center"
    v-if="!isDeals"
        v-model="activeTab"
      >
      
        <v-tab
          v-for="(link, index) in routeLinks"
          :key="index"
          @click="navigateMain(link)"
          exact
        >
          {{ link.name }}
        </v-tab>
        <v-tab
          @click="isApp = true"
          exact
        >
          App
        </v-tab>
      </v-tabs>

</div>
      <transition name="slide-fade" >
      <v-col v-if="showSearch" cols="12" style="position: absolute; z-index: 50; top: 3.5rem; right: 3.2px;">
<MobileSearch />
      </v-col>
    </transition>

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
</v-app-bar>
     
</template>

<script>
import MobileSearch from './MobileSearch.vue';
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";
import { EventBus } from '../lib/event-bus';
export default {
components:{MobileSearch, AppStoreBadge, PlayStoreBadge},
  data() {
    return {
      drawer: false,
      referralCode:'',
      activeTab: null,
      isDeals: false,
      showSearch: false, 
      isApp: false,
      debounceTimer: null,
      routeItems: [
        { name: "Global Deals", path: "/global" },
        { name: "Local Deals", path: "/local" },
        // { name: "440 Deals", path: "/deals/8006" },
        { name: "Flash Sales", path: "/flash-sales" },
      ],
    routeLinks: [
        { name: "Deals", path: `/global` },
        { name: "Store", path: `/store` },
      ],
    };
  },
   mounted() {
   console.log( this.$route.name);
   if (this.$route.name=="home"|| this.$route.name=="platform-store"|| this.$route.name=="mobile-app") {
   this.isDeals=false
   }else{
    this.isDeals=true
   }
    this.activeTab = this.currentTab; 
   },
   created() {
    this.setReferralCode();
        EventBus.$on('isSearchOpen', query => {
      this.showSearch=query;
    });
  },
    watch: {

// <<<<<<< HEAD

    //   isDropdownVisible () {
    //    // On mount, load search history from localStorage
    // let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // this.allSuggestions = [...searchHistory, ...productSuggestions];
    // console.log(this.allSuggestions)
    //   },
    //    $route(to) {
       
// =======
       $route(to,from) {
      this.activeTab = this.currentTab;
       this.showSearch = false;
      console.log(to);
      console.log(from);


       if (this.$route.name=="home"|| this.$route.name=="platform-store"|| this.$route.name=="mobile-app") {
        console.log('Navigating to home page');
        this.isDeals=false
      }else{
        this.isDeals=true
      }
    },

    },
       computed: {
    whereToShow() {
   return ["flash", "local", "global","search"].includes(
        this.$route.name
      )
      },
    isHomePage() {
 return this.$route.name === 'home';
      },
       // Track the current tab based on the current route
      currentTab() {
      const currentPath = this.$route.path;
      if (currentPath.startsWith('/store')) return 1;
      if (currentPath.startsWith('/app')) return 2;
      return 0; // Default to Deal (index 0)
    },
  
    },
  methods: {
       closeDrawer() {
      // Function to close the drawer
      this.drawer = false;
    },
 toggleSearch() {
      this.showSearch = !this.showSearch;  // Toggle search input visibility
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
   navigateMain(route) {
      console.log(route, this.referralCode);
      if (this.referralCode == "" || this.referralCode == undefined) {
        this.$router.push(`${route.path}`);
      } else {
        this.$router.push(`${route.path}/${this.referralCode}`);
      }
    },
  navigate(path){
  console.log(path,this.referralCode)
  if (this.referralCode==''||this.referralCode==undefined) {
     this.$router.push(`${path}`);
  }else{
     this.$router.push(`${path}/${this.referralCode}`);
  }
  },

    goBack() {
      this.$router.go(-1);
    },
  },
    beforeDestroy() {
    // Unsubscribe from the event to prevent memory leaks
    EventBus.$off('search-query');
  }
};
</script>

<style scoped>

.search-bar .v-input__control {
  box-shadow: none !important; /* Remove the default shadow */
  border: 1px solid #ccc !important; /* Add a custom border */
  border-radius: 4px; /* Add a small border radius (customize as needed) */
}
.navContainer{
  background-color: #F5F5F5
}

.search-bar input {
  box-shadow: none !important; /* Remove shadow from input itself */
}

.v-tabs {
margin-top: 2px;
  justify-content: center;
  display: flex;
  align-items: center;
   background-color: #F5F5F5
}

.v-tab{
   background-color: #F5F5F5
}

/* .routeContainer {
  display: flex;
  scroll-behavior: smooth;
  white-space: nowrap;
  max-width: 100%;
  align-items: center;
  gap: 2rem;
  overflow-x: scroll;
  position: relative;
   background-color: #F5F5F5
} */
.routeContainer {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content:space-between;
  /* padding:1rem 2rem; */
  /* font-size:20px; */
   background-color: #F5F5F5
}

.routeContainer::-webkit-scrollbar {
  display: none;
}


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}

/* .navContainer{
position: absolute;
top: 0;
left: 0;
width: 100%;
} */
</style>