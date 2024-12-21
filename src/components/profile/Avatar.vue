<template>
  <div>
    <div
      class="bg-gray-100 car flex bg-img mb-10 d-flex justify-center align-center" style="border-radius: 50%; border: 1px solid rgba(0, 0, 0, .1)"
      @click="selectImage" :style="{ 'background-image': `url(${previewImage})` }"
    >
      <v-icon v-if="!previewImage" size="30" class="flex items-center justify-center">mdi-plus</v-icon>
    </div>
    <input
      @input="pickFile" accept="image/png, image/jpeg, image/bmp" hidden ref="avatar" type="file"
      style="display: none"
    >
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    file: {
      type: File
    }
  },
  data() {
    return {
      previewImage: null
    }
  },
  methods: {
    selectImage() {
      this.$refs.avatar.click();
    },
    pickFile() {
      let input = this.$refs.avatar
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('change', file[0])
      }
    }
  },
  computed: {
    avatar() {
      return this.$store.state.customer.avatar;
    },
  },
}
</script>

<style scoped>
.bg-img {
  background-size: cover;
}

.car {
  min-width: 120px;
  min-height: 120px;
  max-width: 120px;
  max-height: 120px;
  cursor: pointer;
}
</style>
