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
      <div
        class="text-h4 font-weight-bold title black--text my-5"
      >
        Let's get started
      </div>
      <div class="text-title black--text mb-5 fill-width">
        Select your budget range?
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="budgetRange">
              <v-radio
                label="150-300k"
                color="primary"
                value="over-150"
              ></v-radio>
              <v-radio
                label="300-600k"
                color="primary"
                value="over-300"
              ></v-radio>
              <v-radio
                label="600k-1M"
                color="primary"
                value="over-600"
              ></v-radio>
              <v-radio
                label="1M-1.5M"
                color="primary"
                value="over-1M"
              ></v-radio>
              <v-radio
                label="1.5M-2M"
                color="primary"
                value="over-1.5M"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="6"> </v-col>
        </v-row>
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
export default {
  name: 'BudgetRange',
  data() {
    return {
      budgetRange: '',
      loading: false,
    };
  },
  methods: {
    updateBR() {
        this.$store.commit('rent/set', { budgetRange: this.budgetRange });
        this.$emit('done')
      }
  },
};
</script>
