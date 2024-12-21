<template>
  <v-card class="fill-height lighten-4">
    <v-card-text class="pa-0 fill-height d-flex flex-column">
      <div class="px-8 pt-10 pb-6 white border-bottom">
        <div class="d-flex align-center justify-space-between">
          <div class="text-h4 font-weight-bold title black--text">
            Buy your favourite movies ticket now
          </div>
          <v-btn @click="$emit('close')" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <p class="mt-2 black--text">
          Watch your choice movie now, Pay Small Small
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
            v-for="(item, i) in movies"
            :key="i"
            @click="handleClick(item)"
          >
            <div class="position-relative d-flex pa-2">
              <v-img
                :src="item.image"
                width="100"
                height="100"
                class="rounded-lg"
                cover
              ></v-img>
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
                    {{ item.span }}
                  </div>
                  <div class="text-title black--text mt-2">
                    {{ item.showingAt[0].screens[0].price | currency }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <v-dialog
          v-if="$vuetify.breakpoint.smAndDown"
          v-model="views.details"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <MovieCart
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
          <MovieCart
            v-if="current"
            :item="current"
            @close="handleDetailsClose()"
            @watch="handleWatch"
          />
        </v-navigation-drawer>

        <v-dialog
          v-if="$vuetify.breakpoint.smAndDown"
          v-model="views.checkout"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <MoviesCheckOut
            v-if="current"
            :movie="current"
            @cancel="showView('details')"
          />
        </v-dialog>
        <v-navigation-drawer
          v-else
          v-model="views.checkout"
          fixed
          right
          temporary
          width="550"
        >
          <MoviesCheckOut
            v-if="current"
            :movie="current"
            @cancel="showView('details')"
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
import axios from 'axios';
import { evalJson } from '../../lib/utils';
import MovieCart from './MovieCart.vue';
import MoviesCheckOut from './MoviesCheckOut.vue';
import views from '../../mixins/views';

export default {
  name: 'Movies',
  mixins: [views],
  components: { MovieCart, MoviesCheckOut },
  data() {
    return {
      views: {
        search: false,
        checkout: false,
        details: false,
        card: false,
        success: false,
        ads: false,
        plans: false,
        subscription: true,
      },
      current: null,
      swiperOptions: {
        slidesPerView: 1.3,
        spaceBetween: 15,
        breakpoints: {
          640: {
            slidesPerView: 2.5,
          },
          700: {
            slidesPerView: 3.5,
          },
          900: {
            slidesPerView: 1.5,
          },
        },
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 10000,
      },
      movies: [],
      loading: false,
    };
  },
  created() {
    this.getMovies();
  },
  watch: {
    cinema() {
      this.getMovies();
    },
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
    handleWatch(movie) {
      this.showView('checkout');
      this.current = movie;
      console.log(movie);
    },
    handleDetailsClose() {
      this.closeViews();
      this.current = null;
    },
  },
};
</script>

<style scoped>
.view-more {
  opacity: 0;
  transition: 0.5s ease-in-out;
  margin-top: 10px;
}

.view-more a {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 4px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  transition: 0.5s ease-in-out;
  border-radius: 4px;
}

.view-more:hover a {
  background: #fff;
  border: 1px solid #fff;
  color: #000;
}

.ccc:hover .view-more {
  opacity: 1;
  transform: translateX(5px);
}

.bounce {
  animation: bounce 1s ease infinite alternate;
  transition: all 0.3s;
}

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>
