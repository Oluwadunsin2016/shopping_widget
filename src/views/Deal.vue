<template>
  <div class="white min-h-screen container py-6" style="max-width: 600px">
    <!-- <v-app-bar color="transparent" elevation="0" height="90" max-height="90">
      <div class="d-flex align-center fill-width">
        <div
          class="d-flex align-center font-weight-bold ma-0"
          style="font-size: 1rem"
        >
        <v-avatar
            class="mr-3"
            size="80"
            tile
            cover
          >
            <v-img 
            src="/img/logos/440logo.png"
             height="100%" 
             contain
            ></v-img>
          </v-avatar>

          440 Global Shopping
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="$store.dispatch('cart/show')" class="mr-0" icon>
          <v-badge
            :content="`${$store.state.cart.items.length}`"
            color="red"
            overlap
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar> -->
    <div v-if="item" class="min-h-screen d-flex flex-column">
      <div v-show="view === 'details'">
        <div v-if="images.length > 0">
          <v-carousel
            :class="`carousel-${$vuetify.breakpoint.name}`"
            :hide-delimiters="images.length < 2"
            :show-arrows="images.length > 1"
            cycle
            delimiter-icon="mdi-minus"
            height="100%"
            hide-delimiter-background
          >
            <v-carousel-item :key="i" v-for="(src, i) in images">
              <v-sheet color="grey lighten-4" dark height="100%" tile>
                <div @click="showPreview(src)" class="product fill-height">
                  <div class="product-image elevation-20 fill-height">
                    <ProxyImage :src="src" alt="product" class="border" />
                  </div>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>

          <v-dialog
            :scrollable="false"
            eager
            v-model="preview.visible"
            width="600"
          >
            <v-card>
              <ProxyImage :src="preview.src" />
            </v-card>
          </v-dialog>
        </div>
        <ProxyImage :src="item.image" alt="product" class="border" v-else />
        <div class="align-start fill-width pa-6">
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="flex align-center">
              <span v-if="item.price" class="font-weight-bold text--black text-h6 mr-2">
                {{ item.price | currency }}
              </span>
              <span v-if="item.old_price" class="text-strikethrough red--text mr-1 d-inline-flex">
                {{ item.old_price | currency }}
              </span>
            </div>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="shareDrawer = true"
                  class="custom rounded pa-1 cursor-pointer"
                  >mdi-share-variant-outline</v-icon
                >
              </template>
              <span>Share</span>
            </v-tooltip>
          </div>
          <div class="text-title">{{ item.name }}</div>
          <div
            class="my-4"
            style="display: flex; justify-content: end; align-items: center"
          >
            <v-btn
              @click="showDiscountCard = true"
              class="flex-grow-1 px-5 py-5"
              rounded
              color="primary"
              elevation="0"
              small
            >
              <v-icon class="mr-2">mdi-cart-outline</v-icon>
              Add to cart
            </v-btn>
          </div>
          
          <!-- <v-container class="pa-0">
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <div class=" mt-6">
                  <span class="font-weight-bold text--black text-h6 mr-2">
                    {{ item.price | currency }}
                  </span>
                    <span
                      class="text-strikethrough red--text mr-1 d-inline-flex"
                    >
                      {{ item.old_price | currency }}
                    </span>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="d-flex align-center mt-6">
                  <v-btn
                    @click="showDiscountCard = true"
                    class="flex-grow-1 px-5"
                    rounded
                    color="primary"
                    elevation="0"
                    small
                  >
                    <v-icon class="mr-2">mdi-cart-outline</v-icon>
                    Add to cart
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container> -->
          
          <div v-if="item.source =='aliexpress'">
            <div class="my-4" v-if="available_color.length > 0">
         <span class="font-weight-black">{{ available_color[0].title }}:</span> <span>{{ selectedColor }}</span>

            <v-row dense>
              <v-col cols="2" v-for="(color, i) in available_color" :key="i+1">
              <ProxyImage :src="color.image" alt="product" @click="selectColor(color, item.source)" :class="color.name ==selectedColor ? 'custom' :''"/>
              </v-col>
            </v-row>
            <div class="mt-6" v-if="available_size.length > 0">
              <span class="font-weight-black">{{ available_size[0].title}}:</span> <span>{{ selectedSize }}</span>
              <v-row dense>
                <v-col cols="2" v-for="size in available_size" :key="size.image">
                  <v-chip
                    :class="size.name ==selectedSize ? 'custom' :''"
                    label
                    filter
                    @click="selectSize(size, item.source)"
                    :color="size === selectedSize ? '#D4D4D4' : '#EBEBEB'"
                  >
                    {{ size.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </div>
          </div>
          </div>
          <div v-else>
           <div class="my-4" v-if="available_color.length > 0">
            <p class="font-weight-black">Color:{{ selectedColor }}</p>
            <v-row dense>
              <v-col cols="3" v-for="color in available_color" :key="color">
                <v-chip
                  outlined
                  label
                  filter
                  @click="selectColor(color)"
                  :color="color === selectedColor ? 'blue' : 'grey'"
                >
                  {{ color }}
                </v-chip>
              </v-col>
            </v-row>
            <div class="mt-6" v-if="available_size.length > 0">
              <p class="font-weight-black">SIZE: {{ selectedSize }}</p>
              <v-row dense>
                <v-col cols="2" v-for="size in available_size" :key="size">
                  <v-chip
                    outlined
                    label
                    filter
                    @click="selectSize(size)"
                    :color="size === selectedSize ? 'blue' : 'grey'"
                  >
                    {{ size }}
                  </v-chip>
                </v-col>
              </v-row>
            </div>
          </div>
          </div>

          <!-- <v-divider class="mt-6" v-if="available_color.length > 0"></v-divider>
          <v-divider class="mt-6" v-if="available_size.length > 0"></v-divider> -->

          <div class="mt-8 fill-width">
            <v-tabs v-model="tab">
              <v-tab class="pa-0 mr-5">Description</v-tab>
              <v-tab class="pa-0 mr-5"
                >Reviews ({{ item.total_ratings || 0 }})</v-tab
              >
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item class="py-6">
                <v-card class="px-8 py-6 mb-5" outlined>
                  <v-subheader
                    class="px-0 text--secondary"
                    style="height: initial"
                    v-if="!item.name"
                  >
                    No description
                  </v-subheader>
                  <div
                    class="text-title black--text text--lighten-2 pre-wrap"
                    v-html="item.description"
                  ></div>
                </v-card>
              </v-tab-item>
              <v-tab-item class="py-6">
                <v-card class="px-8 py-6 mb-5" outlined>
                  <v-subheader
                    class="px-0 text--secondary"
                    style="height: initial"
                  >
                    No reviews
                  </v-subheader>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>
      <div class="my-auto text-center" v-show="view === 'creating'">
        <br /><br /><br />
        <v-progress-circular
          color="primary"
          indeterminate
          size="25"
        ></v-progress-circular>
        <div class="mx-auto mt-10 text-h6" style="max-width: 300px">
          Placing your order..
        </div>
        <br /><br /><br />
      </div>
    </div>

    <v-dialog v-model="showDiscountCard" persistent max-width="400">
      <div
        class="blue-grey lighten-5 rounded-md fill-width d-flex flex-column text-center align-start py-8 px-8 justify-space-between align-center"
      >
        <p
          class="text--darken-3 pr-6"
          style="max-width: 300px; line-height: 1.2; font-size: 1.1rem"
        >
          To enjoy
          >
          discount off on this product, kindly download and shop on
          <strong>440 Global Shopping</strong> app
        </p>
        <div class="d-flex align-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.get440.com&hl=en&gl=US"
            target="_blank"
          >
            <PlayStoreBadge width="120" />
          </a>
          <a
            href="https://apps.apple.com/ng/app/440/id6474253185"
            target="_blank"
            class="ml-2"
          >
            <AppStoreBadge width="120" />
          </a>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <v-btn color="red darken-1" text @click="showDiscountCard = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="skip"> Skip </v-btn>
          </div>
        </v-card-actions>
      </div>
    </v-dialog>
     <v-navigation-drawer
        app
        :right="$vuetify.breakpoint.mdAndUp"
        fixed
        temporary
        bottom
        v-model="shareDrawer"
        width="550"
      >
        <Share :closeShareDrawer="closeShareDrawer" />
      </v-navigation-drawer>
  </div>
</template>

<script lang="js">
import ProxyImage from "@/components/ProxyImage.vue";
// import { GA4Function } from '@/utils'; // Import the function
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";
import Share from "@/components/Share.vue";

export default {
  name: 'Deal',
  components: { ProxyImage,AppStoreBadge, PlayStoreBadge,Share },
  data() {
    return {
      item: null,
      shareDrawer: false,
      checkout: false,
      quantity: 1,
      loading: false,
      showDiscountCard: false,
      view: "details",
      request: null,
      tab: 0,
      available_color: null,
      available_size: null,
      selectedColor: null,
      selectedSize: null,
      images: null,
      preview: {
        visible: false,
        src: ''
      },
    }
  },
  async created() {
    await this.getItem()
  },
  methods: {
  skip(){
  console.log('seen')
    this.showDiscountCard = false
    this.addToCart()
    },

    addToCart() {
    console.log(this.$route.params)
      const plan = {
        price: this.item.price,
        quantity: this.quantity
      };

      this.$store.commit('cart/addItem', { ...this.item, primary_picture: this.item.image, plan, selectedColor: this.selectedColor, selectedSize: this.selectedSize });
      this.$bus.$emit('cart');
    },
    async getItem() {
      const { id } = this.$route.params
      try {
        // const res = await this.$http.get(`https://lendnode.creditclan.com/gateway/store/stores/get_deal_details/${ id }`)
             const res = await this.$http.post(`https://lendnode.creditclan.com/gateway/store/stores/deal_details`,{id:id, is_web:true })
        this.item = res.data.data
        this.available_color = typeof(this.item.available_color) == "string" ?JSON.parse(this.item.available_color) :this.item.available_color
        this.available_size = typeof(this.item.available_size)  == "string"  ? JSON.parse(this.item.available_size) :this.item.available_size
        this.images = JSON.parse(this.item.images)
        this.selectedColor = this.item.source == "aliexpress" ?this.available_color[0]?.name :this.available_color[0];
        this.selectedSize = this.item.source == "aliexpress" ?this.available_size[0]?.name :this.available_size[0]

        // GA4Function([this.item] , "view_item", this.$nextTick)
          this.$nextTick(() => {
          window.dataLayer.push({
            event: 'view_item',
            ecommerce: {
              currency: 'NGN',
              value: this.item.price,
              items:{
                item_id:this.item.id,
                item_name:this.item.name,
                affiliation:"",
                coupon:"",
                discount:this.item.old_price-this.item.price,
                price:this.item.price,
                quantity:this.item.quantity,
              }
            }
          });
        });
      } catch (e) {
        this.$bus.$emit('toast', { message: e.message, color: 'red' });
      }
    },
    selectColor(color, source) {

      if (source=="aliexpress"){
        this.selectedColor = color.name;
        
       let newPrice = this.item.ae_properties.find(

        e=>{
          let useProperty =e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].property_value_definition_name ?e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].property_value_definition_name : e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].sku_property_value
 
        return ( useProperty == color.name
        && 
        (this.item.available_size.length>0 
        ? e.ae_sku_property_dtos.ae_sku_property_d_t_o[1].sku_property_value 
        == (
          this.selectedSize 
          ?this.selectedSize 
          :this.item.ae_properties[0].ae_sku_property_dtos.ae_sku_property_d_t_o[1].sku_property_value 
        ) :true))

        }
      )
      if (newPrice) {
        this.item.price = newPrice.price;
        this.item.old_price = newPrice.old_price;
        this.item.original_price = newPrice.original_price
      }
      }else{
        this.selectedColor =color;
      }
      
      // this.$bus.$emit('toast', { message: `${color} color selected`, color: 'green' });
    },
    
    selectSize(size, source) {
      if (source=="aliexpress"){
        this.selectedSize = size.name;
       let newPrice = this.item.ae_properties.find(
        e=>{
          let useProperty =e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].property_value_definition_name ?e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].property_value_definition_name : e.ae_sku_property_dtos.ae_sku_property_d_t_o[0].sku_property_value
         
        e.ae_sku_property_dtos.ae_sku_property_d_t_o[1].sku_property_value == size.name
        && ( this.item.available_color.length>0 ?useProperty
        == (
          this.selectedColor
          ?this.selectedColor 
          :this.item.ae_properties[0].ae_sku_property_dtos.ae_sku_property_d_t_o[0].property_value_definition_name 
        ):true)
        }
      )

      if (newPrice) {
        this.item.price = newPrice.price;
        this.item.old_price = newPrice.old_price;
        this.item.original_price = newPrice.original_price
      }
      }else{
        this.selectedSize =size;
      }

      // this.selectedSize = source=="aliexpress" ?size.name :size;
      // this.$bus.$emit('toast', { message: `${size} size selected`, color: 'green' });
    },

    showPreview(src) {
      this.preview.visible = true;
      this.preview.src = src;
    },
        getCalculatedDiscount(oldPrice, newPrice) {
        const cleanOldPrice = this.removeNairaSign(oldPrice);
      const cleanNewPrice = this.removeNairaSign(newPrice);
      if (cleanOldPrice <= 0 || cleanNewPrice <= 0) return 0; // Ensure prices are greater than 0
      const discount = ((cleanOldPrice - cleanNewPrice) / cleanOldPrice) * 100;
      return Math.ceil(discount);  // Return discount as percentage rounded to 2 decimal places
    },
    removeNairaSign(price) {
      // Remove '₦' and any commas in the price string, then convert to a number
    //   return parseFloat(
    //     price.toString().replace(/₦|,/g, '') // Replace ₦ and commas with an empty string
    //   );
      return  price.replace(/₦|,/g, '')
    },

        closeShareDrawer() {
      // Function to close the drawer
      this.shareDrawer = false;
    },
  }
}
</script>

<style scoped>
.my-image {
  height: 30px; /* Set height or let it adjust based on the container */
  width: 10%; /* Ensure the image takes up the full width of its container */
}
.custom {
  border: 1.5px solid #727171 !important;
}
</style>
