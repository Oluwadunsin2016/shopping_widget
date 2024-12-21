<template>
  <div class="banner-wrap d-flex flex-column justify-center">
    <div class="banner-wrap-top pt-16 pb-10 pb-md-16">
      <v-container class="py-10 position-relative overflow-hidden px-0">
        <div class="pa-5 pa-md-10 text-left text-md-center mx-md-auto overflow-hidden"
             style="min-width: 300px; max-width: 700px; width: fit-content;">
          <div class="banner-title text-h5 text-md-h3 black--text font-weight-bold pr-5">{{ slide.title}}</div>
          <div
            :class="{'line-effect': $vuetify.breakpoint.smAndDown}" class="text-title black--text mt-5"
            v-if="slide.subtitle && slide.subtitle !== 'null'"
          >
            {{ slide.subtitle}}
          </div>
          <v-btn
              :to="`/${$store.state.merchant.slug}/collections`" class="mt-12" color="primary" elevation="0"
              large rounded v-if="$vuetify.breakpoint.mdAndUp"
          >
            Shop now
            <v-icon class="ml-3">mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
              :to="`/${$store.state.merchant.slug}/collections`" class="mt-6 mt-md-12" color="primary" elevation="0" fixed
              large style="right: -5px; bottom: 80px; z-index: 10; border-radius: 30px 0 0 30px" v-else
          >
            Shop now
            <v-icon class="ml-3">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="absolute right top" style="transform: translate(60%, 10px) rotate(-10deg); opacity: .2" v-if="$vuetify.breakpoint.smAndDown">
          <v-icon color="primary" size="200">mdi-cart</v-icon>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Banner',
		data() {
			return {
				items: this.$store.state.catalogue.merchantItems,
				current: 0,
				merchant: this.$store.state.merchant,
			}
		},
		computed: {
			slide() {
				const slide = this.$store.state.merchant.banner_slides.find(slide => slide.title);
				return slide || {
					title: `Welcome to ${ this.merchant.name }`,
					subtitle: 'Start shopping now'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "./src/assets/variables.scss";

  .banner-wrap {
    position: relative;
    //background-color: #fff;
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
