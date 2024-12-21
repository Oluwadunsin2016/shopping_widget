<template>
  <v-card class="mb-2 d-flex justify-space-between align-center" flat outlined>
    <div>
      <v-card-title class="text-title-md">Profile picture</v-card-title>
    </div>
    <input @change="handleChange($event)" accept="image/png, image/jpeg, image/bmp" hidden ref="avatar" type="file">
    <div class="pa-3" v-if="avatar">
      <v-btn @click="$refs.avatar.click()" class="mr-2" elevation="0" small>Change</v-btn>
      <v-avatar>
        <img :src="avatar" alt="Customer">
      </v-avatar>
    </div>
    <div class="pa-3" v-else>
      <v-btn @click="$refs.avatar.click()" class="mr-2" elevation="0" small>
        <v-icon class="mr-2" color="grey" small>mdi-upload</v-icon>
        Upload
      </v-btn>
    </div>
  </v-card>
</template>

<script>
	export default {
		name: "CheckoutAvatar",

		props: {
			avatar: {
				type: String,
				required: true
			}
		},

		methods: {
			handleChange(e) {
				this.getBase64(e.target.files[0]);
			},

			getBase64(img) {
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					this.$emit('change', reader.result);
				});
				reader.readAsDataURL(img);
			}
		},
	}
</script>

<style scoped>

</style>