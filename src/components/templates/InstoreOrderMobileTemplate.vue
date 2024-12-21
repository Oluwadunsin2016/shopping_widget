<template>
  <div class="grey lighten-4">
    <div class="mx-auto position-relative bg-white" style="max-width: 500px">
      <InstoreOrderTemplate1 v-if="template === 1"/>
      <InstoreOrderTemplate2 v-if="template === 2"/>
      <InstoreOrderTemplate3 v-if="template === 3"/>
      <InstoreOrderTemplate4 v-if="template === 4"/>
      <InstoreOrderTemplate5 v-if="template === 5"/>
      <InstoreOrderTemplate6 v-if="template === 6"/>
      <InstoreOrderTemplate7 v-if="template === 7"/>
      <InstoreOrderTemplate8 v-if="template === 8"/>
      <InstoreOrderTemplate9 v-if="template === 9"/>
      <InstoreOrderTemplate10 v-if="template === 10"/>
      <InstoreOrderTemplate11 v-if="template === 11"/>
      <InstoreOrderTemplate12 v-if="template === 12"/>
      <InstoreOrderTemplate13 v-if="template === 13"/>
      <InstoreOrderTemplate14 v-if="template === 14"/>
      <InstoreOrderTemplate15 v-if="template === 15"/>
      <InstoreOrderTemplate16 v-if="template === 16"/>
      <InstoreOrderTemplate17 v-if="template === 17"/>
      <InstoreOrderTemplate18 v-if="template === 18"/>
      <InstoreOrderTemplate19 v-if="template === 19"/>
    </div>
    <BottomNavigationStore/>
  </div>
</template>

<script>
import InstoreOrderTemplate1 from "../../components/templates/InstoreOrderTemplate1.vue";
import InstoreOrderTemplate2 from "../../components/templates/InstoreOrderTemplate2.vue";
import InstoreOrderTemplate3 from "../../components/templates/InstoreOrderTemplate3.vue";
import InstoreOrderTemplate4 from "../../components/templates/InstoreOrderTemplate4.vue";
import InstoreOrderTemplate5 from "../../components/templates/InstoreOrderTemplate5.vue";
import InstoreOrderTemplate6 from "../../components/templates/InstoreOrderTemplate6.vue";
import InstoreOrderTemplate7 from "../../components/templates/InstoreOrderTemplate7.vue";
import InstoreOrderTemplate8 from "../../components/templates/InstoreOrderTemplate8.vue";
import InstoreOrderTemplate9 from "../../components/templates/InstoreOrderTemplate9.vue";
import InstoreOrderTemplate10 from "../../components/templates/InstoreOrderTemplate10.vue";
import InstoreOrderTemplate11 from "../../components/templates/InstoreOrderTemplate11.vue";
import InstoreOrderTemplate12 from "../../components/templates/InstoreOrderTemplate12.vue";
import InstoreOrderTemplate13 from "../../components/templates/InstoreOrderTemplate13.vue";
import InstoreOrderTemplate14 from "../../components/templates/InstoreOrderTemplate14.vue";
import InstoreOrderTemplate15 from "../../components/templates/InstoreOrderTemplate15.vue";
import InstoreOrderTemplate16 from "../../components/templates/InstoreOrderTemplate16.vue";
import InstoreOrderTemplate17 from "../../components/templates/InstoreOrderTemplate17.vue";
import InstoreOrderTemplate18 from "../../components/templates/InstoreOrderTemplate18.vue";
import InstoreOrderTemplate19 from "../../components/templates/InstoreOrderTemplate19.vue";
import BottomNavigationStore from "../../components/nav/BottomNavigationStore.vue";
import { getRandomIntInclusive } from "../../lib/utils.js";

export default {
  name: "InstoreOrderMobileTemplate",
  components: {
    BottomNavigationStore,
    InstoreOrderTemplate19,
    InstoreOrderTemplate18,
    InstoreOrderTemplate17,
    InstoreOrderTemplate16,
    InstoreOrderTemplate15,
    InstoreOrderTemplate14,
    InstoreOrderTemplate13,
    InstoreOrderTemplate12,
    InstoreOrderTemplate11,
    InstoreOrderTemplate10,
    InstoreOrderTemplate9,
    InstoreOrderTemplate8,
    InstoreOrderTemplate7,
    InstoreOrderTemplate6,
    InstoreOrderTemplate5,
    InstoreOrderTemplate4,
    InstoreOrderTemplate3,
    InstoreOrderTemplate2,
    InstoreOrderTemplate1,
  },
  computed: {
    template() {
      const { template } = this.$store.state.merchant;
      if (+template >= 1 && +template <= 19) return +template;
      return getRandomIntInclusive(1, 19);
    }
  }
}
</script>
