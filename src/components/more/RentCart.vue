<template>
  <v-card elevation="0">
    <div v-if="view === 'welcome'">
      <v-card-text class="px-8 pt-10 pb-6 px-md-8" ref="content">
        <div class="d-flex align-center justify-space-between mb-6">
          <v-btn icon outlined>
            <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            @click="$emit('close')"
            color="white"
            small
            icon
            style="background: tomato"
          >
            <v-icon size="18">mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          v-if="item.title == 'Find me a house'"
          class="d-flex flex-column align-start fill-width text-title"
        >
          <FindAHouseForm @done="view = 'budget-range'" />
        </div>
        <div
          v-else
          class="d-flex flex-column align-start fill-width text-title"
        >
          <div class="text-h4 font-weight-bold title black--text my-5">
            Welcome. Your one-off registration takes just 5 steps
          </div>
          <div class="mt-5 black--text">
            <div class="text-title black--text mb-5 fill-width text-size">
              1. Register your house
            </div>
            <div class="text-title black--text mb-5 fill-width text-size">
              2. Get connected with a bank
            </div>
            <div class="text-title black--text mb-5 fill-width text-size">
              3. We visit your address in 24-48hrs
            </div>
            <div class="text-title black--text mb-5 fill-width text-size">
              4. You pay 12% deposit & 1st month
            </div>
            <div class="text-title black--text mb-5 fill-width text-size">
              5. Bank pays your landlord immediately
            </div>
          </div>
          <div v-if="item.title == 'Renew Rent'">
            <v-btn
              class="mt-6 px-6"
              color="primary"
              rounded
              elevation="0"
              @click="view = 'rent-form'"
            >
              Renew my rent
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              class="mt-6 px-6"
              color="primary"
              rounded
              elevation="0"
              @click="view = 'rent-form'"
            >
              Pay my rent
            </v-btn>
          </div>
        </div>

        <v-snackbar
          :color="toast.color || ''"
          absolute
          bottom
          v-model="toast.visible"
        >
          {{ toast.message }}
        </v-snackbar>
      </v-card-text>
    </div>
    <RentForm
      @cancel="$emit('close')"
      @close="view = 'welcome'"
      v-if="view === 'rent-form'"
      @done="view = 'rent-amount'"
    />
    <RentAmount
      @cancel="$emit('close')"
      @close="view = 'rent-form'"
      v-if="view === 'rent-amount'"
      @done="view = 'house-type'"
      :item="item"
    />
    <HouseType
      @cancel="$emit('close')"
      @close="view = 'rent-amount'"
      v-if="view === 'house-type'"
      @done="view = 'house-address'"
      :item="item"
    />
    <HouseAddress
      @cancel="$emit('close')"
      @close="view = 'house-type'"
      v-if="view === 'house-address'"
      @done="view = 'picture-upload'"
      :item="item"
    />
    <PictureUpload
      @cancel="$emit('close')"
      @close="view = 'house-address'"
      v-if="view === 'picture-upload'"
      @done="view = 'landlord-number'"
    />
    <LandlordNumber
      @cancel="$emit('close')"
      @close="view = 'picture-upload'"
      v-if="view === 'landlord-number'"
      :item="item"
      @submit="checkRentRequestMutation()"
    />
    <Congratulation
      @cancel="$emit('close')"
      v-if="view === 'congratulations'"
      @done="checkRentRequestQuery()"
    />
    <RequestDetails
      @cancel="$emit('close')"
      @close="view = 'congratulations'"
      v-if="view === 'request-details'"
      @done="view = 'eligibility'"
      @cancelRequest="view = 'cancel-request'"
    />
    <RentEligibility
      v-if="view === 'eligibility'"
      @done="reset()"
      @cancel="view.eligibility = false"
    />
    <CancelRequest 
      @cancel="$emit('close')"
      v-if="view === 'cancel-request'"
      @back="view = 'request-details'"
    />
    <BudgetRange
      @cancel="$emit('close')"
      @close="view = 'welcome'"
      v-if="view === 'budget-range'"
      @done="view = 'select-area'"
    />
    <SelectAreas
      @cancel="$emit('close')"
      @close="view = 'budget-range'"
      v-if="view === 'select-area'"
      @done="view = 'find-house-type'"
    />
    <FindHouseType
      @cancel="$emit('close')"
      @close="view = 'select-area'"
      v-if="view === 'find-house-type'"
      @submit="findMeHouseMutation()"
    />
    <Contact @cancel="$emit('close')" v-if="view === 'contact-us'" />
  </v-card>
