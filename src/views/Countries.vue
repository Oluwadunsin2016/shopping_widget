<template>
  <div class="white min-h-screen container py-6 setMargin" style="max-width: 600px;">
  <v-row class="mb-4 mx-8 d-flex justify-space-between">
  <v-col cols="4">
  <h1 class="font-bold" style="font-size: 1.2rem;">Country</h1>
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
<v-row v-if="filteredCountries.length>0">
<v-col cols="4" md="3" class="platform"  v-for="country in filteredCountries" :key="country.id">
   <div class="logo cursor-pointer" @click="onSearch(country.name)">
              <img
                :src="country.image"
                :alt="country.name"
                style="width: 40px; height: 40px"
              />
            </div>
            <p class="text-subtitle-2 text-center">{{ country.name }}</p>
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
import { countries } from '../lib/data';

export default {
data() {
  return {
      countries, 
      filteredCountries: [], 
       isLoading:false,
  }
},
created(){
this.filteredCountries = this.countries
},
methods: {
    onSearch(name) {
     this.$router.push({ name: 'platform-store', query: { country: name } });
    //  this.$router.push(`/search/${this.searchQuery}`);
    },

     search(event) {
     this.filteredCountries= this.countries.filter((country) =>
      country.name.toLowerCase().includes(
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