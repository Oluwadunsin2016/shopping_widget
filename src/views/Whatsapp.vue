<template>
  <v-container class="pa-0">
    <div class="banner-wrap d-flex flex-column justify-center">
      <div class="banner-wrap-top pt-16 pb-10 pb-md-16">
        <v-container class="py-10 position-relative overflow-hidden px-0">
          <div
            class="pa-5 pa-md-10 text-left text-md-center mx-md-auto overflow-hidden"
            style="min-width: 300px; max-width: 700px; width: fit-content;"
          >
            <div class="banner-title text-h5 text-md-h3 black--text font-weight-bold pr-5">Shop now, pay thrice</div>
            <div :class="{'line-effect': $vuetify.breakpoint.smAndDown}" class="text-title black--text mt-5">
              Get started now
            </div>
            <v-btn
              @click="shop = true" class="mt-12" color="primary" elevation="0"
              large rounded v-if="$vuetify.breakpoint.mdAndUp"
            >
              Shop now
              <v-icon class="ml-3">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              @click="shop = true" class="mt-6 mt-md-12" color="primary" elevation="0" fixed
              large style="right: -5px; bottom: 80px; z-index: 10; border-radius: 30px 0 0 30px" v-else
            >
              Shop now
              <v-icon class="ml-3">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
          <div class="absolute right top" style="transform: translate(40%, 10px) rotate(-10deg); opacity: .2"
               v-if="$vuetify.breakpoint.mdAndDown">
            <v-icon color="primary" size="180">mdi-whatsapp</v-icon>
          </div>
        </v-container>
      </div>
    </div>

    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="shop">
      <WhatsappPurchaseFlow @close="shop = false"/>
    </v-dialog>

    <div class="pa-6">
      <ItemCardLoading/>
    </div>

    <BottomNavigationStore/>
  </v-container>
</template>

<script>
import BottomNavigationStore from "../components/nav/BottomNavigationStore";
import WhatsappPurchaseFlow from "../components/whatsapp/WhatsappPurchaseFlow";
import ItemCardLoading from "../components/templates/elements/ItemCardLoading";

export default {
  name: "WhatsApp",
  components: { ItemCardLoading, WhatsappPurchaseFlow, BottomNavigationStore },
  data() {
    return {
      shop: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/variables.scss";

.whatsapp-wrap {
  height: calc((var(--vh, 1vh) * 100) - 70px);
}

.banner-wrap {
  position: relative;
  background-color: #fff;
}

.line-effect {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 103%;
    width: 100%;
    height: 2px;
    background: #424242;
  }
}
</style>