</template>

<script>
import RentForm from '../rent/RentForm.vue';
import RentAmount from '../rent/RentAmount.vue';
import HouseType from '../rent/HouseType.vue';
import HouseAddress from '../rent/HouseAddress.vue';
import PictureUpload from '../rent/PictureUpload.vue';
import LandlordNumber from '../rent/LandlordNumber.vue';
import Congratulation from '../rent/Congratulation.vue';
import FindAHouseForm from '../rent/FindAHouseForm.vue';
import BudgetRange from '../rent/BudgetRange.vue';
import SelectAreas from '../rent/SelectAreas.vue';
import FindHouseType from '../rent/FindHouseType.vue';
import Contact from '../rent/Contact.vue';
import RequestDetails from '../rent/RequestDetails.vue';
import RentEligibility from '../rent/RentEligibility.vue';
import CancelRequest from '../rent/CancelRequest.vue';
export default {
  name: 'QuickAddToCart',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      view: 'welcome',
      values: {
        name: '',
        email: '',
        phone: '',
      },
      toast: {
        visible: false,
        color: 'orange',
        message: '',
      },
      price: 0,
      showDetails: false,
      loading: false,
      request: {},
    };
  },
  metaInfo() {
    return {
      title: this.item ? this.item.name : 'Item',
    };
  },
  methods: {
    async checkRentRequestMutation() {
      this.loading = true;
      const payload = {
        full_name: this.$store.state.rent.full_name,
        email: this.$store.state.rent.email,
        phone: this.$store.state.rent.phone,
        amount: this.$store.state.rent.rentAmount,
        house_type: this.$store.state.rent.houseType,
        address: this.$store.state.rent.houseAddress,
        picture: this.$store.state.rent.image,
        landlord_phone: this.$store.state.rent.landlordNumber,
        process_type: this.item.title == 'Renew Rent' ? 'renew' : 'foundhouse',
      };
      console.log('payload', payload);
      try {
        await this.$http.post(
          'https://wema.creditclan.com/rent/create/request',
          payload
        );
        this.view = 'congratulations';
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = '';
    },
    async findMeHouseMutation() {
      this.loading = true;
      const payload = {
        full_name: this.$store.state.rent.full_name,
        email: this.$store.state.rent.email,
        phone: this.$store.state.rent.phone,
        budgetRange: this.$store.state.rent.budgetRange,
        location: this.$store.state.rent.location,
        findHouseType: this.$store.state.rent.findHouseType,
      };
      console.log('payload', payload);
      try {
        await this.$http.post(
          'https://wasapnodeserver.herokuapp.com/findMeHouseRequest',
          payload
        );
        this.view = 'contact-us';
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = '';
    },
    async checkRentRequestQuery() {
      try {
        const res = await this.$http.post(
          'https://wema.creditclan.com/rent/pending/request',
          { phone: this.$store.state.rent.phone }
        );
        (this.request = res.data.request), console.log('request', this.request);
        this.$store.commit('rent/set', { request: this.request });
        this.view = 'request-details';
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
    },
  },
  components: {
    RentForm,
    RentAmount,
    HouseType,
    HouseAddress,
    PictureUpload,
    LandlordNumber,
    Congratulation,
    FindAHouseForm,
    BudgetRange,
    SelectAreas,
    FindHouseType,
    Contact,
    RequestDetails,
    RentEligibility,
    CancelRequest
},
};
</script>

<style scoped>
.text-size {
  font-size: 1.3rem !important;
}
</style>
