<template>
  <div class="">
    <h1 class="text-center mb-4 font-bold" style="font-size: 1.1rem;">Shop from 100+ marketplaces</h1>

    <!-- Hover container to display chevrons on hover -->
    <v-hover style="position: relative">
      <div class="platforms-container">
        <!-- Left Chevron (visible only when hovering) -->
             <v-btn
             v-if="!isLeftDisabled"
          icon
          @click="scrollLeft"
          style="position: absolute; top: 1.2rem; left: 0; z-index: 2; color: #EC6A04;"
          x-large
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

            <v-btn
            v-if="!isRightDisabled"
          icon
          @click="scrollRight"
          style="position: absolute; top: 1.2rem; right: 0; z-index: 2; color: #EC6A04;"
          x-large
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <!-- Scrollable Platforms -->
             <div v-if="isLoading" class="platforms mb-8" ref="scrollContainer" @scroll="handleScroll">
         <div class="d-inline" v-for="(_,i) in 15" :key="i">
         <v-skeleton-loader 
    type="avatar" 
    class="custom-avatar"
  ></v-skeleton-loader>
         </div>
        </div>
        <div v-else class="platforms" ref="scrollContainer" @scroll="handleScroll">
          <div
            class="cursor-pointer platform"
            v-for="platform in displayedItems"
            :key="platform.id"
          >
            <div class="logo" @click="onSearch(platform.platform_name)">
              <img
                :src="platform.logo"
                :alt="platform.short_name"
                style="width: 40px; height: 40px"
              />
            </div>
            <p class="text-subtitle-2 text-center">{{ platform.platform_name }}</p>
          </div>

          <!-- Load more button -->
          <div class="cursor-pointer platform">
            <v-btn class="logo" @click="loadMore" fab>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <p class="text-subtitle-2 text-center font-weight-bold">More...</p>
          </div>
          <!-- <div v-if="displayedItems.length < platforms.length" class="cursor-pointer platform">
            <v-btn class="logo" @click="loadMore" fab>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <p class="text-subtitle-2 text-center font-weight-bold">{{ remainingItems }} remaining</p>
          </div> -->
        </div>

      </div>
    </v-hover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platforms: [], // Array to store platforms data
      displayedPlatformCount: 20, // Initial number of items to display
      scrollInterval: null, // Interval for auto-scroll
       isLoading:false,
       isLeftDisabled: true,
      isRightDisabled: false,
    };
  },
  async created() {
  await this.getPlatforms();
  },
  computed: {
    displayedItems() {
      return this.platforms?.slice(0, this.displayedPlatformCount); // Return displayed items based on count
    },
    remainingItems() {
      return this.platforms.length - this.displayedItems.length; // Calculate remaining items
    },
  },
  mounted() {
  const container = this.$refs.scrollContainer;
  container.scrollTo({
    left: 100, // Test a scroll amount
    behavior: 'smooth'
  });
  this.checkScrollEdges();
},
  watch: {
    platforms(newItems) {
    this.$nextTick(() => this.checkScrollEdges());
      if (newItems.length > 0) {
        this.autoScroll(); // Start auto-scroll when items are available
      }
    },
  },
  methods: {
    // Fetch platforms data
    // async getPlatforms() {
    //   try {
    // this.isLoading=true
    //     const res = await this.$http.post(
    //       "https://lendnode.creditclan.com/gateway/store/stores/platforms",
    //       {
    //         country: "Nigeria",
    //         page: 0,
    //         is_deal: 1,
    //         all: false,
    //       }
    //     );
    //      this.platforms = res?.data?.data?.filter(
    //       (platform) =>
    //         platform.platform_name == "Alibaba" ||
    //         platform.platform_name == "Jumia" ||
    //         platform.platform_name == "Ali Express" ||
    //         platform.platform_name == "Amazon" ||
    //         platform.platform_name == "Adidas" ||
    //         platform.platform_name == "SSENSE"
    //     );
    //     this.isLoading=false
    //     this.autoScroll();
    //   } catch (e) {
    //     this.$bus.$emit("toast", {
    //       message: e?.response?.data?.message ?? e.message,
    //       color: "red",
    //     });
    //   }
    // },

    async getPlatforms() {
  try {
    this.isLoading = true;
    const res = await this.$http.post(
      "https://lendnode.creditclan.com/gateway/store/stores/platforms",
      {
        country: "Nigeria",
        page: 0,
        is_deal: 1,
        all: false,
      }
    );
   
  const preferredOrder = ["1688", "TEMU", "Ali Express", "Amazon", "Shein", "Instagram", "Jumia"];

this.platforms = res?.data?.data
  ?.filter((platform) =>
    preferredOrder.includes(platform.platform_name)
  )
  .sort(
    (a, b) =>
      preferredOrder.indexOf(a.platform_name) - preferredOrder.indexOf(b.platform_name)
  );
    this.isLoading = false;
    this.autoScroll();
  } catch (e) {
    console.error('Error in getPlatforms:', e);
    this.$bus.$emit("toast", {
      message: e?.response?.data?.message ?? e.message,
      color: "red",
    });
  }
},

    // Load more items (increment displayed items by 20)
    loadMore() {
      // if (this.displayedPlatformCount + 20 <= this.platforms.length) {
      //   this.displayedPlatformCount += 20;
      // } else {
      //   this.displayedPlatformCount = this.platforms.length; // Load all items if less than 20 remain
      // }
      this.$router.push('/store');
    },

     autoScroll() {
    //  if(this.platforms.length>0){
    //   const container = this.$refs.scrollContainer;
    //   const scrollStep = 2; // Adjust the step size for smoothness or speed

    //   // If there's already an active interval, don't start a new one
    //   if (this.autoScrollInterval) return;

    //   this.autoScrollInterval = setInterval(() => {
    //     if (this.scrollDirection === 'right') {
    //       container?.scrollLeft += scrollStep;
    //       if (container?.scrollLeft + container.clientWidth >= container.scrollWidth) {
    //         this.scrollDirection = 'left'; // Reached the right end, change direction
    //       }
    //     } else {
    //       container?.scrollLeft -= scrollStep;
    //       if (container?.scrollLeft <= 0) {
    //         this.scrollDirection = 'right'; // Reached the left end, change direction
    //       }
    //     }
    //   }, 16); // 16ms for roughly 60 frames per second
    //  }
    },

        stopAutoScroll() {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null; // Reset the interval reference
    },

      
 scrollLeft() {
 if(this.platforms.length>0){
 this.stopAutoScroll()
      const container = this.$refs.scrollContainer;
      container.scrollLeft -= 200
       setTimeout(() => {
        this.autoScroll();
      }, 1500);
 }
 this.$nextTick(() => this.checkScrollEdges());
    },

    scrollRight() {
    if(this.platforms.length>0){
    this.stopAutoScroll()
      const container = this.$refs.scrollContainer;
      container.scrollLeft += 200; 
      setTimeout(() => {
        this.autoScroll();
      }, 1500);
    }
    this.$nextTick(() => this.checkScrollEdges());
    },

      checkScrollEdges() {
      const container = this.$refs.scrollContainer;
      const scrollLeft = container?.scrollLeft;
      const scrollWidth = container?.scrollWidth;
      const clientWidth = container?.clientWidth;

      this.isLeftDisabled = scrollLeft === 0;
      this.isRightDisabled = scrollLeft + clientWidth >= scrollWidth;
    },
      handleScroll() {
      this.checkScrollEdges();
    },

        onSearch(name) {
         sessionStorage.setItem('isDeals',JSON.stringify(true))
     this.$router.push({ name: 'search', query: { platform: name } });
    //  this.$router.push(`/search/${this.searchQuery}`);
    }
  },
   beforeDestroy() {
    // Clear the interval when the component is destroyed
    this.stopAutoScroll();
  }
};

</script>

<style scoped>
.platforms-container {
  position: relative;
}

.platforms {
  display: flex;
  scroll-behavior: smooth;
  white-space: nowrap;
  max-width: 100%;
  align-items: center;
  gap: 2.5rem;
  overflow-x: auto;
  position: relative;
}

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

/* Hide scrollbar */
.platforms::-webkit-scrollbar {
  display: none;
}

/* Chevron buttons */
.scroll-chevron {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.platforms-container:hover .scroll-chevron {
  opacity: 1;
}

/deep/.custom-avatar .v-skeleton-loader__avatar {
  width: 4rem;
  height: 4rem;
  /* background-color: #eceff1; */
  border-radius: 100%;
}

</style>
