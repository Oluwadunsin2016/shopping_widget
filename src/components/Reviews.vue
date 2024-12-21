<template>
  <v-card class="pa-0" elevation="0" v-if="adding">
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="text-title-md d-flex align-center">
        <v-btn @click="adding = false" class="mr-3" icon small>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Add comment
      </div>
      <v-btn @click="$emit('close', comments.length)" color="red" dark elevation="0" icon v-if="!embedded">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-5" ref="content">
      <ValidationObserver ref="observer">
        <form>
          <div class="d-flex align-center mb-6">
            <div class="subtitle-1 mr-5">Rating</div>
            <v-rating
              background-color="orange lighten-3"
              color="orange"
              dense
              v-model="rating"
              x-large
              hover
            ></v-rating>
          </div>
          <ValidationProvider name="comment" rules="required|max:100" v-slot="{ errors }">
            <v-textarea :error-messages="errors" auto-grow counter="100" label="Comment" maxlength="100" rows="1"
                        v-model="values.comment"></v-textarea>
          </ValidationProvider>
          <v-divider class="mt-4 mb-4"></v-divider>
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <v-text-field :error-messages="errors" label="Name" v-model="values.name"></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="email_or_phone" rules="required|emailOrPhone" v-slot="{ errors }">
            <v-text-field :error-messages="errors" label="Email or phone"
                          v-model="values.email_or_phone"></v-text-field>
          </ValidationProvider>
          <v-btn :loading="commenting" @click="submit" class="mt-4" color="primary" elevation="0" large>Comment
          </v-btn>
        </form>
      </ValidationObserver>
    </v-card-text>
    <v-snackbar
      :timeout="snackbar.timeout"
      v-model="snackbar.visible"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          @click="snackbar = false"
          color="red"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>

  <v-card class="pa-0" elevation="0" v-else>
    <v-card-title class="d-flex align-center justify-space-between" v-if="!embedded">
      <div class="text-title-md">
        Comments
        <v-chip small v-if="!loading">{{ comments.length }}</v-chip>
      </div>
      <v-btn @click="$emit('close', comments.length)" color="red" dark elevation="0" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <div class="mt-5 text-right" v-if="embedded">
      <v-btn @click="adding = true" outlined rounded>
        <v-icon left>mdi-comment-plus</v-icon>
        Add comment
      </v-btn>
    </div>
    <v-card-text class="pa-0 pb-12" ref="content" style="height: 75%;">
      <v-skeleton-loader
        :boilerplate="false"
        :tile="false"
        :type="'list-item-avatar-two-line@2'"
        class="fill-width align-self-stretch"
        ref="skeleton"
        style="width: 50%"
        v-if="loading"
      ></v-skeleton-loader>
      <div v-else>
        <v-list v-if="commentsReversed.length">
          <template v-for="(comment, index) in commentsReversed">
            <v-list-item :key="index" class="align-start">
              <v-list-item-avatar class="mt-0">
                <v-img :src="'/img/user.svg'"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ comment.name }}</v-list-item-title>
                <p class="mt-1 mb-0">{{ comment.comment }}</p>
                <v-rating
                  :value="comment.customer_rating"
                  background-color="orange lighten-3"
                  class="mt-2"
                  color="orange"
                  dense
                  small
                  readonly
                ></v-rating>
              </v-list-item-content>
            </v-list-item>

            <v-divider :key="index + 'divide'" v-if="index !== comments.length - 1"></v-divider>
          </template>
        </v-list>
        <div class="d-flex flex-column justify-center align-center text-center py-12" v-else>
          <v-icon color="grey lighten-2" size="50">mdi-comment-outline</v-icon>
          <div class="title mt-4 font-weight-light">No comments</div>
        </div>
      </div>
      <v-btn @click="adding = true" bottom color="blue" dark fab fixed right v-if="!embedded">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>

    <v-overlay :value="commenting">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
	export default {
		name: "Reviews",

		props: {
			itemId: {
				type: Number,
				required: true,
			},
			embedded: {
				type: Boolean,
				default: false
			}
		},

		data: () => ({
			loading: false,
			commenting: false,
			comments: [],
			adding: false,
			values: {
				name: '',
				email_or_phone: '',
				comment: ''
			},
			rating: 0,
			snackbar: {
				visible: false,
				timeout: 2000,
				text: ''
			}
		}),

		created() {
			this.getComments();
		},

		computed: {
			commentsReversed() {
				const comments = JSON.parse(JSON.stringify(this.comments));
				return comments.reverse();
			}
		},

		methods: {
			showSnackBar(text) {
				this.snackbar = { ...this.snackbar, visible: true, text }
			},
			async getComments() {
				this.loading = true;
				const res = await this.$http.get(`/item/${ this.itemId }/comments/1`);
				this.comments = res.data.data;
				this.loading = false;
			},
			async submit() {
				const valid = await this.$refs.observer.validate()
				if (!valid) return;
				if (this.rating === 0) return this.showSnackBar('Rating is required')
				this.commenting = true;
				try {
					await this.$http.post(`/item/${ this.itemId }/comment`, {
						...this.values,
						customer_rating: this.rating,
						merchant_id: this.$store.state.merchant.id
					});
					await this.getComments()
					this.adding = false;
					Object.keys(this.values).forEach(key => {
						this.values[key] = ''
					})
					this.$refs.observer.reset()
					this.commenting = false;
					this.rating = 0;
				} catch (e) {
					this.commenting = false;
				}
			},
		},
	}
</script>
