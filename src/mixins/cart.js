export default {
  data() {
    return {
      views: {
        cart: false,
        checkout: false,
        lender: false
      },
      lender: null,
    };
  },
  created() {
    this.$bus.$on('cart', this.showCart);
    this.getLender();
  },
  computed: {
    outright() {
      return this.$store.getters["cart/outright"]
    },
  },
  methods: {
    showCart() {
      this.showView('cart');
    },
    handleCheckout() {
     this.GoogleAddToCart()
       this.showView('checkout');
    },
    async getLender() {
      try {
        const res = await this.$http.post('https://mobile.creditclan.com/api/v3/bnpl/global/settings', {}, {
          headers: { 'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228' }
        });
        const { lender_id, lender_name, image } = res.data.response.funding_partner;
        this.lender = {
          name: lender_name,
          id: lender_id,
          image
        }
      } catch (e) {
        this.lender = {
          image: "https://www.creditclan.com/images/logo-small.png",
          id: "40245",
          name: "Clan",
        }
      }
    },
     async GoogleAddToCart() {
      
      const items = this.$store.state.cart.items;
    const TotalPrice = items.reduce((accumulator, item) => accumulator + (parseInt(item.plan.price * item.plan.quantity, 0)), 0);

      this.$nextTick(() => {
        window.dataLayer.push({ ecommerce: null });

          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: 'NGN',
              value: TotalPrice,
              coupon: '',
              items:items.map((item) => ({
                  item_id: item.id,
                  item_name: item.name,
                  affiliation: "",
                  coupon: "",
                  discount: item.old_price-item.plan.price,
                  index: 0,
                  item_brand: "",
                  item_category: "",
                  item_variant: item.selected_color,
                  location_id: "",
                  price: item.plan.price,
                  quantity: item.plan.quantity,
          }))
            }
          });
        });
  },
  },
}
