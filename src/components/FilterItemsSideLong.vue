<template>
  <div>
    <ValidationObserver ref="observer">
      <form>
        <p>Categories</p>
        <ValidationProvider name="tag_ids" v-slot="{ errors }">
          <v-checkbox
            :error-messages="errors"
            color="red"
            :key="category.value"
            hide-details
            :label="category.text"
            v-for="category in categories"
            :value="category.value"
            v-model="values.tag_ids"
          ></v-checkbox>
        </ValidationProvider>
        <div class="mt-5 pt-5 border-top">
          <p>Sizes</p>
          <ValidationProvider name="sizes" v-slot="{ errors }">
            <v-checkbox
              :error-messages="errors"
              :key="size.value"
              :label="size.text"
              :value="size.value"
              color="green"
              hide-details
              v-for="size in sizes"
              v-model="values.sizes"
            ></v-checkbox>
          </ValidationProvider>
        </div>

        <div class="mt-5 pt-5 border-top">
          <p class="ma-0">Genders</p>
          <ValidationProvider name="genders" v-slot="{ errors }">
            <v-checkbox
              :error-messages="errors"
              :key="gender.value"
              :label="gender.text"
              :value="gender.value"
              color="green"
              hide-details
              v-for="gender in genders"
              v-model="values.genders"
            ></v-checkbox>
          </ValidationProvider>
        </div>

        <ValidationProvider name="shipping_source" rules="required" v-slot="{ errors }">
          <div class="mt-5 pt-5 border-top">
            <p class="ma-0">Shipping source</p>
            <v-radio-group :error-messages="errors" class="mt-2" hide-details row v-model.number="values.shipping_source">
              <v-radio :value="0" label="Locally sourced"></v-radio>
              <v-radio :value="1" label="Foreign"></v-radio>
            </v-radio-group>
          </div>
        </ValidationProvider>

        <div class="mt-5 pt-5 border-top">
          <p class="ma-0">Item price</p>
          <v-range-slider :max="max" :min="min" :thumb-size="50" dense hide-details thumb-label v-model="range">
          </v-range-slider>
        </div>

        <div class="mt-5 pt-5 border-top">
          <p class="ma-0">Discount</p>
          <v-slider :max="100" :min="0" :thumb-size="50" dense hide-details thumb-label v-model="values.discount">
            <template v-slot:thumb-label="{ value }">
              {{ value }}%
            </template>
          </v-slider>
        </div>

        <div class="mt-5 pt-5 border-top">
          <ValidationProvider name="on_credit" rules="required" v-slot="{ errors }">
            <p class="ma-0">Payment type</p>
            <v-radio-group :error-messages="errors" class="mt-2" hide-details row v-model.number="values.on_credit">
              <v-radio :value="1" label="On credit"></v-radio>
              <v-radio :value="0" label="Outright"></v-radio>
            </v-radio-group>
          </ValidationProvider>
        </div>

        <div class="mt-5 pt-5 border-top" v-if="values.on_credit === 1">
          <p class="ma-0">Monthly installments</p>
          <v-slider :thumb-size="50" dense max="12" step="1" thumb-label v-model.number="values.max_no_of_months"></v-slider>

          <p class="ma-0">Monthly repayment amount</p>
          <v-slider :thumb-size="50" dense max="500000" step="1000" thumb-label v-model.number="values.max_monthly_amount">
          </v-slider>
        </div>

        <div class="d-flex mt-10">
          <v-btn @click="$emit('back')" class="mr-2" color="red" elevation="0" outlined v-if="back">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn @click="submit" class="flex-grow-1" color="primary" elevation="0">
            Filter
          </v-btn>
        </div>
        <v-btn @click="cancelFilter" block class="mt-2" color="red" elevation="0" outlined type="primary" v-if="filtering">
          <v-icon left>mdi-close</v-icon>
          Clear Filter
        </v-btn>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
	import filter from "../mixins/catalogue/filter";

	export default {
		name: "FilterItemsSideLong",
		mixins: [filter],
		props: {
			back: {
				type: Boolean,
				default: false,
			}
		}
	}
</script>
