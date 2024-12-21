import http from "../../plugins/http";
import defaultSlides from '../../lib/default-slides';
import { shuffleArray } from "../../lib/utils.js";
import categories from "../../lib/categories.js";

const state = {
  id: null,
  banner_slides: [],
  sections: [],
  items_display: 3,
  theme_color: '',
  phone: '',
  template: 1,
  filter_position: 'side-short',
  details_template: 1,
  collection_banner: true,
  partnership: 0,
  show_product_ratings: true,
  show_product_comments: true,
  slug: null,
  collection: 0,
  eligibility: 0,
  insurance: 0,
  widget: 0,
  name: '',
  business_type: null,
  reseller: 0,
  categories: '[]'
};

const getters = {
  theme: (state) => {
    const {
      banner_slides = [], sections, items_display, theme_color, filter_position, collection_banner, details_template,
      show_product_comments, show_product_ratings
    } = state;
    return {
      banner_slides: banner_slides?.length ? banner_slides : defaultSlides,
      sections: sections || [
        { name: 'home_banner', enabled: true, required: true },
        { name: 'top_deals', enabled: true, columns: 2, required: false },
        { name: 'best_sellers', enabled: true, columns: 2, required: false },
        { name: 'new_arrivals', enabled: true, columns: 2, required: false },
        { name: 'categories', enabled: true, required: false },
        { name: 'footer', enabled: true, required: true },
      ],
      items_display: items_display || 3,
      theme_color,
      filter_position: filter_position || 'side-short',
      collection_banner,
      details_template: details_template || 1,
      show_product_comments,
      show_product_ratings
    }
  },
  template: (state) => state.template || 3,
  images: (state) => {
    return shuffleArray(categories.find(c => c.id === state.business_type)?.images() ?? []);
  },
  banners: (state) => {
    return shuffleArray(categories.find(c => c.id === state.business_type)?.banners() ?? []);
  },
  headings: (state) => {
    return [
      'Shop now',
      'Buy now',
      'Enjoy shopping',
      'Buy great products',
      'Amazing products',
      'We are budget friendly',
      'You are in safe hands',
      'Get your products',
      'Thank us later.',
      'Buy now',
      'Buy {}',
      'Buy {} at great prices',
      'Buy {}',
      'Buy {}',
      'Get {}',
      'Buy great {}',
      'Amazing {}',
      'Buy budget friendly {}',
      'Get your {}'
    ].map(s => {
      return s.replaceAll('{}', categories.find(c => c.id === (state.business_type || 12)).filler);
    });
  },
};

const mutations = {
  set: (state, data) => {
    Object.keys(data).forEach(key => {
      state[key] = data[key];
    })
  },
  clear: (state) => {
    Object.keys(state).forEach(key => {
      state[key] = null;
    })
  }
};

const actions = {
  async get({ commit }, id) {
    const { data } = await http.post('/merchant', { id });
    if (!data.data) throw new Error('Merchant not found');
    commit('set', data.data);
  },
  async resolveId(_, slug) {
    const { data: { data } } = await http.get(`/1/slug/${ slug }`);
    return data;
  }
};

const merchant = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default merchant;
