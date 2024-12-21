<template>
  <div class="footer">
    <v-container class="py-12">
      <v-row class="pb-12">
        <v-col cols="12" md="4">
          <div class="d-flex flex-column">
            <div class="white--text text-left">
              <div class="title">{{ merchant.name }}</div>
              <a
                  v-if="merchant.phone" :href="`tel:${merchant.phone}`" class="d-flex text-decoration-none white--text text-title-md text-small mt-4"
                  target="_blank"
              >
                <v-icon class="mr-1" color="blue" size="20">mdi-phone</v-icon>
                {{ merchant.phone }}
              </a>
              <a
                  v-if="merchant.email" :href="`mailto:${merchant.email}`"
                  class="d-flex text-decoration-none white--text text-title-md text-small mt-1"
                  target="_blank"
              >
                <v-icon class="mr-1" color="red" size="20">mdi-email</v-icon>
                {{ merchant.email }}
              </a>
              <p class="mt-5" v-if="merchant.address">
                {{ merchant.address }}
              </p>
            </div>
          </div>

          <div class="d-flex icons mt-4">
            <v-btn :href="merchant.whatsapp_link" class="mr-1" color="green" icon target="_blank">
              <v-icon size="20">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn :href="merchant.instagram" class="mr-1" color="red" icon target="_blank">
              <v-icon size="20">mdi-instagram</v-icon>
            </v-btn>
            <v-btn :href="merchant.facebook" class="mr-1" color="blue" icon target="_blank">
              <v-icon size="20">mdi-facebook</v-icon>
            </v-btn>
            <v-btn :href="merchant.twitter" class="mr-1" color="light-blue" icon target="_blank">
              <v-icon size="20">mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex flex-column align-start">
            <v-btn :to="`/${$store.state.merchant.slug}`" class="mb-2" dark exact small text>Home</v-btn>
            <v-btn :to="`/${$store.state.merchant.slug}/collections`" class="mb-2" dark small text>Store</v-btn>
            <v-divider class="my-2 fill-width" dark/>
            <v-subheader class="grey--text">Categories</v-subheader>
            <v-btn :key="tag.id" @click="filter(tag)" class="mb-2" dark small text v-for="tag in [...merchant.tags].splice(0, 4)">
              {{ tag.name }}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex align-center">
            <div class="rounded-lg overflow-hidden">
              <v-img src="@/assets/images/mastercard.svg" width="50"></v-img>
            </div>
            <div class="pl-8 rounded-lg overflow-hidden">
              <v-img src="@/assets/images/visa.svg" width="50"></v-img>
            </div>
            <div class="pl-8 rounded-lg overflow-hidden">
              <v-img src="@/assets/images/verve.svg" width="50"></v-img>
            </div>
          </div>
        </v-col>
      </v-row>
      <p class="pt-12 text-center white--text">
        Sell {{ (new Date()).getFullYear() }}, All rights reserved
        &nbsp;&nbsp;•&nbsp;&nbsp;
        Powered by <span class="orange--text">Clan Africa</span>
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      drawer: false,
      catalogue: this.$store.state.catalogue,
      merchant: this.$store.state.merchant,
      request: this.$store.state.request,
      views: {
        about: false,
        referral: false
      }
    }
  },
  methods: {
    initials: name => name.substr(0, 2).toUpperCase(),
    filter(tag) {
      const values = this.$store.state.catalogue.filter;
      values.on_credit = 0;
      values.max_monthly_amount = 0;
      values.max_no_of_months = 0;
      values.tag_ids = [tag.id];
      values.end = false;
      values.page_number = 1;
      this.$store.dispatch('catalogue/filterItems', values);
      console.log(this.$store.state.merchant.slug)
      this.$router.push(`/${ this.$store.state.merchant.slug }/collections`)
    }
  }
}
</script>

<style scoped>
.footer {
  background: #20242a;
}
</style>
