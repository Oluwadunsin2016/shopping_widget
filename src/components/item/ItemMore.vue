<template>
  <div class="d-flex flex-column align-stretch">
    <div class="px-8 pt-3 pb-2">
      <v-subheader class="px-0 text--secondary mb-1" style="height: initial">Description</v-subheader>
      <div class="mb-4">
        <p class="black--text pre-wrap" style="width: 80%" v-html="item.description"></p>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="py-4 px-8">
      <v-row>
        <v-col class="d-flex flex-column justify-center align-start text-center">
          <v-avatar color="blue lighten-5">
            <v-icon color="blue">mdi-cart</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ item.quantity_sold }} buys</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center text-center">
          <v-avatar color="red lighten-5">
            <v-icon color="red">mdi-heart</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ item.likes }} likes</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-end text-center">
          <v-avatar color="purple lighten-5">
            <v-icon color="purple">mdi-eye</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ item.views }} views</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex flex-column justify-center align-start text-center">
          <v-avatar color="orange lighten-5">
            <v-icon color="orange">mdi-comment</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">{{ item.total_ratings }} reviews</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center text-center">
          <v-avatar color="teal lighten-5">
            <v-icon color="teal">mdi-truck</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">24 hours</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-end text-center"
               v-if="item.sell_on_credit === 1">
          <v-avatar color="blue-grey lighten-5">
            <v-icon color="blue-grey">mdi-credit-card-clock</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">on Credit</div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-end text-center"
               v-if="item.sell_on_credit === 0">
          <v-avatar color="blue-grey lighten-5">
            <v-icon color="blue-grey">mdi-credit-card-check</v-icon>
          </v-avatar>
          <div class="mt-1 subtitle-2">Outright</div>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="px-10" v-if="$store.getters['merchant/theme'].details_template === 1 || $vuetify.breakpoint.smAndDown">
      <RelatedItems :item="item" class="my-10" v-if="item && item.id"/>
    </div>
    <div class="py-6 px-8 d-flex justify-center">
      <v-btn @click="$emit('close')" color="red" outlined>Close</v-btn>
    </div>
  </div>
</template>

<script>
	import RelatedItems from "./RelatedItems";

	export default {
		name: 'ItemMore',
		components: { RelatedItems },
		props: {
			item: {
				type: Object,
				required: true
			},
		}
	}
</script>

<style lang="scss" scoped>
  .v-application .subtitle-2 {
    font-family: 'Varela', sans-serif !important;
  }
</style>
