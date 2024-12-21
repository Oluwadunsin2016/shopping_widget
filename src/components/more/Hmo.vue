<template>
    <v-card class="fill-height lighten-4">
        <v-card-text class="pa-0 fill-height d-flex flex-column">
            <div class="px-8 pt-10 pb-6 white border-bottom">
                <div class="d-flex align-center justify-space-between">
                    <div class="text-h4 font-weight-bold title black--text">Buy HMO</div>
                    <v-btn @click="$emit('close')" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <p class="mt-2 black--text">Choose from a wide variety of plans for you, your family and your staff </p>
            </div>
            <div class="grey lighten-4">
                <div class="py-6 px-8">
                    <v-row v-if="loading">
                        <v-col v-for="i in 4" cols="12" md="6" :key="i">
                            <div>
                                <v-skeleton-loader :boilerplate="true" :loading="true" :tile="false" :type="'image'"
                                    class="fill-width fill-height align-self-stretch" height="200px">
                                </v-skeleton-loader>
                                <v-skeleton-loader :boilerplate="true" :loading="true" :tile="false" :type="'image'"
                                    class="fill-width fill-height align-self-stretch" height="200px">
                                </v-skeleton-loader>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card class="position-relative flex-grow-1 rounded-lg d-flex flex-row align-center mb-2" light
                        style="box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .05); border: 1px solid rgba(0, 0, 0, .08)"
                        v-for="(item, i) in movies" :key="i" @click="handleClick(item)">

                        <div class="position-relative d-flex pa-2">
                            <v-img :src="item.image" width="100" height="100" class="rounded-lg" cover></v-img>
                        </div>

                        <div class="px-3 py-3 px-md-4 flex-grow-1 d-flex flex-column align-start justify-center">
                            <div :title="item.title" class="text-title black--text mb-1 font-weight-bold fill-width">{{item.title}}</div>
                            <div class="d-flex justify-space-between fill-width">
                                <div class="mt-1 fill-width">
                                    <div class="text-title black--text">
                                        {{ item.span | currency }}
                                    </div>
                                    <div class="text-title black--text mt-2">
                                        <!-- {{ item.showingAt }} -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </div>
                <v-dialog v-if="$vuetify.breakpoint.smAndDown" v-model="views.details" fullscreen hide-overlay
                    transition="dialog-bottom-transition">
                    <Hmocart v-if="current" :item="current" @close="views.details = false; current = null"
                        @watch="handleWatch" />
                </v-dialog>
                <v-navigation-drawer v-else v-model="views.details" fixed right temporary width="550">
                    <Hmocart v-if="current" :item="current" @close="handleDetailsClose()" @watch="handleWatch" />
                </v-navigation-drawer>

                <v-dialog v-if="$vuetify.breakpoint.smAndDown" v-model="views.checkout" fullscreen hide-overlay
                    transition="dialog-bottom-transition">
                    <Hmocheckout v-if="current" :movie="current" @cancel="showView('details')" />
                </v-dialog>
                <v-navigation-drawer v-else v-model="views.checkout" fixed right temporary width="550">
                    <Hmocheckout v-if="current" :movie="current" @cancel="showView('details')" />
                </v-navigation-drawer>
            </div>
            <img src="../../assets/images/happy-straight.png" alt="" class="fill-width mt-auto" />
        </v-card-text>
    </v-card>
</template>

<script>
import views from '../../mixins/views';
import axios from 'axios';
import { evalJson } from '../../lib/utils';
import Hmocart from './Hmocart.vue';
import Hmocheckout from './Hmocheckout.vue';

