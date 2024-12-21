import { EventBus } from "@/lib/event-bus";

const state = {
  items: [],
  plans: [],
};

const getters = {
  inCart: (state) => (item) => {
    return state.items.some(_item => _item.id === item.id);
  },
  total: (state) => {
    return state.items.reduce((acc, item) => {
      if (item.plan.price) {
        return acc + (item.plan.price * item.plan.quantity)
      }
      return acc;
    }, 0);
  },
};

const mutations = {
  addItem: (state, item) => {
    const exists = state.items.some(_item => _item.id === item.id);
    if (exists) {
      state.items = state.items.map(_item => {
        if (_item.id === item.id) {
          return { ..._item, plan: { ...item.plan, quantity: item.plan.quantity } };
        }
        return _item;
      });
    } else {
      state.items.push(item);
    }
  },
  increaseQuantity: (state, id) => {
    state.items = state.items.map(item => {
      if (item.id === id) item.plan.quantity = Math.min((item.maximum_order || 10), item.plan.quantity + 1)
      return item;
    });
  },
  decreaseQuantity: (state, id) => {
    state.items = state.items.map(item => {
      if (item.id === id) item.plan.quantity = Math.max(1, item.plan.quantity - 1)
      return item;
    });
  },
  removeItem: (state, id) => {
    state.items = state.items.filter(item => item.id !== id);
  },
  clear() {
    state.items = []
    state.plans = []
  }
};

const actions = {
  show() {
    EventBus.$emit('cart')
  }
};

const cart = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default cart;
