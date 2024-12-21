<template>
  <v-navigation-drawer app :value="drawer" class="pt-6 px-4" width="100%" absolute left temporary>
        <div class="d-flex align-center flex-grow-1 mx-2 mb-4">
          <v-text-field
            v-model="searchQuery"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            class="no-shadow"
            clearable
            dense
            outlined
            hide-details
            @input="onSearch"
          ></v-text-field>
          <v-btn
            depressed
            style="background-color: #ec6a04; color: white"
            class="ml-2"
          >
            Search
          </v-btn>
        </div>
    <v-list nav dense>
      <v-list-item-group
        active-class="deep-purple--text text--accent-4"
      >

        <v-list-item class="d-flex align-center">
        <div style="width: 2rem; height: 2rem;">
          <v-img
            src="https://ng.jumia.is/cms/0-1-homepage/bsb/phone-icon-1.png"
            alt="phone-icon"
           style="width: 100%; height: 100%; object-fit: cover;"
          />
        </div>
          <div
            class="ml-2"
            style="display: flex; flex-direction: column;"
          >
            <span>Call to order</span>
            <a href="tel:+234 810 263 7956">+234 810 263 7956</a>
          </div>
        </v-list-item>

        <v-list-item class="d-flex align-center">
           <v-btn @click="goToCart" class="mr-0" icon>
          <v-badge
            :content="`${$store.state.cart.items.length}`"
            color="red"
            overlap
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
         <v-list-item-content class="ml-2">
            Cart Item(s)
          </v-list-item-content>
        </v-list-item>
<hr/>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          @click="nagivate(item)"
        >
          <v-list-item-content>
            {{ item.name }}
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
    closeDrawer: {type:Function,required:true},
  },
  data() {
    return {
     searchQuery: "",
      navItems: [
        { name: "Global Deals", path: "/global" },
        { name: "Local Deals", path: "/deals/8006" },
        { name: "Flash Sales", path: "/flash-sales" },
      ],
    };
  },

  methods: {
    onSearch() {
      console.log("Search query:", this.searchQuery);
      // Add your search logic or API call here
    },

    goToCart(){
    this.$store.dispatch('cart/show')
       if (typeof this.closeDrawer === 'function') {
      this.closeDrawer();
    }
    },
     navigate(item){
  if (this.referralCode==''||this.referralCode==undefined) {
     this.$router.push(`${item.path}`);
  }else{
     this.$router.push(`${item.path}/${this.referralCode}`);
  }

  this.closeDrawer()
  }
  },
};
</script>

<style></style>