export default {
    name: "HMO",
    mixins: [views],
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
                subscription: true
            },
            current: null,
            swiperOptions: {
                slidesPerView: 1.3,
                spaceBetween: 15,
                breakpoints: {
                    640: {
                        slidesPerView: 2.5
                    },
                    700: {
                        slidesPerView: 3.5
                    },
                    900: {
                        slidesPerView: 1.5
                    }
                },
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false
                },
                speed: 10000
            },
            movies: [
                {
                    id: 1,
                    image: "https://i0.wp.com/www.hygeiahmo.com/wp-content/uploads/2018/09/Single-man.jpg?resize=1024,1024&ssl=1",
                    title: "Individual",
                    span: "5450",
                    screens: [
                        {
                            text: "HyBasic", price: "Monthly - N5,450, Annual - N55,490 (save 15%)"
                        },
                        {
                            text: "Hyprime", price: "Monthly - N16,370, Annual - N166,974.00 (Save 15%)"
                        },
                        {
                            text: "Hyprime Plus", price: "Monthly - N44,010, Annual - N448,902.00 (Save 15%)"
                        }
                    ]
                },
                {
                    id: 2,
                    image: "https://i0.wp.com/www.hygeiahmo.com/wp-content/uploads/2018/10/With-Dog.jpg?resize=1024,1024&ssl=1",
                    title: "Families",
                    span: "22560",
                    screens: [
                        {
                            text: "HyBasic", price: "Monthly - N22,560, Annual - 230,112.00 (Save 15%)"
                        },
                        {
                            text: "Hyprime Family of (4) Plan", price: "Monthly - N65,450, Annual - N667,590.00 (Save 15%)"
                        },
                    ]
                },
                {
                    id: 3,
                    image: "https://i0.wp.com/www.hygeiahmo.com/wp-content/uploads/2018/10/Full-illustration.jpg?resize=1024,1024&ssl=1",
                    title: "Senior Citizen",
                    span: "19980",
                    screens: [
                        {
                            text: "Senior Mini", price: "Monthly - N19,980.00, Annual - N203,796.00 (save 15%)"
                        },
                        {
                            text: "Senior Midi", price: "Monthly - N41,970.00, Annual - N428,094.00 (Save 15%)"
                        },
                        {
                            text: "Senior PREMIUM", price: "Monthly - N84,830, Annual - N4865,266.00 (Save 15%)"
                        }
                    ]
                },
                {
                    id: 4,
                    image: "https://i0.wp.com/www.hygeiahmo.com/wp-content/uploads/2018/10/Hymat-plus.jpg?resize=1024,1024&ssl=1",
                    title: "Pregnant Woman",
                    span: "60120",
                    screens: [
                        {
                            text: "Hysmat Stan A", price: "N160,120.00 / year",
                        },
                        {
                            text: "Hysmat Stan A (TWIN)", price: "250,200.00 / year",
                        },
                        {
                            text: "Hysmat Stan B", price: "200,150.00 / year",
                        },
                        {
                            text: "Hysmat Stan B (TWIN)", price: "300,250.00 / year",
                        },
                        {
                            text: "Hysmat Stan C", price: "350,300.00 / year",
                        },
                        {
                            text: "Hysmat Stan C (TWIN)", price: "500,460.00 / year",
                        },
                        {
                            text: "Hysmat Stan D", price: "600,500.00 / year",
                        },
                        {
                            text: "Hysmat Stan D (TWIN)", price: "750,600.00 / year",
                        },
                        {
                            text: "Hysmat Stan E", price: "750,600.00 / year",
                        },
                        {
                            text: "Hysmat Stan E (TWIN)", price: "850,650.00 / year",
                        },
                        {
                            text: "Hysmat Stan B", price: "850,650,250.00 / year",
                        },
                        {
                            text: "Hysmat Stan F (TWIN)", price: "1.200,900.00 / year",
                        }
                    ]
                },
                {
                    id: 5,
                    image: "https://i0.wp.com/www.hygeiahmo.com/wp-content/uploads/2016/01/SME.jpg?resize=1024,1024&ssl=1",
                    title: "S.M.Es",
                    span: '4980'
                }
            ],
            loading: false,
            //     {
            //     "id": "26",
            //         "title": "Jurassic World Dominion",
            //             "genre": "[\"Action\",\"Adventure\",\"Science Fiction\"]",
            //                 "meal_amounts": "0",
            //                     "span": "2H 26M",
            //                         "image": "https://i.ibb.co/Y8gM62b/jurassic-world.jpg",
            //                             "rated": "12A",
            //                                 "summary": "Four years after the destruction of Isla Nublar, dinosaurs now live--and hunt--alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures in a new Era",
            //                                     "showingAt": "[{\"text\":\"Surulere\",\"screens\":[{\"text\":\"2D\",\"price\":\"3000\"},{\"text\":\"DBOX\",\"price\":\"3000\"}]},{\"text\":\"Twinwaters\",\"screens\":[{\"text\":\"PREMIUM\",\"price\":\"3000\"}]},{\"text\":\"Landmark\",\"screens\":[{\"text\":\"BIG SCREEN\",\"price\":\"3000\"},{\"text\":\"Premium 2D\",\"price\":\"3000\"},{\"text\":\"MAX4D\",\"price\":\"3000\"}]},{\"text\":\"Lekki\",\"screens\":[{\"text\":\"IMAX 3D\",\"price\":\"4500\"},{\"text\":\"IMAX 3D\",\"price\":\"4000\"},{\"text\":\"BIG SCREEN\",\"price\":\"4000\"},{\"text\":\"PREMIUM\",\"price\":\"3000\"}]}]",
            //                                         "created_at": "2022-07-02 15:46:00",
            //                                             "updated_at": "0000-00-00 00:00:00"
            // }
        };
    },
    components: { Hmocart, Hmocheckout },
    methods: {
        async getMovies() {
            this.movies = [];
            this.loading = true;
            try {
                const res = await axios.get(`https://sellbackend.creditclan.com/parent/index.php/globalapi/all_movies`);
                this.movies = res.data.data.map(m => ({
                    ...m,
                    showingAt: evalJson(m.showingAt)
                })).reverse();
            }
            catch (e) {
                console.log({ e });
            }
            this.loading = false;
        },
        handleClick(category) {
            this.current = category;
            this.showView("details");
        },
        handleWatch(movie) {
            this.showView("checkout");
            this.current = movie;
        },
        handleDetailsClose() {
            this.closeViews();
            this.current = null;
        }
    },
}
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
    transition: all .3s;
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