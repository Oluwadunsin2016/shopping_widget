<template>
  <v-sheet>
    <form class="py-10 px-7">
      <div class="d-flex align-center justify-space-between mb-7">
        <v-btn icon outlined>
          <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn color="white" small icon style="background: tomato">
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h4 font-weight-bold title black--text my-5">
        What areas would you prefer to live in?
      </div>
      <div v-if="!showPreferredArea">
        <v-select
          :items="locationData"
          label="Select"
          dense
          outlined
          v-model="location"
        ></v-select>
      </div>
      <div v-else class="my-5 d-flex justify-space-between align-center">
        <v-text-field
          hide-details
          label="Kindly enter the area"
          v-model="location"
        >
        </v-text-field>
      </div>
      <div>
        <p @click="showPreferredArea = true" v-if="!showPreferredArea" class="text-title blue--text mb-5 fill-width">I don't see the area</p>
        <p @click="showPreferredArea = false" v-else class="text-title blue--text mb-5 fill-width">Select area</p>
      </div>
      <v-btn
        :loading="loading"
        @click="updateBR"
        class="flex-grow-1"
        color="primary"
        elevation="0"
        >Continue</v-btn
      >
    </form>
  </v-sheet>
</template>
<script>
import locationData from '@/lib/locationData';
export default {
  name: 'SelectAreas',
  data() {
    return {
      locationData,
      location: '',
      // areasPrefrred: '',
      showPreferredArea: false,
      loading: false,
    };
  },
  methods: {
    updateBR() {
      this.$store.commit('rent/set', { location: this.location });
      this.$emit('done')
    },
  },
};
</script>
