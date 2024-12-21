<template>
  <v-card flat class="fill-height lighten-4">
    <v-card-text class="pa-0 fill-height d-flex flex-column">
      <div class="px-8 pt-10 pb-6 white border-bottom">
        <div class="d-flex align-center justify-space-between">
          <div class="text-h4 font-weight-bold title black--text">
            Welcome to Rent now, Pay later
          </div>
          <v-btn @click="$emit('close')" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <p class="mt-2 black--text text-title">
          Please choose a rent now pay later option
        </p>
      </div>
      <div class="grey lighten-4">
        <div class="py-6 px-8">
          <v-row v-if="loading">
            <v-col v-for="i in 4" cols="12" md="6" :key="i">
              <div>
                <v-skeleton-loader
                  :boilerplate="true"
                  :loading="true"
                  :tile="false"
                  :type="'image'"
                  class="fill-width fill-height align-self-stretch"
                  height="200px"
                >
                </v-skeleton-loader>
                <v-skeleton-loader
                  :boilerplate="true"
                  :loading="true"
                  :tile="false"
                  :type="'image'"
                  class="fill-width fill-height align-self-stretch"
                  height="200px"
                >
                </v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
          <v-card
            class="position-relative flex-grow-1 rounded-lg d-flex flex-row align-center mb-2"
            light
            style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
            v-for="(item, i) in plans"
            :key="i"
            @click="handleClick(item)"
          >
            <div class="position-relative d-flex pa-2">
              <v-icon large :color="item.color" class="mr-3">{{
                item.icon
              }}</v-icon>
            </div>

            <div
              class="px-3 py-3 px-md-4 flex-grow-1 d-flex flex-column align-start justify-center"
            >
              <div
                :title="item.title"
                class="text-title black--text mb-1 font-weight-bold fill-width"
              >
                {{ item.title }}
              </div>
              <div class="d-flex justify-space-between fill-width">
                <div class="mt-1 fill-width">
                  <div class="text-title black--text">
                    {{ item.subTitle }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
          <div class="d-flex align-baseline justify-space-between">
            <p>Already have a loan request?</p>
            <v-btn
              class="mt-6 px-6"
              color="primary"
              rounded
              elevation="0"
              @click="emitCheck()"
            >
              Check request
            </v-btn>
          </div>
        </div>

        <v-dialog
          v-if="$vuetify.breakpoint.smAndDown"
          v-model="views.details"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <RentCart
            v-if="current"
            :item="current"
            @close="
              views.details = false;
              current = null;
            "
            @watch="handleWatch"
          />
        </v-dialog>
        <v-navigation-drawer
          v-else
          v-model="views.details"
          fixed
          right
          temporary
          width="550"
        >
          <RentCart
            v-if="current"
            :item="current"
            @close="
              views.details = false;
              current = null;
            "
            @watch="handleWatch"
          />
        </v-navigation-drawer>
        
        <v-dialog
          v-if="$vuetify.breakpoint.smAndDown"
          v-model="views.checkRequest"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <CheckRequest
            :item="current"
            @close="handleDetailsClose()"
            @watch="handleWatch"
          />
        </v-dialog>
        <v-navigation-drawer
          v-else
          v-model="views.checkRequest"
          fixed
          right
          temporary
          width="550"
        >
        <CheckRequest
            :item="current"
            @close="handleDetailsClose()"
            @watch="handleWatch"
          />
        </v-navigation-drawer>
      </div>
      <img
        src="../../assets/images/happy-straight.png"
        alt=""
        class="fill-width mt-auto"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import views from '../../mixins/views';
import axios from 'axios';
import { evalJson } from '../../lib/utils';
import RentCart from './RentCart.vue';
import CheckRequest from '../rent/CheckRequest.vue';
export default {
  name: 'Rent',
  mixins: [views],
  data() {
    return {
      views: {
        details: false,
        checkRequest: false,
      },
      plans: [
        {
          id: 1,
          icon: 'mdi-home',
          title: 'Renew Rent',
          subTitle:
            'Renew your house rent on a monthly basis while we handle the full payment',
          color: 'green',
        },
        {
          id: 2,
          icon: 'mdi-key-chain',
          title: 'I have found a house',
          subTitle:
            'Let us pay for the house you have found and you can move in immediately',
          color: 'red',
        },
        {
          id: 3,
          icon: 'mdi-home-search',
          title: 'Find me a house',
          subTitle: 'Let us find you a house that suits your preference',
          color: 'blue',
        },
      ],
      loading: false,
      current: null,
    };
  },
  methods: {
    async getMovies() {
      this.movies = [];
      this.loading = true;
      try {
        const res = await axios.get(
          `https://sellbackend.creditclan.com/parent/index.php/globalapi/all_movies`
        );
        this.movies = res.data.data
          .map((m) => ({
            ...m,
            showingAt: evalJson(m.showingAt),
          }))
          .reverse();
      } catch (e) {
        console.log({ e });
      }
      this.loading = false;
    },
    handleClick(category) {
      this.current = category;
      this.showView('details');
    },
    emitCheck() {
      this.showView('checkRequest');
    },
    handleWatch(movie) {
      this.showView('checkout');
      this.current = movie;
    },
    handleDetailsClose() {
      this.closeViews();
      this.current = null;
    },
  },
  components: { RentCart, CheckRequest },
};
</script>

<style></style>
