<template>
  <div>
    <ValidationObserver ref="observer">
      <form class="d-flex align-center justify-space-between">
        <ValidationProvider name="tag_ids" rules="required" v-slot="{ errors }">
          <v-select
            :error-messages="errors"
            :items="categories"
            dense
            hide-details
            label="Category"
            style="max-width: 200px"
            multiple
            v-model="values.tag_ids"
          ></v-select>
        </ValidationProvider>

        <div class="ml-4">
          <p class="ma-0">Item price</p>
          <v-range-slider :max="max" :min="min" :thumb-size="50" dense hide-details style="width: 200px;" thumb-label v-model="range"/>
        </div>

        <ValidationProvider class="ml-4" name="payment_types" rules="required" v-slot="{ errors }">
          <v-select
            :error-messages="errors"
            :items="payment_types"
            dense
            hide-details
            label="Payment type"
            style="max-width: 200px"
            v-model.number="values.on_credit"
          ></v-select>
        </ValidationProvider>

        <div class="d-flex align-center" v-if="values.on_credit === 1">
          <ValidationProvider class="ml-4" name="max_no_of_months" rules="required" v-slot="{ errors }">
            <v-select
              :error-messages="errors"
              :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
              dense
              hide-details
              label="Monthly installments"
              style="max-width: 150px"
              v-model.number="values.max_no_of_months"
            ></v-select>
          </ValidationProvider>

          <div class="ml-4 d-flex flex-column">
            <p class="ma-0">Monthly amount</p>
            <v-slider
              :thumb-size="50" dense hide-details max="500000" step="1000" style="max-width: 150px" thumb-label
              v-model.number="values.max_monthly_amount"
            />
          </div>
        </div>

        <div class="d-flex ml-4" v-if="!filtering">
          <v-btn @click="$emit('back')" class="mr-2" color="red" elevation="0" outlined v-if="back">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn @click="submit" class="flex-grow-1" color="primary" elevation="0">
            Filter
          </v-btn>
        </div>

        <v-btn @click="cancelFilter" class="ml-4" color="red" elevation="0" outlined type="primary" v-if="filtering">
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
		name: "FilterItemsTop",
		mixins: [filter],
		props: {
			back: {
				type: Boolean,
				default: false,
			}
		}
	}
</script>
