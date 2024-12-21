<template>
    <v-card class="fill-height lighten-4">
        <v-card-text v-if="view === 'form'" class="pa-0 fill-height d-flex flex-column">
            <div>
                <div class="px-8 pt-10 pb-6 white border-bottom">
                    <div class="d-flex align-center justify-space-between">
                        <div class="text-h4 font-weight-bold title black--text">Subscribe for your favourite cable tv
                        </div>
                        <v-btn @click="$emit('close')" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <p class="mt-2 black--text">Specify how much subscription you want to buy</p>
                </div>
                <div class="grey lighten-4" style="height: 570px">
                    <div class="py-6 px-8">
                        <div class="mt-1 black--text">
                            <p style="font-size: 1.1rem">Tap to select network</p>
                            <v-row dense>
                                <v-col v-for="p in cable_plans" :key="p.id" class="text-center cursor-pointer" cols="3"
                                    style="height: 100px">
                                    <div class="airtime-item rounded-lg" :class="plan === p.id ? 'active' : ''">
                                        <v-card outlined class="pa-2 fill-height" @click="handleSelectPlan(p.id)">
                                            <v-img :src="p.img" height="60px" contain alt=""></v-img>
                                        </v-card>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <template v-if="message && message.error">
                            <v-alert border="left" color="red" dark class="mt-5">
                                {{message.error}}
                            </v-alert>
                        </template>
                        <template v-if="message && !message.error">
                            <v-alert border="left" color="green" dark class="mt-5">
                                Customer Name: {{message.Customer_Name}}
                            </v-alert>
                        </template>
                        <ValidationObserver ref="observer">
                            <ValidationProvider name="state" rules="required" v-slot="{ errors }">
                                <v-select :disabled="loadSelect" return-object :error-messages="errors" :items="plans"
                                    :loading="!plans.length" dense label="Select Plan" v-model="values.plan"
                                    class="mt-10" @change="choosePlan(values.plan)">
                                </v-select>
                            </ValidationProvider>
                            <ValidationProvider name="amount" rules="required" v-slot="{ errors }">
                                <div class=" d-flex justify-space-between align-center">
                                    <v-text-field hide-details label="Enter Amount" :error-messages="errors" disabled
                                        prefix="₦" v-model="values.amount" value="10.00">
                                    </v-text-field>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider name="smartcardno" rules="required" v-slot="{ errors }">
                                <v-text-field v-model="values.card_no" :error-messages="errors" type="number"
                                    hide-details label="Smart Card Number" class="mt-5">
                                </v-text-field>
                            </ValidationProvider>
                            <v-btn elevation="0" color="primary" solid block class="mt-15" @click="submit"
                                :loading="loading">
                                {{submit_text}}
                            </v-btn>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
            <img src="../../assets/images/happy-straight.png" alt="" class="fill-width mt-auto" />
        </v-card-text>

        <v-card-text v-if="view === 'success'" class="py-16 text-center d-flex flex-column justify-center align-center">
            <br><br><br>
            <v-icon color="green" size="100">mdi-check-circle</v-icon>
            <h4 class="mx-auto mt-10" style="font-size: 1.3rem; max-width: 250px">
                Payment Succesfully
            </h4>
            <p class="mt-3 grey--text text--darken-3" style="max-width: 300px">
                Yello! Cabletv recharge of {{ values.amount }} was succesful
            </p>
            <v-btn @click="$emit('close')" class="mt-6" outlined rounded elevation="0">
                Close
            </v-btn>
            <br><br><br>
        </v-card-text>
        <Modal v-model="views.pay" persistent>
            <MakePayment :name="values.name" :phone="values.phone" :amount="+values.amount" @done="handlePaymentDone()"
                @cancel="closeViews()" />
        </Modal>
        <Modal v-model="views.loading" class="py-16 text-center">
            <v-sheet class="d-flex flex-column align-center justify-center text-center">
                <br /><br /><br />
                <v-progress-circular color="primary" indeterminate size="25"></v-progress-circular>
                <p class="mx-auto mt-10 black--text" style="max-width: 300px">
                    {{ loading || 'Please wait..' }}
                </p>
                <br /><br /><br />
            </v-sheet>
        </Modal>
    </v-card>
</template>

<script>
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

import Modal from "@/components/Modal.vue";
import views from "@/mixins/views.js";
import MakePayment from "../payment/MakePayment.vue";
import axios from 'axios'

export default {
    name: 'CableTv',
    mixins: [views],
    components: { Modal, MakePayment },
    data() {
        return {
            values: {
                amount: 0,
                phone: "09039719017",
                email: '',
                card_no: '',
                name: '',
                variation_code: ''
            },
            email: '',
            views: {
                pay: false,
                loading: false,
            },
            view: 'form',
            loading: false,
            loadSelect: false,
            plan: '',
            plans: [],
            cards: [],
            submit_text: 'Submit',
            message: '',
            cable_plans: [
                { id: 'dstv', name: 'DSTV', img: '/img/logos/dstv.jpg' },
                { id: 'gotv', name: 'GoTv', img: '/img/logos/gotv.jpg' },
                { id: 'startimes', name: 'Startimes', img: '/img/logos/startimes.jpg' },
                { id: 'showmax', name: 'Showmax', img: '/img/logos/showmax.jpg' },
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
            this.handleCheck()

        },

        async handleSelectPlan(plan) {
            this.plan = plan;
            const res = await this.$http.post('https://creditclan-kycs.herokuapp.com/api/more-widget/cabletv_subscription ', { serviceID: plan })

            let result = res.data.data.content.varations

            this.plans = result.map((m) => {
                return { ...m, value: m.variation_code, text: m.name }
            })
        },

        choosePlan(data) {
            this.values.amount = data.variation_amount;
            this.values.variation_code = data.variation_code;
        },

        async handleCheck() {
            if (this.submit_text === 'Proceed') {
                this.showView('pay');
            } else {
                this.loading = true;
                const verify = await axios.post('https://creditclan-kycs.herokuapp.com/api/more-widget/verify_smartcard_number', { serviceID: this.plan, billersCode: this.values.card_no })
                this.message = verify?.data?.data?.content
                if (!this.message?.error) {
                    this.loading = false;
                    this.submit_text = 'Proceed'
                } else return this.loading = false;
            }
        },

        async handlePaymentDone() {
            this.showView('loading')
            this.loading = 'Creating request...'
            const res = await axios.post('https://creditclan-kyc.herokuapp.com/api/more-widget/renew_catbletv_sub', { serviceID: this.plan, amount: this.values.amount, phone: this.values.phone, name: 'cable-tv', billersCode: this.values.phone, variation_code: this.values.variation_code, source: 'merchant store' })
            if (res.data.status) {
                this.closeViews();
                this.loading = false;
                this.view = 'success';
            } else {
                this.$bus.$emit('toast', {
                    color: 'red', message: 'Something went wrong'
                });
            }
        }
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