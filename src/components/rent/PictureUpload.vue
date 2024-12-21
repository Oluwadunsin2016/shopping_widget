<template>
  <v-sheet>
    <form class="py-10 px-7">
      <div class="d-flex align-center justify-space-between mb-7">
        <v-btn icon outlined>
          <v-icon size="32" @click="$emit('close')">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn color="white" small icon style="background: tomato">
          <v-icon size="18" @click="$emit('cancel')">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="text-h4 font-weight-bold title black--text my-5">
        Kindly upload the picture of the house
      </div>
      <div>
        <label
          class="picture-upload"
          :style="{ backgroundImage: `url(${imgSrc})` }"
        >
          <input type="file" hidden @change="handlePhotoUpload($event)" /><span
            class="picture-upload-inner pointer"
          >
            <v-icon size="48" color="primary" v-if="!imgSrc">mdi-plus</v-icon>
          </span>
        </label>
      </div>
      <v-btn
        :loading="loading"
        @click="useUploadImageMutation"
        class="flex-grow-1"
        color="primary"
        elevation="0"
        >Upload</v-btn
      >
    </form>
  </v-sheet>
</template>
<script>
export default {
  name: 'PictureUpload',
  data() {
    return {
      loading: false,
      fileSrc: null,
      imgSrc: null,
    };
  },
  methods: {
    handlePhotoUpload(e) {
      const reader = new FileReader();
      const file = e.target.files[0];
      this.fileSrc = file;
      reader.onloadend = () => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async useUploadImageMutation() {
      this.loading = true;
      const fd = new FormData();
      fd.append("file", this.fileSrc);
      try {
        const res = await this.$http.post(
          'https://mobile.creditclan.com/api/v3/upload/image',
          fd,
          {
            headers: {
              'x-api-key':
                'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228',
            },
          }
        );
        this.$store.commit('rent/set', { image: res.data.data.filename });
        this.$emit('done');
      } catch (e) {
        console.log('Request error..', { e });
        return false;
      }
      this.loading = '';
    },
  },
};
</script>
<style scoped>
.picture-upload {
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  margin-bottom: 2rem;
  width: 150px;
}
</style>
