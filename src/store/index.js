import Vuex from 'vuex';
import Vue from 'vue';
import loader from './modules/loader';
import catalogue from './modules/catalogue';
import cart from './modules/cart';
import request from './modules/request';
import customer from './modules/customer';
import merchant from './modules/merchant';
import global from './modules/global';
import rent from './modules/rent';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    catalogue,
    cart,
    request,
    customer,
    merchant,
    global,
    rent,
  },
});
