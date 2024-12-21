<template>
  <div>
    <v-bottom-navigation
      dark
      fixed
      grow
      height="70"
      mandatory
      v-model="nav"
      style="background: #06202f"
    >
      <v-btn
        :to="`/${$store.state.merchant.slug}`"
        :color="
          $route.path === `/${$store.state.merchant.slug}` ? 'primary' : ''
        "
      >
        <span>Home</span>
        <v-icon>mdi-store</v-icon>
      </v-btn>
      <v-btn
        :to="`/${this.$store.state.merchant.slug}/collections`"
        :color="
          $route.path === `/${$store.state.merchant.slug}/collections`
            ? 'primary'
            : ''
        "
      >
        <span>Shop</span>
        <v-icon>mdi-view-agenda</v-icon>
      </v-btn>

      <v-btn
        @click="gotoOrder()"
        :class="
          $route.path === `/${$store.state.request.customer_slug}/orders`
            ? 'primary'
            : ''
        "
      >
        <!-- <v-btn
        @click="gotoOrder()"
        :class="$route.path === `/request/${$store.state.request.slug}` ? 'primary' : ''"
      > -->
        <span>Order</span>
        <v-icon>mdi-file-document</v-icon>
      </v-btn>

      <v-btn
        @click="gotoOrders()"
        :class="
          $route.path === `/${$store.state.request.customer_slug}/orders`
            ? 'primary'
            : ''
        "
      >
        <!-- <v-btn
        @click="gotoOrder()"
        :class="$route.path === `/request/${$store.state.request.slug}` ? 'primary' : ''"
      > -->
        <span>Orders</span>
        <v-icon>mdi-file-document</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-dialog max-width="350" v-model="views.noOrder">
      <v-card class="pa-3">
        <v-card-title>No order found!</v-card-title>
        <v-card-text>
          We could not find any order, click on the button below to create a
          manual order.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :to="`/${this.$store.state.merchant.slug}/collections`"
            color="primary darken-1"
            rounded
            class="px-4"
            elevation="0"
            views.noOrder="false"
          >
            Create order
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="350" v-model="views.noOrders">
      <v-card class="pa-3">
        <v-card-title>No order found!</v-card-title>
        <v-card-text>
          Provide your order email below.
        </v-card-text>
        <v-card-actions>
          <div class="d-grid gap-2">
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                class="input-lg"
                :disabled="loading"
                :error-messages="errors"
                dense
                label="Email"
                v-model="values.email"
              ></v-text-field>
            </ValidationProvider>
            <v-btn
              @click="fetchOrders()"
              color="primary darken-1"
              rounded
              class="px-4"
              elevation="0"
              views.noOrders="false"
            >
              Request your orders
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import views from '../../mixins/views'

export default {
  name: 'BottomNavigationStore',
  mixins: [views],
  data: () => ({
    nav: 0,
    views: {
      noOrder: false,
      noOrders: false,
    },
    loading: false,
    values: {
      email: '',
    },
  }),
  methods: {
    gotoOrder() {
      const slug =
        localStorage.getItem('request') || this.$store.state.request.slug
      if (slug)
        this.$router.push(`/${this.$store.state.merchant.slug}/request/${slug}`)
      else this.views.noOrder = true
    },
    gotoOrders() {
      const slug =
        localStorage.getItem('request') || this.$store.state.request.slug
      if (slug)
        this.$router.push(
          `/${this.$store.state.merchant.slug}/request/${slug}/all`
        )
      else this.views.noOrders = true
    },
    async fetchOrders() {
      console.log('fetch oders to email address')
      try {
        const email = this.values
        const res = await this.$http.post(
          `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/send_order_email`,
          {
            email: email,
          }
        )
        console.log(res, 'ressponserrrr')
        console.log('fetch oders to email address successfull')
        if (res.data.status) {
          return this.$bus.$emit('toast', {
            message: res.data.mesage,
            color: 'green',
          })
        }
        // return res.data?.data
      } catch (e) {
        return this.$bus.$emit('toast', {
          message: e.response.data?.mesage || e?.mesage,
        })
        // console.log(e)
      }
    },
  },
}
</script>
