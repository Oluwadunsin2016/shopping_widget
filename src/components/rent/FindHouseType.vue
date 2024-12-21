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
        What type of house would you prefer?
      </div>

      <div>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="findHouseType">
              <v-radio
                label="Room Only"
                color="primary"
                value="room-only"
              ></v-radio>
              <v-radio
                label="Room and parlour"
                color="primary"
                value="room-parlour"
              ></v-radio>
              <v-radio
                label="Two Bedroom"
                color="primary"
                value="two-bedroom"
              ></v-radio>
              <v-radio
                label="Three Bedroom"
                color="primary"
                value="three-bedroom"
              ></v-radio>
              <v-radio
                label="Four Bedroom"
                color="primary"
                value="four-bedroom"
              ></v-radio>
              <v-radio
              label="Bungalow"
              color="primary"
              value="bungalow"
              ></v-radio>
              <v-radio label="Duplex" color="primary" value="duplex"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="6"> </v-col>
        </v-row>
      </div>
      <v-btn
        :loading="loading"
        @click="updateFHT"
        class="flex-grow-1"
        color="primary"
        elevation="0"
        >Submit</v-btn
      >
    </form>
  </v-sheet>
</template>
<script>
export default {
  name: 'FindHouseType',
  data() {
    return {
      findHouseType: '',
      loading: false,
    };
  },
  methods: {
    updateFHT() {
      this.$store.commit('rent/set', { findHouseType: this.findHouseType });
      this.$emit('submit');
    },
  },
};
</script>
