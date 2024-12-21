<template>
  <div class="d-flex flex-column flex-grow-1 px-6 px-md-10">
    <div>
      <v-btn v-if="items.length" @click="$emit('cancel')" icon outlined text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="d-flex align-center mt-6">
        <p class="black--text" style="font-size: 1.1rem; line-height: 1.5rem;">
          Enter details of the item you are buying
        </p>
      </div>
      <div class="mt-2 d-flex justify-space-between align-center">
        <v-text-field hide-details label="Enter Price" prefix="₦" v-model="values.price" value="10.00"></v-text-field>
        <v-text-field class="ml-6" hide-details readonly style="width: 100px" v-model="values.quantity">
          <v-icon @click="values.quantity = Math.max(1, --values.quantity)" color="red" slot="prepend">
            mdi-minus
          </v-icon>
          <v-icon @click="values.quantity++" color="green" slot="append-outer">
            mdi-plus
          </v-icon>
        </v-text-field>
      </div>
      <v-text-field v-model="values.name" hide-details label="Describe Item e.g hp laptop" class="mt-3"></v-text-field>
      <v-img
        v-if="values.primary_picture" :aspect-ratio="1" width="50%" :src="values.primary_picture"
        class="rounded-lg mt-8"
      />
      <label
        v-else class="fill-width rounded-lg px-4 py-6 mt-8 cursor-pointer d-flex align-center"
        style="border: 2px dashed rgba(0, 0, 0, .1); background: rgba(0, 0, 0, .03)"
      >
        <input @change="handleFileChange" accept="image/png, image/jpeg" hidden type="file"/>
        <v-icon color="blue-grey lighten-3" size="24" class="mr-1">mdi-plus</v-icon>
        <span class="text-title blue-grey--text">Add screenshot of item from seller</span>
      </label>
      <v-btn @click="submit" class="mt-6" color="primary" elevation="0">Add item</v-btn>
      <v-btn @click="$emit('cancel')" class="mt-3" color="red" text v-if="items.length > 1">Cancel</v-btn>
      <br><br>
    </div>
    <!-- <img
      src="@/assets/images/successful-purchase.svg"
      class="footer-img mt-auto ml-auto" alt="bg" style="width: 50%;"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'WhatsappPurchaseSetupProduct',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      values: {
        price: '',
        quantity: 1,
        primary_picture: null,
        name: ''
      },
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        this.values.primary_picture = result;
      }
      reader.readAsDataURL(file);
    },
    submit() {
      const valid = Object.keys(this.values).every(key => !!this.values[key]);
      if (!valid) {
        return this.$bus.$emit('toast', {
          message: 'Please fill in all fields correctly and upload item picture',
          color: 'red'
        });
      }
      this.$emit('add', this.values);
    }
  }
}
</script>
