import http from "../../plugins/http";

const state = {
  best_deals: [],
  best_seller: [],
  categories: [],
  new_arrivals: [],
  payment: {},
  standalone: {
    results: {
      query: '',
      merchantsCount: 0,
      items: []
    }
  },
};

const mutations = {
  set: (state, data) => {
    Object.keys(data).forEach(key => {
      state[key] = data[key];
    })
  },
  update: (state, { key, value }) => {
    state[key] = value
  },
  clear: (state) => {
    state.best_deals = []
    state.best_seller = []
    state.categories = []
    state.new_arrivals = []
    state.payment = {}
  }
};

const actions = {
  async getHomeData({ commit, rootState }) {
    const { data } = await http.get(`/customer/home/${ rootState.merchant.id }`);
    if (!data?.data) throw new Error('Could not get data');
    commit('set', data.data);
  },
};

const global = {
  namespaced: true,
  state,
  getters: {},
  mutations,
  actions
};

export default global;
