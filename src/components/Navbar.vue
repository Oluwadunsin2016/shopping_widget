<template>
<div class="d-none d-md-block">
  <v-app-bar app>
    <!-- Navbar Container -->
    <v-row align="center" justify="space-between" class="px-2 px-md-5">
      
      <!-- First Div: Logo -->
     <div class='d-flex align-center'>
     <v-icon large @click="goBack" v-if="!isHomePage">mdi-chevron-left</v-icon>
        <router-link to="/" style="color: #EC6A04;">
            <img src="/img/logos/440logo.png" height="20px" width="100px"/>
  </router-link>
  </div>
      
      <!-- Second Div: Search Input -->
      <v-col v-if="whereToShow" cols="auto" class="d-none d-md-flex align-center flex-grow-1 mx-5 search-bar">
          <v-menu 
      v-model="isDropdownVisible"
      :close-on-content-click="false"
      offset-y
      bottom
      max-height="300"
    >
      <template v-slot:activator="{ }">
         <v-text-field
      v-model="searchQuery"
      label="Search"
      append-icon="mdi-magnify"
      class=" no-shadow"
       filled
            rounded
      clearable
      dense
      outlined
      hide-details
      @input="onSearchInput"
      @click:append="search"
    ></v-text-field>
  
            </template>
      <v-list v-if="suggestions.length">
        <v-list-item
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ suggestion }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>No suggestions found</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-col>
      
    <div class="d-flex items-center ">
      <v-menu offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">Deals <v-icon>mdi-menu-down</v-icon></v-btn>
            </template>
            <!-- Dropdown List for Deal -->
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
     <v-btn @click="$store.dispatch('cart/show')" class="mr-0 d-none d-md-block" icon>
          <v-badge
            :content="`${$store.state.cart.items.length}`"
            color="red"
            overlap
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
    </div>
      <!-- <v-icon class="d-md-none mr-2" @click.stop="drawer = !drawer">mdi-dots-vertical</v-icon> -->
      <v-icon v-if="drawer" class="d-md-none mr-2" @click.stop="drawer = false">mdi-close</v-icon>
      <v-icon v-else class="d-md-none mr-2" @click.stop="drawer = true">mdi-menu</v-icon>
    </v-row>

  </v-app-bar>
     <NavDrawer :drawer="drawer" :closeDrawer="closeDrawer"></NavDrawer>
</div>
     
</template>

<script>
import NavDrawer from './NavDrawer.vue';
import { EventBus } from '../lib/event-bus';
import { productSuggestions } from '../lib/data';


export default {
components:{NavDrawer},
  data() {
    return {
      searchQuery: "",
      drawer: false,
       referralCode: "",
         routeItems: [
        { name: "Global Deals", path: "/global" },
        { name: "Local Deals", path: "/local" },
        // { name: "440 Deals", path: "/deals/8006" },
        { name: "Flash Sales", path: "/flash-sales" },
      ],

           suggestions: [],
           allSuggestions: [],
      isDropdownVisible: false,
    };
  },
    watch: {
      isDropdownVisible () {
       // On mount, load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    this.allSuggestions = [...searchHistory, ...productSuggestions];
    console.log(this.allSuggestions)
      },
      searchQuery () {
      if(this.searchQuery=='')
        this.isDropdownVisible = false;
      },

    },
     mounted() {
    // On mount, load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    this.allSuggestions = [...searchHistory, ...productSuggestions];
    console.log(this.allSuggestions)
  },
   async created() {
    this.setReferralCode();
  },
     computed: {
    whereToShow() {
   return ["flash", "local", "global",'search',"home"].includes(
        this.$route.name
      )
      },
         isHomePage() {
 return this.$route.name === 'home';
      },
    },
  methods: {
   navigate(path) {
      console.log(path, this.referralCode);
      if (this.referralCode == "" || this.referralCode == undefined) {
        this.$router.push(`${path}`);
      } else {
        this.$router.push(`${path}/${this.referralCode}`);
      }
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

     search() {
     if (this.searchQuery!=='') {
    //  this.$router.push({ name: 'search', query: { item: this.searchQuery } });
    //  this.$router.push(`/search/${this.searchQuery}`);

     let localSuggestions=JSON.parse(localStorage.getItem('searchHistory'))||[]
      if(localSuggestions){
      const existed=localSuggestions.find(exist=>exist.toLowerCase()==this.searchQuery.toLowerCase())
      if(existed){
      localSuggestions=localSuggestions.filter(exist=>exist.toLowerCase()!==this.searchQuery.toLowerCase())
      localStorage.setItem('searchHistory',JSON.stringify([...localSuggestions,this.searchQuery]))
      }else{
      localStorage.setItem('searchHistory',JSON.stringify([...localSuggestions,this.searchQuery]))
      }
      }else{
      localStorage.setItem('searchHistory',JSON.stringify([this.searchQuery]))
      }
       this.isDropdownVisible = false;
   EventBus.$emit('search-query', this.searchQuery);
    // this.searchQuery=''
     }
    },
        goBack() {
      this.$router.go(-1);
    },

       closeDrawer() {
      // Function to close the drawer
      this.drawer = false;
    },

       onSearchInput(value) {
      console.log(value)
      this.suggestions=this.allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
        this.isDropdownVisible = true;
    },

       selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
     let localSuggestions=JSON.parse(localStorage.getItem('searchHistory'))||[]
      if(localSuggestions){
      const existed=localSuggestions.find(exist=>exist.toLowerCase()==suggestion.toLowerCase())
      if(existed){
      localSuggestions=localSuggestions.filter(exist=>exist.toLowerCase()!==suggestion.toLowerCase())
      localStorage.setItem('searchHistory',JSON.stringify([...localSuggestions,suggestion]))
      }else{
      localStorage.setItem('searchHistory',JSON.stringify([...localSuggestions,suggestion]))
      }
      }else{
      localStorage.setItem('searchHistory',JSON.stringify([suggestion]))
      }

         if (this.searchQuery!=='') {
    //  this.$router.push({ name: 'search', query: { item: this.searchQuery } });
     EventBus.$emit('search-query', this.searchQuery);
    // this.searchQuery=''
     }
      this.isDropdownVisible = false;
    },
  },
};
</script>

<style scoped>
.search-bar {
  max-width: 500px; /* Limit the width of the search input */
}

.search-bar .v-input__control {
  box-shadow: none !important; /* Remove the default shadow */
  border: 1px solid #ccc !important; /* Add a custom border */
  border-radius: 4px; /* Add a small border radius (customize as needed) */
}

.search-bar input {
  box-shadow: none !important; /* Remove shadow from input itself */
}
</style>
