import { getPlan, nPercentOf, roundToNearestTen } from "@/lib/utils";

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return ({
      quantity: 1,
      liked: false,
    });
  },
  computed: {
    rating() {
      return Math.round(this.item.ratings / this.item.total_ratings)
    },
    plan() {
      return getPlan({ credit: this.credit, upfront: this.upfront, duration: 2 });
    },
    outright() {
      return roundToNearestTen(((5 * 100) / +this.item.price) + +this.item.price);
    },
    upfront() {
      return roundToNearestTen(nPercentOf(60, +this.item.price));
    },
    credit() {
      return roundToNearestTen(nPercentOf(40, +this.item.price));
    },
    available() {
      return this.plan.monthly < 3000000 && this.plan.monthly > 1
    },
  },
  methods: {
    incrementQuantity() {
      if (this.item.quantity === 1) this.showToast('Only one item available', 'orange');
      this.quantity = Math.min((this.item.maximum_order || 10), this.quantity + 1, this.item.quantity || 1)
    },
    decrementQuantity() {
      if (this.item.quantity === 1) this.showToast('Only one item available', 'orange');
      this.quantity = Math.max(1, this.quantity - 1)
    },
    closeReview(l) {
      this.item.total_ratings = l;
      this.views.reviews = false
    },
    async addView() {
      const views = JSON.parse(localStorage.getItem('views')) || [];
      if (!views.includes(this.item.id)) {
        await this.$http.get(`/item/${ this.item.id }/view`);
        views.push(this.item.id);
        localStorage.setItem('views', JSON.stringify(views));
      }
    },
    async addLike() {
      if (!this.liked) {
        const res = await this.$http.get(`/item/${ this.item.id }/like`);
        if (res.data.status === true) {
          const likes = JSON.parse(localStorage.getItem('likes')) || []
          likes.push(this.item.id);
          localStorage.setItem('likes', JSON.stringify(likes))
          this.liked = true;
          this.item.likes++
        }
      }
    },
    addToCart() {
      const plan = {
        price: this.item.price,
        quantity: this.quantity
      };
      this.$store.commit('cart/addItem', { ...this.item, plan });
      this.$emit('close');
      this.$bus.$emit('cart');
    },
  },
}
