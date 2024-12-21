import http from '../../plugins/http';
import categories from "../../lib/categories.js";

const state = {
  items: [],
  singleItem: [],
  merchantItems: [],
  globalItems: [],
  filteredItems: [],
  searchedItems: [],
  page: {
    count: 12,
    end: false,
    next: 1,
  },
  loading: false,
  fetching: false,
  filtering: false,
  searching: false,
  search: {
    search: '',
    page_number: 1,
    end: false
  },
  filter: {
    min_price: 0,
    max_price: 10000,
    tag_ids: [],
    on_credit: 1,
    min_no_of_months: 1,
    max_no_of_months: 0,
    min_monthly_amount: 1,
    max_monthly_amount: 0,
    page_number: 1,
    end: false,
    sizes: [],
    genders: [],
    shipping_source: 0,
    discount: 0
  }
};

const getters = {};

const mutations = {
  set: (state, data) => {
    Object.keys(data).forEach(key => {
      state[key] = data[key];
    })
  },
  appendGlobalItems: (state, items) => {
    state.globalItems = [...state.globalItems, ...items.filter(i => {
      return !state.globalItems.some(_i => _i.id === i.id)
    })];
  },
  appendMerchantItems: (state, items) => {
    state.merchantItems.push(...items);
  },
  appendFilteredItems: (state, items) => {
    state.filteredItems.push(...items);
  },
  appendSearchedItems: (state, items) => {
    state.searchedItems.push(...items);
  },
  update: (state, { key, value }) => {
    state[key] = value
  },
  cancelFilter: (state) => {
    state.filtering = false;
    state.filteredItems = [];
  },
  cancelSearch: (state) => {
    state.searching = false;
    state.searchedItems = [];
  },
  clear: (state) => {
    state.items = [];
    state.merchantItems = [];
    state.searchedItems = [];
    state.filteredItems = [];
    state.filtering = false;
    state.searching = false;
  }
};

const actions = {
  async globalItems({ state, commit, rootState }) {
    if (state.loading || state.fetching) return;
    const described_item = categories
      .filter(c => JSON.parse(rootState.merchant.categories).includes(c.id))
      .map(c => c.keyword.split(', '))
      .flat();
    if (!state.page.end) {
      commit('update', {
        key: (!state.globalItems.length && !state.merchantItems.length) ? 'loading' : 'fetching',
        value: true
      });
      const payload = {
        described_item: ['iphone', 'apple', 'samsung', 'tecno'],
      };
      const res = await http.post(`/shop/web`, { ...payload, described_item, show_result: true }, {
        params: { page: state.page.next },
      });
      const { data: items, count, next, end } = res.data.data.results_data;
      if (state.page.next === 1) commit('set', { globalItems: items });
      else commit('appendGlobalItems', items);
      commit('set', { page: { count, next, end } });
      commit('update', { key: 'fetching', value: false });
      commit('update', { key: 'loading', value: false });
    }
  },
  async merchantItems({ state, rootState, commit }) {
    if (state.loading || state.fetching) return;
    if (!state.page.end) {
      commit('update', { key: state.page.next === 1 ? 'loading' : 'fetching', value: true });
      const { id } = rootState.merchant;
      const res = await http.post(`/global/catalogue/${ id }`, { page_number: state.page.next });
      const { data: items, count, next, end } = res.data;
      if (state.page.next === 1) commit('set', { merchantItems: items });
      else commit('appendMerchantItems', items);
      commit('set', { page: { count, next, end } });
      commit('update', { key: 'fetching', value: false });
      commit('update', { key: 'loading', value: false });
    }
  },
  async filterItems({ commit, rootState }, values) {
    if (state.loading || state.fetching) return;
    if (!values.end) {
      commit('update', { key: values.page_number === 1 ? 'loading' : 'fetching', value: true });
      const res = await http.post(`/catalogue/filter`, { ...values, merchant_id: rootState.merchant.id });
      const page_number = res.data.next ? values.page_number + 1 : values.page_number;
      commit('set', { filter: { ...values, page_number, end: res.data.end } });
      commit('set', { filtering: true });
      if (page_number === 1) commit('set', { filteredItems: res.data.data });
      else commit('appendFilteredItems', res.data.data);
      commit('update', { key: 'fetching', value: false });
      commit('update', { key: 'loading', value: false });
    }
  },
  async searchItems({ commit, rootState }, values) {
    if (state.loading || state.fetching) return;
    if (!values.end) {
      commit('update', { key: values.page_number === 1 ? 'loading' : 'fetching', value: true });
      const res = await http.post(`/global/search`, { ...values, merchant_id: rootState.merchant.id });
      const page_number = res.data.next ? values.page_number + 1 : values.page_number;
      commit('set', { search: { ...values, page_number, end: res.data.end } });
      commit('set', { searching: true });
      if (page_number === 1) commit('set', { searchedItems: res.data.data });
      else commit('appendSearchedItems', res.data.data);
      commit('update', { key: 'fetching', value: false });
      commit('update', { key: 'loading', value: false });
    }
  },
  async resolveItemId(_, slug) {
    const { data: { data } } = await http.get(`/2/slug/${ slug }`);
    return data;
  }
};

const catalogue = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default catalogue;
