<template>
  <v-card elevation="0">
    <ItemPicturesCarousel :item="item" class="mb-4"/>
    <v-card-text class="pa-0" ref="content">
      <div class="d-flex align-center justify-space-between mb-6 pa-4" style="position: absolute; top: 0; right: 0;">
        <v-btn @click="$emit('close')" color="white" icon style="background: tomato">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="px-10 py-6">
        <template v-if="item.name && item.price">
          <div class="d-flex flex-column align-start fill-width">
            <div class="text-title">{{ item.name }}</div>
            <div class="d-flex align-center justify-space-between fill-width mt-2">
              <div class="d-flex align-center mr-3">
                <v-rating
                  :value="rating" background-color="orange lighten-3" color="orange" dense readonly size="20"
                />
                <span class="text-small ml-2" v-if="item.total_ratings">({{ item.total_ratings }} review(s))</span>
              </div>
              <div class="d-flex">
                <v-btn @click="handleCopy()" icon>
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn @click="handleShare()" :loading="sharing" icon class="ml-2">
                  <v-icon>mdi-share-variant-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex align-center mt-3">
            <div>
              <div class="title font-weight-bold text--black">
                {{ item.price | currency }}
              </div>
            </div>
            <div class="ml-auto d-flex align-center">
              <v-btn @click="addLike()" small icon class="mr-3">
                <v-icon color="red" v-if="liked">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
              </v-btn>
              <div v-if="item.quantity" class="d-flex">
                <v-btn @click="addToCart()" class="flex-grow-1 px-5" rounded color="primary" elevation="0">
                  <v-icon class="mr-2">mdi-plus</v-icon>
                  Add to cart
                </v-btn>
              </div>
              <div v-else class="fill-width">
                <v-chip class="px-2" color="red" dark x-small>Out of stock</v-chip>
              </div>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
        </template>
        <div class="mt-4">
          <v-tabs v-model="tab">
            <v-tab class="pa-0 mr-5">Description</v-tab>
            <v-tab class="pa-0 mr-5">Reviews ({{ item.total_ratings }})</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="py-6">
              <v-card class="px-8 py-6 mb-5" outlined>
                <v-subheader class="px-0 text--secondary" style="height: initial" v-if="!item.description">
                  No description
                </v-subheader>
                <div class="text-title black--text text--lighten-2 pre-wrap" v-html="item.description"></div>
              </v-card>
            </v-tab-item>
            <v-tab-item class="py-6" v-if="$store.getters['merchant/theme'].show_product_comments">
              <Reviews :embedded="true" :itemId="item.id" @close="closeReview($event)" v-if="item.id"/>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import item from "../../mixins/item";
import ItemPicturesCarousel from "../../components/item/ItemPicturesCarousel.vue";
import Reviews from "../../components/Reviews.vue";
import axios from "axios";

export default {
  name: 'QuickAddToCart',
  components: { Reviews, ItemPicturesCarousel },
  mixins: [item],
  data: () => ({ tab: 0, sharing: false }),
  created() {
    this.addView();
  },
  methods: {
    handleCopy() {
      try {
        navigator.clipboard.writeText(`${ location.origin }/${ this.$store.state.merchant.slug }/collections?p=${ this.item.slug }`);
        this.$bus.$emit('toast', { message: 'Link copied', color: 'green' });
      } catch (e) {
        this.$bus.$emit('toast', { message: e.message, color: 'red' });
      }
    },
    async handleShare() {
      this.sharing = true;
      try {
        const response = await axios.get('https://proxy-exhb.onrender.com/'.concat(this.item.primary_picture), {
          responseType: 'blob'
        });
        const filesArray = [
          new File([response.data], 'product.jpeg', { type: response.data.type })
        ];
        await navigator.share({
          url: `${ location.origin }/${ this.$store.state.merchant.slug }?p=${ this.item.slug }`,
          text: this.item.name,
          title: 'Checkout this product',
          files: filesArray
        });
      } catch (e) {
        this.$bus.$emit('toast', { message: e.message, color: 'red' });
      }
      this.sharing = false;
    }
  }
}
</script>
