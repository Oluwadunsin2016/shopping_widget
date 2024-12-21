import Vue from 'vue'
import VueRouter from 'vue-router'
import Request from '@/views/Request.vue'
import Orders from '@/views/Orders.vue'
import Catalogue from "@/views/Catalogue";
import PageNotFound from "@/views/404";
import NProgress from 'nprogress';
import store from '@/store';
import NetworkError from "@/views/NetworkError";
import Home from "@/views/Home";
import TermsAndConditions from "@/views/TermsAndConditions";
import OtherServices from "@/views/OtherServices.vue";
import LocalDeals from "@/views/LocalDeals.vue";
import DealDetails from "@/views/Deal.vue";
import FourForty from "@/views/FourForty.vue";
// import LandingPage from '../views/LandingPage.vue';
// import ExampleProducts from '../views/ExampleProducts.vue';
import FlashSales from '../views/FlashSales.vue';
import GlobalDeals from '../views/GlobalDeals.vue';
import SearchedProducts from '../components/SearchedProducts.vue';
import Store from '../views/Store.vue';
import MobileApp from '../views/MobileApp.vue';
import Countries from '../views/Countries.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/error/network', name: 'network-error', component: NetworkError },
  { path: '/error/404', name: 'not-found', component: PageNotFound },
  { path: '/terms', name: 'terms', component: TermsAndConditions },
    { path: '/countries/:searchText?', name:'countries', component: Countries },
    { path: '/store/:referralCode?', name:'platform-store', component: Store },
    { path: '/app/:referralCode?', name:'mobile-app', component: MobileApp },
    { path: '/search', name:'search', component: SearchedProducts },
  { path: '/global/:referralCode?', name:'global', component: GlobalDeals },
  { path: '/flash-sales/:referralCode?', name:'flash', component: FlashSales },
  {
    path: '/deals/:id/:referralCode?',
    name: 'deals',
    component: FourForty,
  },
  {
    path: '/local/:referralCode?',
    name: 'local',
    component: LocalDeals,
  },
  {
    path: '/deal/:id/:referralCode?',
    name: 'deal',
    component: DealDetails,
      // beforeEnter: async (to, from, next) => {
      //   const mid = 82540;
      //   if (!store.state.merchant.id) await fetchMerchant(mid);
      //   next();
      // },
  },
   { path: '/:referralCode?', name:'home', component: GlobalDeals },
  {
    path: '/:mid/bills',
    name: 'bills',
    component: OtherServices,
    beforeEnter: async (to, from, next) => {
      const { mid } = to.params
      if (!store.state.merchant.id) await fetchMerchant(mid)
      else if (store.state.merchant.slug !== mid) {
        clearStore()
        await fetchMerchant(mid)
      }
      next()
    },
  },
  {
    path: '/:mid',
    name: 'store',
    component: Home,
    exact: true,
    beforeEnter: async (to, from, next) => {
      const { mid } = to.params
      if (!store.state.merchant.id) await fetchMerchant(mid)
      else if (store.state.merchant.slug !== mid) {
        clearStore()
        await fetchMerchant(mid)
      }
      next()
    },
  },
  {
    path: '/:mid/collections',
    name: 'collections',
    component: Catalogue,
    beforeEnter: async (to, from, next) => {
      const { mid } = to.params
      if (!store.state.merchant.id) await fetchMerchant(mid)
      else if (store.state.merchant.slug !== mid) {
        clearStore()
        await fetchMerchant(mid)
      }
      next()
    },
  },
  {
    path: '/:mid/request/:rid',
    name: 'request',
    component: Request,
    beforeEnter: async (to, from, next) => {
      const { rid, mid } = to.params
      if (!store.state.merchant.id) await fetchMerchant(mid)
      else if (store.state.merchant.slug !== mid) {
        clearStore()
        await fetchMerchant(mid)
      }
      const id = await store.dispatch('request/resolveId', rid)
      if (rid !== store.state.request.slug && rid !== store.state.request.id) {
        await store.dispatch('request/load', id || rid)
      }
      if (!store.state.request.id) return next('/error/404')
      localStorage.setItem('request', rid)
      next()
    },
  },
  {
    path: '/:mid/request/:rid/all',
    name: 'orders',
    component: Orders,
    beforeEnter: async (to, from, next) => {
      const { rid, mid } = to.params
      if (!store.state.merchant.id) await fetchMerchant(mid)
      else if (store.state.merchant.slug !== mid) {
        clearStore()
        await fetchMerchant(mid)
      }
      const id = await store.dispatch('request/resolveId', rid)
      if (rid !== store.state.request.slug && rid !== store.state.request.id) {
        await store.dispatch('request/load', id || rid)
      }
      if (!store.state.merchant.id) {
        await store.dispatch('merchant/get', store.state.request.merchant_id)
      }
      if (!store.state.request.id) return next('/error/404')
      localStorage.setItem('request', rid)
      next()
    },
  },
  { path: '*', component: GlobalDeals },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

const clearStore = () => {
  store.commit('catalogue/clear');
  store.commit('merchant/clear');
  store.commit('global/clear');
  store.commit('merchant/clear');
};

const fetchMerchant = async (slug) => {
  const id = await store.dispatch('merchant/resolveId', slug);
  await store.dispatch('merchant/get', id || slug);
};

router.afterEach(() => {
  NProgress.done();
});

export default router;
