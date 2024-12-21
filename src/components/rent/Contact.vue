<template>
  <v-sheet>
    <form class="py-10 px-7 text-center">
			<div class="d-flex flex-column justify-center align-end mb-7">
        <!-- <v-btn icon outlined>
            <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
          </v-btn> -->
          <v-btn
          color="white"
          small
          icon
          style="background: tomato;"
        >
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h4 font-weight-bold title black--text my-5">
        Thank you very much,
      </div>
      <div class="text-h4 font-weight-bold title black--text my-5">
        we will contact you shortly.
      </div>
      <div class="text-title black--text my-5 fill-width">You can also reach us on +2349155577731</div>
			<v-btn :loading="loading" @click="$emit('done')" class="flex-grow-1" color="primary" elevation="0">
        <v-icon size="18" @click="$emit('cancel')">mdi-phone</v-icon>
         call +2349155577731
      </v-btn>
    </form>
  </v-sheet>
</template>
<script>
	export default {
		name: 'Contact',
		data() {
			return {
				values: {
					name: '',
					email: '',
					phone: ''
				},
				loading: false
			}
		},
		methods: {
		}
	}
</script>
