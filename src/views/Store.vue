<template>
  <div class="white min-h-screen container py-6 setMargin" style="max-width: 600px;">
  <v-row class="mb-4 mx-8 d-flex justify-space-between">
  <v-col cols="4">
  <h1 class="font-bold" style="font-size: 1.2rem;">Store</h1>
  </v-col>
  <v-col cols="8">
   <v-text-field
      label="Filter"
      prepend-inner-icon="mdi-filter-variant"
      dense
      outlined
      hide-details
      @input="search"
    ></v-text-field>
  </v-col>
  </v-row>
<div>
    <v-row v-if="isLoading" class="mb-8">
         <v-col cols="4" md="3" class="platform" v-for="(_,i) in 30" :key="i">
         <v-skeleton-loader 
    type="avatar" 
    class="custom-avatar"
  ></v-skeleton-loader>
         </v-col>
        </v-row>

<div v-else>
<v-row v-if="filteredPlatforms.length>0">
<v-col cols="4" md="3" class="platform"  v-for="platform in filteredPlatforms" :key="platform.id">
   <div class="logo cursor-pointer" @click="onSearch(platform.platform_name)">
              <img
                :src="platform.logo"
                :alt="platform.short_name"
                style="width: 40px; height: 40px"
              />
            </div>
            <p class="text-subtitle-2 text-center">{{ platform.platform_name }}</p>
</v-col>
</v-row>
    <div v-else style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 40vh">
          <p>No match</p>
          </div>
</div>
</div>
  </div>
</template>

<script>
export default {
data() {
  return {
      platforms: [], 
      filteredPlatforms: [], 
       isLoading:false,
  }
},
  async created() {
     const country = this.$route.query.country;
      console.log(country)
      if (country) {
         await this.getPlatforms(country);
      }else{
         await this.getPlatforms();
      }
  },
    watch: {
    '$route.query': {
      immediate: true, // Run this handler immediately on creation
      handler() {
        this.fetchSearchResults();
      }
    }
  },
methods: {
  async fetchSearchResults() {
      const country = this.$route.query.country;
      console.log(country)
      if (country) {
        console.log(`Searching for: ${country}`);
         await this.getPlatforms(country);
      }else{
         await this.getPlatforms();
      }
    },
    async getPlatforms(country) {
  try {
    console.log("Before API call"); // Add this log
    this.isLoading = true;
    let res=[]
    if(country==undefined||country==''){
    res = await this.$http.post(
      "https://lendnode.creditclan.com/gateway/store/stores/platforms",
      {
        country: "",
        page: 0,
        is_deal: 0,
        all: true,
      }
    );
    }else{
     res = await this.$http.post(
      "https://lendnode.creditclan.com/gateway/store/stores/platforms",
      {
        country,
        page: 0,
        is_deal: 0,
        all: false,
      }
    );
    }
    console.log("After API call"); // Add this log
    console.log(res?.data?.data);
    console.log("Working perfectly");
    this.platforms = res?.data?.data
    this.filteredPlatforms = this.platforms
    
    // this.platforms = res?.data?.data?.filter((platform) =>
    //   ["Alibaba", "Jumia", "Ali Express", "Amazon", "Adidas", "SSENSE","Konga","Nike","440 store"].includes(
    //     platform.platform_name
    //   )
    // );
    this.isLoading = false;
  } catch (e) {
    console.error('Error in getPlatforms:', e);
    this.$bus.$emit("toast", {
      message: e?.response?.data?.message ?? e.message,
      color: "red",
    });
  }
},

     onSearch(name) {
    console.log(name)
      // sessionStorage.setItem('isDeals',JSON.stringify(true))
     this.$router.push({ name: 'search', query: { platform: name } });
    //  this.$router.push(`/search/${this.searchQuery}`);
    },
     search(event) {
     this.filteredPlatforms= this.platforms.filter((platform) =>
      platform.platform_name.toLowerCase().includes(
        event.toLowerCase()
      )
    );

    
    },
},
}
</script>

<style scoped>
.platform {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

.logo {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eceff1;
}

.setMargin {
  @media (max-width: 960px) {
   margin-top: 8rem;
  }
}

/deep/.custom-avatar .v-skeleton-loader__avatar {
  width: 4rem;
  height: 4rem;
  /* background-color: #eceff1; */
  border-radius: 100%;
}
</style>