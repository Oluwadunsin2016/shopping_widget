<template>
<div>
  <v-row class="d-flex justify-center">
    <v-col
      v-for="(product, index) in products"
      :key="index"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card class="shopping-card">
        <!-- Discount Badge -->
        <div class="discount-badge">
          <span class="pl-4">{{ product.discount }}%</span>
        </div>

        <!-- Product Image -->
        <v-img :src="product.image" class="product-image"></v-img>

        <!-- Flash Sale Label -->
        <v-chip class="flash-sale-label" color="blue lighten-1" text-color="white" small>
          Flash Sale
        </v-chip>

        <!-- Flash Sale Countdown -->
        <div class="flash-countdown">{{ product.countdown }}</div>

        <!-- Product Info -->
        <v-card-text class="text-center">
          <div class="product-price">
            <span class="new-price">₦{{ product.newPrice }}</span>
            <span class="old-price">₦{{ product.oldPrice }}</span>
          </div>
          <div class="product-title">{{ product.title }}</div>
          <v-chip class="store-chip" small>{{ product.store }}</v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
  <div class="d-md-none">
  <div class="navContainer elevation-2">
    <!-- Navbar Container -->
    <div  class="d-flex justify-space-between align-center py-2 px-4 border mb-1">
  <div class='d-flex align-center'>
     <v-icon large @click="goBack" v-if="!isHomePage" >mdi-chevron-left</v-icon>
        <router-link to="/" style="color: #EC6A04;">
            <img src="/img/logos/440logo.png" height="20px" width="100px"></img>
  </router-link>
  </div>
        
 <div class="d-flex align-center">
 <!-- search -->
            <div v-if="whereToShow" class="d-flex align-center flex-grow-1 mx-5 search-bar mr-2">
            <v-icon @click="toggleSearch">mdi-magnify</v-icon>
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
<v-menu offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon text v-bind="attrs" v-on="on">mdi-chevron-down</v-icon>
            </template>
            <v-list v-if="!isDeals">
              <v-list-item
                v-for="(link, index) in routeLinks"
          :key="index"
          @click="navigateMain(link)"
              >
                <v-list-item-title>{{ link.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item
                v-for="(item, i) in routeItems"
                :key="i"
                @click="navigate(item.path)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
 </div>
    </div>
    
       <!-- <div v-if="whereToShow" class="d-flex align-center flex-grow-1 mx-5 search-bar">
       <v-menu
      v-model="isDropdownVisible"
      :close-on-content-click="false"
      offset-y
      bottom
      max-height="300"
    >
      <template v-slot:activator="{ on, attrs }">
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
      @input="searchInput"
    ></v-text-field>
      <v-btn
      depressed
      style="background-color: #EC6A04; color: white;"
      class="ml-2"
      centered
      @click="search"
    >
      Search
    </v-btn>
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
      </div> -->


         <!-- <div class="d-flex align-center">
    <v-tabs
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
      </v-tabs>
    <v-tabs
    v-else
        v-model="activeTab"
      >
      
        <v-tab
          v-for="(link, index) in routeItems"
          :key="index"
          @click="navigate(link.path)"
          exact
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>
      </div> -->


       <!-- <ul dense class="routeContainer">
            <li class="ma-0 pa-0" v-for="(item, index) in routeLinks" :key="index" @click="navigate(item.path)">
                  {{item.name}}
            </li>
          </ul> -->

  </div>
      <transition name="slide-fade" >
      <v-col v-if="showSearch" cols="12" style="position: absolute; z-index: 50;">
<MobileSearch />
      </v-col>
    </transition>
</div>
  </v-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          image: "https://example.com/product1.jpg",
          discount: 71,
          newPrice: "124,000",
          oldPrice: "173,685",
          title: "Bruhm BRG1800M 0.9KVA Gasoline Generator (Manual)",
          countdown: "6:6:38",
          store: "alabamart",
        },
        {
          image: "https://example.com/product2.jpg",
          discount: 65,
          newPrice: "21,688",
          oldPrice: "65,788",
          title: "Women's Becksa Bralette Top",
          countdown: "14:6:38",
          store: "slickdeals",
        },
        // Add more products as necessary
      ],
    };
  },
};
</script>

<style scoped>
.shopping-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.product-image {
  height: 200px;
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

.flash-sale-label {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.flash-countdown {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-weight: bold;
  color: blue;
}

.product-price {
  font-size: 18px;
}

.new-price {
  font-weight: bold;
  color: black;
  margin-right: 10px;
}

.old-price {
  text-decoration: line-through;
  color: gray;
}

.product-title {
  font-size: 14px;
  color: #555;
  margin: 10px 0;
}


</style>
