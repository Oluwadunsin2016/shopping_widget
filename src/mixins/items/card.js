import { roundToNearestTen } from "@/lib/utils";

export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      item: {
        no_of_months: 0,
        primary_picture: '',
        secondary_picture: ''
      },
      views: {
        add: false
      },
      interval: null,
      timer: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      discount: null,
      buy_on_credit: true,
      liked: false,
      quantity: 1,
    }
  },
  created() {
    this.item = this.value;
    this.init()
    this.initDiscount();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    async init() {
      this.item.no_of_months = 3;
      this.item.sell_on_credit = 1;
      this.plan = {
        monthly_amount_estimate: roundToNearestTen((+this.price) / (this.item.no_of_months)),
        monthly_amount: roundToNearestTen((+this.item.price) / (this.item.no_of_months)),
        no_of_months: this.item.no_of_months,
        upfront_amount: 0,
        sell_on_credit: 1
      };
      this.liked = (JSON.parse(localStorage.getItem('likes')) || []).includes(this.item.id);
    },
    incrementQuantity() {
      if (this.item.quantity === 1) this.showToast('Only one item available', 'orange');
      this.quantity = Math.min((this.item.maximum_order || 10), this.quantity + 1, this.item.quantity || 1)
    },
    decrementQuantity() {
      if (this.item.quantity === 1) this.showToast('Only one item available', 'orange');
      this.quantity = Math.max(1, this.quantity - 1)
    },
    initDiscount() {
      this.discount = this.getDiscount();
      if (this.discount && this.discount.end) this.startTimer();
    },
    add() {
      this.$bus.$emit('preview', this.item);
    },
    viewPlan() {
      this.$bus.$emit('plans', this.item);
    },
    startTimer() {
      this.countdown(this.discount.end);
      this.interval = setInterval(() => {
        this.countdown(this.discount.end);
      }, 1000);
    },
    clearTimer() {
      if (this.interval) clearInterval(this.interval);
    },
    countdown(date) {
      const future = new Date(date);
      const now = new Date(Date.now());

      if (future < now) {
        this.timer = {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        }
        return
      }

      const diff = future - now;

      this.timer.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.timer.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.timer.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.timer.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
    getDiscount() {
      const { price, discount_price, discount_expiry_date } = this.item
      const discount = {};
      if (discount_price) {
        const diff = price - discount_price;
        const percentage = Math.round((diff * 100) / price);
        if (discount_expiry_date) {
          const end = new Date(discount_expiry_date);
          if (new Date(Date.now()) < end) {
            discount.price = discount_price
            discount.end = end
            discount.percentage = percentage
          }
        } else {
          discount.price = discount_price
          discount.percentage = percentage
        }
      }
      if (discount.price) {
        return discount;
      } else {
        return null
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
  },
  computed: {
    credit() {
      return this.item.sell_on_credit === 1
    },
    rating() {
      return Math.round(this.item.ratings / this.item.total_ratings)
    },
    price() {
      const { discount_price, credit_price, price } = this.item;
      if (this.discount) return discount_price
      else return this.credit ? credit_price || price : price
    },
    monthly_amount() {
      return roundToNearestTen(this.price / this.item.no_of_months);
    },
  }
}
