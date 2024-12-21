<template>
    <v-card elevation="0">
        <MoviesPictureCarousel :item="item" />
        <v-card-text class="py-5 px-4 px-md-8" ref="content">
            <div class="d-flex align-center justify-space-between mb-6 pa-4"
                style="position: absolute; top: 0; right: 0;">
                <v-btn @click="$emit('close')" color="white" small icon style="background: tomato">
                    <v-icon size="18">mdi-close</v-icon>
                </v-btn>
            </div>

            <div class="d-flex flex-column align-start fill-width">
                <div class="text-title">{{ item.title }}</div>
            </div>

            <v-divider class="my-4"></v-divider>

            <div>
                <div class="d-flex px-4">
                    <v-select v-model="screen" label="Select Plan" hide-details class="rounded-lg" :items="item.screens"
                        dense background-color="white" @change="setScreen($event, item.screens)"></v-select>
                </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <template v-if="showDetails">

                <div class="d-flex align-center justify-space-between mt-3">
                    <div class="flex">
                        <div class="title flex items-center font-weight-bold text--black">
                            {{ price }}
                        </div>
                    </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex">
                    <v-btn @click="handleWatch()" class="flex-grow-1 ml-3" color="primary" elevation="0">
                        <v-icon class="mr-2">mdi-play</v-icon>
                        Proceed
                    </v-btn>
                </div>
            </template>
            <v-snackbar :color="toast.color || ''" absolute bottom v-model="toast.visible">
                {{ toast.message }}
            </v-snackbar>
        </v-card-text>
    </v-card>
</template>

<script>
import MoviesPictureCarousel from "./MoviesPictureCarousel.vue";


export default {
    name: 'QuickAddToCart',
    components: { MoviesPictureCarousel },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            number_of_tickets: 1,
            showScreen: false,
            views: { more: false, quantity: false, summary: false, reviews: false, payment: false },
            cinema: '',
            toast: {
                visible: false,
                color: 'orange',
                message: ''
            },
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            tab: 0,
            screenType: [],
            screen: '',
            price: 0,
            showDetails: false,
        }
    },
    metaInfo() {
        return {
            title: this.item ? this.item.name : 'Item',
        }
    },
    methods: {
        handleWatch() {
            this.$emit('watch', {
                ...this.item,
                plan: {
                    price: this.price,
                }
            });
        },
        showToast(message, color = '') {
            this.toast.visible = true;
            this.toast.message = message;
            if (color) this.toast.color = color
            setTimeout(() => {
                this.toast = { visible: false, message: '', color: '' }
            }, 5000)
        },

        setCinema(cinema) {
            let res = this.item.showingAt.find(cin => cin.text === cinema)
            this.screenType = res.screens;
            this.showScreen = true
        },

        setScreen(screen, item) {
            const res = item.find(cin => cin.text === screen)
            this.price = res.price
            this.showDetails = true
        }
    }
}
</script>