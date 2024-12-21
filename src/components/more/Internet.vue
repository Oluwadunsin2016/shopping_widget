<template>
    <v-card flat class="fill-height lighten-4">
        <v-card-text v-if="view === 'form'" class="pa-0 fill-height d-flex flex-column">
            <div>
                <div class="px-8 pt-10 pb-6 white border-bottom">
                    <div class="d-flex align-center justify-space-between">
                        <div class="text-h4 font-weight-bold title black--text">Buy Data</div>
                        <v-btn @click="$emit('close')" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <p class="mt-2 black--text">Specify how much data you want to buy</p>
                </div>
                <div class="grey lighten-4" style="height: 570px">
                    <div class="py-6 px-8">
                        <div class="mt-1 black--text">
                            <p style="font-size: 1.1rem">Tap to select network</p>
                            <v-row dense>
                                <v-col v-for="p in internet_plans" :key="p.id" class="text-center cursor-pointer"
                                    cols="3" style="height: 100px">
                                    <div class="airtime-item rounded-lg" :class="plan === p.id ? 'active' : ''">
                                        <v-card outlined class="pa-2 fill-height" @click="handleSelectPlan(p.id)">
                                            <v-img :src="p.img" height="60px" contain alt=""></v-img>
                                        </v-card>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <ValidationObserver ref="observer">
                            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                <div class="mt-10 d-flex justify-space-between align-center">
                                    <v-text-field hide-details label="Full Name" :error-messages="errors" type="text"
                                        v-model="values.name" value="10.00">
                                    </v-text-field>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider name="state" rules="required" v-slot="{ errors }">
                                <v-select :disabled="loadSelect" return-object :error-messages="errors" :items="plans"
                                    :loading="!plans.length" dense label="Select Plan" v-model="values.plan"
                                    class="mt-10" @change="choosePlan(values.plan)">
                                </v-select>
                            </ValidationProvider>
                            <ValidationProvider name="amount" rules="required" v-slot="{ errors }">
                                <div class=" d-flex justify-space-between align-center">
                                    <v-text-field disabled hide-details label="Enter Amount" :error-messages="errors"
                                        type="number" prefix="₦" v-model="values.amount" value="10.00">
                                    </v-text-field>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider name="full_name" rules="required|phone" v-slot="{ errors }">
                                <v-text-field v-model="values.phone" :error-messages="errors" hide-details
                                    label="Enter Phone Number" class="mt-5">
                                </v-text-field>
                            </ValidationProvider>
                            <v-btn elevation="0" color="primary" solid block class="mt-15" @click="submit">
                                Proceed
                            </v-btn>
                        </ValidationObserver>
                    </div>
                </div>

                <v-card-text v-if="view === 'success'"
                    class="py-16 text-center d-flex flex-column justify-center align-center">
                    <br><br><br>
                    <v-icon color="green" size="100">mdi-check-circle</v-icon>
                    <h4 class="mx-auto mt-10" style="font-size: 1.3rem; max-width: 250px">
                        Data Topup successful
                    </h4>
                    <p class="mt-3 grey--text text--darken-3" style="max-width: 300px">
                        Yello! data subscription of {{ values.amount }} has been successfully recharged to {{ values.phone }}
                    </p>
                    <v-btn @click="$emit('close')" class="mt-6" outlined rounded elevation="0">
                        Close
                    </v-btn>
                    <br><br><br>
                </v-card-text>

                <Modal v-model="views.pay" persistent>
                    <MakePayment :name="values.name" :phone="values.phone" :amount="+values.amount"
                        @done="handlePaymentDone()" @cancel="closeViews()" />
                </Modal>

                <Modal v-model="views.loading" class="text-center">
                    <v-sheet class="d-flex flex-column align-center justify-center text-center">
                        <br /><br /><br />
                        <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
                        <p class="mx-auto mt-10 black--text" style="max-width: 300px">
                            {{ loading || 'Please wait..' }}
                        </p>
                        <br /><br /><br />
                    </v-sheet>
                </Modal>
            </div>
            <img src="../../assets/images/happy-straight.png" alt="" class="fill-width mt-auto" />
        </v-card-text>
    </v-card>
</template>

<script>
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

import views from "@/mixins/views.js";
import Modal from "@/components/Modal.vue";
import MakePayment from "../payment/MakePayment.vue";
import axios from 'axios';

export default {
    name: 'Internet',
    mixins: [views],
    components: { Modal, MakePayment },
    data() {
        return {
            values: {
                amount: 0,
                phone: "",
                email: '',
                plan: '',
                name: ''
            },
            views: {
                pay: false,
                loading: false,
            },
            email: '',
            variation_code: '',
            cards: [],
            view: 'form',
            loading: '',
            loadSelect: false,
            plan: '',
            data: {},
            plans: [],
            tab: "",
            internet_plans: [
                { id: 'mtn-data', name: 'MTN', img: '/img/logos/mtn.jpg' },
                { id: 'airtel-data', name: 'Airtel', img: '/img/logos/airtel.png' },
                { id: 'glo', name: 'Glo', img: '/img/logos/glo.png' },
                { id: '9mobile', name: '9mobile', img: '/img/logos/9mobile.png' },
            ]
        };
    },
    methods: {
        async submit() {
            if (!await this.$refs.observer.validate()) return;
            if (!+this.values.amount) return this.$bus.$emit('toast', {
                color: 'red', message: 'Please enter amount'
            });
            if (!this.plan) return this.$bus.$emit('toast', {
                color: 'red', message: 'Please select network'
            });
            this.showView('pay');
        },

        async handleSelectPlan(plan) {
            this.plan = plan;
            const res = await this.$http.post('https://creditclan-kycs.herokuapp.com/api/more-widget/data_variation_code', { network: plan })

            let result = res.data.data.content.varations

            this.plans = result.map((m) => {
                return { ...m, value: m.variation_code, text: m.name }
            })
        },

        choosePlan(data) {
            this.variation_code = data.variation_code
            this.values.amount = data.variation_amount
        },

        async handlePaymentDone() {
            this.showView('loading')
            this.loading = 'Creating request...'
            const res = await axios.post('https://creditclan-kycs.herokuapp.com/api/more-widget/data_subscription', { serviceID: this.plan, amount: this.values.amount, phone: this.values.phone, name: this.values.name, billerCode: this.values.phone, variation_code: this.variation_code, source: 'merchant store' })
            if (res.data.status) {
                this.closeViews();
                this.loading = false;
                this.view = 'success';
            } else {
                this.$bus.$emit('toast', {
                    color: 'red', message: 'Something went wrong'
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.airtime-item {
    transition: all .2s ease-in-out;

    &.active {
        border: 2px solid #508d3a;
        padding: .2rem;
    }
}
</style>
