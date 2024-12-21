<template>
  <div :class="{ 'justify-center': centered }" class="font-weight-bold d-flex">
    <div class="section-title grey--text text--darken-3">{{ title }}</div>
    <v-btn
        :to="`/${$store.state.merchant.slug}/collections`"
        class="ml-auto"
        color="primary" outlined rounded small v-if="!hideButton && $vuetify.breakpoint.smAndUp"
    >
      View collection
      <v-icon right>mdi-chevron-right</v-icon>
    </v-btn>
  </div>

</template>

<script>
	export default {
		name: "SectionTitle",
		props: {
			title: {
				type: String,
				required: true
			},
			centered: {
				type: Boolean,
				default: false
			},
			hideButton: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
