<template>
  <div>
    <div v-if="item && item.id && item.slug === $route.params.pid">
      <div class="container py-12 px-2 d-flex flex-row justify-center">
        <div>
          <div class="carousel overflow-hidden">
            <ItemPicturesCarousel :item="item"/>
          </div>
        </div>

        <div class="pt-2 ml-10" style="width: 100%">
          <div class="text-title grey--text text--darken-3 mb-2" style="width: 80%; line-height: 1.8rem">
            {{ item.name }}
          </div>
          <div class="d-flex align-center justify-space-between">
            <div v-if="$store.getters['merchant/theme'].show_product_ratings">
              <v-rating :value="rating" background-color="orange lighten-3" color="orange" dense readonly size="20"/>
              <span class="text-small ml-2" v-if="item.total_ratings">( {{ item.total_ratings }} reviews )</span>
            </div>
            <v-chip color="red" dark small v-if="credit">Credit</v-chip>
            <v-chip color="blue" dark small v-else>Outright</v-chip>
          </div>

          <v-divider class="my-5"></v-divider>

          <div class="d-flex align-center justify-space-between mt-3">
            <span class="text--secondary">Buy on Credit</span>
            <v-switch class="ma-0" dense hide-details inset v-model="buy_on_credit"></v-switch>
          </div>

          <div class="d-flex align-center mt-2">
            <div class="text-title font-weight-bold text--black" v-if="plan.monthly_amount_estimate || plan.monthly_amount">
              <span class="text-strikethrough mr-2" v-if="discount">{{ (item.credit_price || item.price) / item.no_of_months | currency }}</span>
              {{ (plan.monthly_amount_estimate || plan.monthly_amount) | currency }} / mo ({{ plan.no_of_months }} installment(s))
            </div>
            <div v-else class="text-title font-weight-medium text--secondary">
              <span class="text-strikethrough mr-2" v-if="discount">{{ item.price | currency }}</span>
              {{ plan.upfront_amount | currency }} outright
            </div>
            <v-chip class="percent-off ml-4 px-4" color="red" outlined small v-if="discount">{{ discount.percentage }}% off
              <span v-if="discount.end">, ends {{ discount.end | timeago }}</span>
            </v-chip>
          </div>
          <v-alert class="text-body-2 mt-3" dark dense rounded text type="info" v-if="buy_on_credit">
            Eligibility calculated at checkout
          </v-alert>

          <v-divider class="my-5"></v-divider>

          <div class="d-inline-flex align-center">
            <template v-if="item.quantity">
              <v-text-field :hide-details="'auto'" dense outlined readonly style="width: 120px" v-model="quantity">
                <v-icon @click="decrementQuantity()" color="red" slot="prepend">mdi-minus</v-icon>
                <v-icon @click="incrementQuantity()" color="green" slot="append-outer">mdi-plus</v-icon>
              </v-text-field>
              <v-btn
                @click="addToCart()" class="ml-2 px-8" color="primary" dark elevation="0"
                large v-if="$store.state.merchant.partnership === 1 || !buy_on_credit"
              >
                Add to cart
              </v-btn>
              <v-btn @click="showView('payment')" class="ml-2 px-8" color="primary" dark elevation="0" large v-else>
                Credit options
              </v-btn>
            </template>
            <v-chip class="ml-3 px-5" color="red" dark v-if="!item.quantity">Out of stock</v-chip>
          </div>

          <template v-if="$store.getters['merchant/theme'].details_template === 1">
            <div class="mt-5">
              <div class="mb-5">
                <v-expansion-panels class="border" flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Description
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div v-if="item.description" class="body-1 black--text text--lighten-2 pre-wrap" v-html="item.description"></div>
                      <div v-else class="body-1 grey--text">No description</div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </div>
          </template>

          <v-divider v-else class="my-5"></v-divider>

          <div class="mt-8">
            <v-btn @click="addLike" icon x-small>
              <v-badge :content="`${item.likes}`" color="grey" right>
                <v-icon color="red" v-if="liked">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
              </v-badge>
            </v-btn>
            <v-btn @click="views = { ...views, reviews: true }" class="ml-5" icon
                   v-if="$store.getters['merchant/theme'].details_template === 1 && $store.getters['merchant/theme'].show_product_comments"
                   x-small>
              <v-badge :content="`${item.total_ratings}`" color="grey">
                <v-icon>mdi-comment-outline</v-icon>
              </v-badge>
            </v-btn>
            <v-btn @click="views.more = true" class="ml-6" color="grey lighten-4" elevation="0" rounded small>More info</v-btn>
          </div>
        </div>

        <v-navigation-drawer fixed right temporary v-model="views.more" width="550">
          <v-sheet class="pt-3">
            <ItemMore :item="item" @close="views.more = false"/>
          </v-sheet>
        </v-navigation-drawer>

        <v-navigation-drawer fixed right temporary v-model="views.reviews" width="550">
          <Reviews :itemId="item.id" @close="closeReview($event)" v-if="item.id"/>
        </v-navigation-drawer>

        <v-navigation-drawer fixed right temporary v-model="views.payment" width="550">
          <v-sheet class="pa-8">
            <ItemPlans :plans="plans" @select="handlePlanChange($event, true)"/>
          </v-sheet>
        </v-navigation-drawer>
      </div>

      <v-container v-if="$store.getters['merchant/theme'].details_template === 2">
        <v-tabs v-model="tab">
          <v-tab class="pa-0 mr-5">Description</v-tab>
          <v-tab class="pa-0 mr-5" v-if="$store.getters['merchant/theme'].show_product_comments">Reviews ({{ item.total_ratings }})</v-tab>
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

        <RelatedItems :cols="3" :item="item" class="my-10" v-if="item && item.id"/>
      </v-container>

      <Footer/>

      <v-snackbar v-model="toast.visible" :color="toast.color || ''" bottom>
        {{ toast.message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
	import ItemMore from "./ItemMore";
	import ItemPicturesCarousel from "./ItemPicturesCarousel";
	import Reviews from "../Reviews";
	import item from "../../mixins/item";
	import Footer from "../templates/default/Footer";
	import RelatedItems from "./RelatedItems";
	import ItemPlans from "./ItemPlans";

	export default {
		name: "ItemDesktop",
		components: { ItemPlans, RelatedItems, Footer, ItemMore, ItemPicturesCarousel, Reviews },
		mixins: [item],
		data: () => ({ tab: 0 }),
		created() {
			// this.applyWatchers();
			// this.handleStateChange()
		},
		computed: {
			pictures() {
				const { primary_picture, secondary_picture, tertiary_picture, fourth_picture, fifth_picture } = this.item;
				const arr = [primary_picture];
				secondary_picture && !secondary_picture.includes(/undefined|null/gi) && arr.push(secondary_picture)
				tertiary_picture && !tertiary_picture.includes(/undefined|null/gi) && arr.push(tertiary_picture)
				fourth_picture && !fourth_picture.includes(/undefined|null/gi) && arr.push(fourth_picture)
				fifth_picture && !fifth_picture.includes(/undefined|null/gi) && arr.push(fifth_picture)
				return arr;
			}
		}
	}
</script>

<style lang="scss" scoped>
  .carousel {
    border: 1px solid rgba(0, 0, 0, .08);
    box-shadow: 0 0 20px rgba(0, 0, 0, .03);
    border-radius: 10px;
    min-width: 450px;
    max-width: 450px;
    height: 450px !important;
    position: sticky;
    top: 50px;
  }
</style>
