<template>
  <div>
    <h1 class="text-center mb-4 font-bold" style="font-size: 1.1rem;">Shop from 50+ Countries</h1>

    <!-- Hover container to display chevrons on hover -->
    <v-hover style="position: relative">
      <div class="countries-container">
        <!-- Left Chevron (visible only when hovering) -->
          <!-- class="scroll-chevron left-chevron" -->
         
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
             <div v-if="isLoading" class="countries mb-8" ref="scrollContainer" @scroll="handleScroll">
         <div class="d-inline" v-for="(_,i) in 15" :key="i">
         <v-skeleton-loader 
    type="avatar" 
    class="custom-avatar"
  ></v-skeleton-loader>
         </div>
        </div>
        <div v-else class="countries" ref="scrollContainer" @scroll="handleScroll">
          <div
            class="cursor-pointer country"
            v-for="(country, index) in countriesToDisplay" :key="index"
          >
            <div class="logo" @click="onSearch(country.name)">
              <img
                :src="country.image"
                :alt="country.name"
                style="width: 40px; height: 40px"
              />
            </div>
            <p class="text-subtitle-2 text-center">{{ country.name }}</p>
          </div>

          <!-- Load more button -->
          <div v-if="countriesToDisplay.length < countries.length" class="cursor-pointer platform">
            <v-btn class="logo" @click="loadMore" fab>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <p class="text-subtitle-2 text-center font-weight-bold">More...</p>
          </div>
        </div>

        <!-- Right Chevron (visible only when hovering) -->
          <!-- class="scroll-chevron right-chevron" -->
    
      </div>
    </v-hover>
  </div>
</template>

<script>
import { countries } from '../../lib/data';
export default {
name:'Countries',
  data() {
    return {
     searchQuery: "",
     isLoading:false,
       countries, // Array to store platforms data
      displayedPlatformCount: 20, // Initial number of items to display
     scrollDirection: 'right', 
      autoScrollInterval: null,
        isLeftDisabled: true,
      isRightDisabled: false,
    };
  },
    watch: {
    countries() {
      this.$nextTick(() => this.checkScrollEdges());
    }
    },
  async created() {
  this.isLoading=true
  setTimeout(() => {
    this.isLoading=false
    this.autoScroll();
  }, 3000); // Fetch platforms when component is created
  },
    mounted() {
  this.checkScrollEdges();
},
computed: {
     countriesToDisplay() {
      return this.countries?.slice(0, this.displayedPlatformCount);
    },
},
  methods: {
    // Load more items (increment displayed items by 20)
    loadMore() {
      // if (this.displayedPlatformCount + 20 <= this.platforms.length) {
      //   this.displayedPlatformCount += 20;
      // } else {
      //   this.displayedPlatformCount = this.platforms.length; // Load all items if less than 20 remain
      // }
      this.$router.push('/countries');
    },

    // Auto-scroll functionality
  //   autoScroll() {
  //       const scrollContainer = this.$refs.scrollContainer;
  // let scrollAmount = 0;
  // const scrollStep = window.innerWidth > 768 ? 2 : 1; // Faster scroll for desktop

  // this.scrollInterval = setInterval(() => {
  //   scrollAmount += scrollStep;
  //   scrollContainer?.scrollLeft += scrollStep;

  //   if (scrollAmount >= scrollContainer.scrollWidth) {
  //     scrollAmount = 0;
  //     scrollContainer?.scrollLeft = 0;
  //   }
  // }, 20); // Set scroll speed (20ms for smooth scroll)
  //   },

    autoScroll() {
      const container = this.$refs.scrollContainer;
      const scrollStep = 2; // Adjust the step size for smoothness or speed

      // If there's already an active interval, don't start a new one
      if (this.autoScrollInterval) return;

      this.autoScrollInterval = setInterval(() => {
        if (this.scrollDirection === 'right') {
          container.scrollLeft += scrollStep;
          if (container?.scrollLeft + container?.clientWidth >= container?.scrollWidth) {
            this.scrollDirection = 'left'; // Reached the right end, change direction
          }
        } else {
          container.scrollLeft -= scrollStep;
          if (container?.scrollLeft <= 0) {
            this.scrollDirection = 'right'; // Reached the left end, change direction
          }
        }
      }, 16); // 16ms for roughly 60 frames per second
    },

        stopAutoScroll() {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null; // Reset the interval reference
    },

    scrollLeft() {
 this.stopAutoScroll()
      const container = this.$refs.scrollContainer;
      container.scrollLeft -= 200
       setTimeout(() => {
        this.autoScroll();
      }, 500);
      this.$nextTick(() => this.checkScrollEdges());
    },

    scrollRight() {
    this.stopAutoScroll()
      const container = this.$refs.scrollContainer;
      container.scrollLeft += 200; 
      setTimeout(() => {
        this.autoScroll();
      }, 500);
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
     this.$router.push({ name: 'platform-store', query: { country: name } });
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
.countries-container {
  position: relative;
}

.countries {
  display: flex;
  scroll-behavior: smooth;
  white-space: nowrap;
  max-width: 100%;
  align-items: center;
  gap: 2.5rem;
  overflow-x: auto;
  position: relative;
}

.country {
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
.countries::-webkit-scrollbar {
  display: none;
}

/* Chevron buttons */
.scroll-chevron {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.countries-container:hover .scroll-chevron {
  opacity: 1;
}


 /deep/.custom-avatar .v-skeleton-loader__avatar {
  width: 4rem;
  height: 4rem;
  /* background-color: #eceff1; */
  border-radius: 100%;
}
</style>
