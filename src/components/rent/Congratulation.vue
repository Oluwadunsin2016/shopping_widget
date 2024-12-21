<template>
  <v-sheet>
    <div class="py-10 px-7 text-center">
      <div class="d-flex flex-column justify-center align-end mb-7">
        <!-- <v-btn icon outlined>
            <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
          </v-btn> -->
        <v-btn color="white" small icon style="background: tomato;">
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h4 font-weight-bold title black--text my-5">
        Congratulations,
        <div class="text-title black--text my-5 fill-width">
          We are good to go
        </div>
      </div>
      <v-btn
        :loading="loading"
        @click="$emit('done')"
        class="flex-grow-1"
        color="primary"
        elevation="0"
        >Continue</v-btn
      >
    </div>
  </v-sheet>
</template>
<script>
export default {
  name: 'Congratulation',
  data() {
    return {
      loading: false,
    };
  },
};
</script>
