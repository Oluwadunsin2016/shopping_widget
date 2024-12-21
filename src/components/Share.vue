<template>
    <v-card class="share-interface pa-4 mt-8">
    <v-row>
      <v-col cols="12">
        <h3 class="mb-4">Share this product to</h3>
      </v-col>

      <!-- Social Media Share Icons -->
      <v-col cols="12" class="d-flex align-center justify-center flex-wrap">
      <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('facebook')">
          <v-icon size="34" color="blue darken-3">mdi-facebook</v-icon>
        </v-btn>
          <span>Facebook</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('whatsapp')">
          <v-icon size="34" color="green">mdi-whatsapp</v-icon>
        </v-btn>
          <span>WhatsApp</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('instagram')">
          <v-icon size="34" class="instagram-icon pa-4">mdi-instagram</v-icon>
        </v-btn>
          <span>Instagram</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('tiktok')">
            <img
                src="https://sf-static.tiktokcdn.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png"
                alt="tiktok"
                class="rounded"
                style="width: 28px; height: 28px"
              />
        </v-btn>
          <span>Tiktok</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('linkedin')">
          <v-icon size="34" color="blue darken-1">mdi-linkedin</v-icon>
        </v-btn>
          <span>LinkedIn</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('twitter')">
          <v-icon size="34" color="light-blue lighten-1">mdi-twitter</v-icon>
        </v-btn>
          <span>Twitter</span>
        </div>
        <div class=" d-flex flex-column align-center justify-center mx-3 my-2">
        <v-btn icon class="pa-6" @click="shareOn('telegram')">
         <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
      alt="Telegram"
      class="rounded"
      style="width: 34px; height: 34px"
    />
        </v-btn>
          <span>Telegram</span>
        </div>
      </v-col>

      <!-- Copy Link -->
      <v-col cols="12" class="my-4">
        <v-text-field
              v-model="shareLink"
              :append-outer-icon="copied ? 'mdi-check' : 'mdi-link-variant'"
              label="Copy Link"
              dense
              outlined
              readonly
              hide-details
              @click:append-outer="copyLink"
            >
              <!-- Tooltip specifically for the append-outer-icon -->
              <template v-slot:append-outer>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      @click="copyLink"
                      class="cursor-pointer"
                    >
                      {{ copied ? 'mdi-check' : 'mdi-link-variant' }}
                    </v-icon>
                  </template>
                  <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
                </v-tooltip>
              </template>
            </v-text-field>

      </v-col>

      <!-- Additional Sharing Options -->
      <!-- <v-col cols="12" class="d-flex justify-space-around mt-2">
        <v-btn icon @click="shareOn('email')" class="mx-2">
          <v-icon color="red darken-2">mdi-email</v-icon>
        </v-btn>
        <v-btn icon @click="shareOn('telegram')" class="mx-2">
          <v-icon color="blue accent-3">mdi-telegram</v-icon>
        </v-btn>
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    closeShareDrawer: {type:Function,required:true},
  },
  data() {
    return {
      // shareLink: 'https://yourwebsite.com/shared-item',
      shareLink: `${window.location.origin}${this.$route.fullPath}`,
      copied: false,
    };
  },
  methods: {
    copyLink() {
      // Copy the share link to clipboard
      navigator.clipboard.writeText(this.shareLink).then(() => {
        this.copied = true; // Change the icon and tooltip text

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
    //  shareOnFacebook() {
    //   const url = encodeURIComponent(this.shareLink);
    //   const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    //   window.open(fbShareUrl, '_blank');
    // },
    shareOn(platform) {
      // Handle share action for different platforms
      const shareUrl = this.shareLink;
      let url = '';
      let text = 'Check out this amazing product!';

      switch (platform) {
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case 'twitter':
          url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
          break;
        case 'linkedin':
          // url = `https://www.linkedin.com/shareArticle?text=${shareUrl}`;
          url = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`;
          break;
        case 'whatsapp':
          // url = `https://wa.me/?text=${shareUrl}`;
          url = `https://api.whatsapp.com/send?text=${text}%20${shareUrl}`;
          break;
        case 'email':
          url = `mailto:?subject=${text}&body=${shareUrl}`;
          break;
       case 'telegram':
      url = `https://t.me/share/url?url=${shareUrl}&text=${text}`;
      break;
         case 'instagram':
      // Instagram doesn't allow direct URL sharing like others
        this.$bus.$emit("toast", {
          message: 'Instagram doesn’t support direct link sharing. Please copy the link and share manually.',
          color: "red",
        });
      return; // No URL to open, end execution here
    case 'tiktok':
      // TikTok also doesn’t support direct link sharing
      this.$bus.$emit("toast", {
          message:'TikTok doesn’t support direct link sharing. Please copy the link and share manually.',
          color: "red",
        });
      return; // No URL to open, end execution here
      }

      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.share-interface {
  max-width: 400px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn {
  cursor: pointer;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-text-field .v-icon {
  cursor: pointer;
}

.v-icon:hover {
  opacity: 0.8;
}

.instagram-icon {
 background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

