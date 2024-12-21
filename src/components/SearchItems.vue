<template>
  <div class="white rounded-xl">
    <v-text-field
        v-model="values.search"
        :hide-details="'auto'"
        append-icon="mdi-magnify"
        dense
        filled
        placeholder="Search.."
        rounded
        @click:append="submit()"
        @keyup.enter="submit()"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "SearchItems",

  data() {
    return {
      values: this.$store.state.catalogue.search
    }
  },

  methods: {
    submit() {
      if (this.values.search) {
        this.$store.dispatch('catalogue/searchItems', { ...this.values, page_number: 1, end: false });
        if (!this.$route.path.match(/catalogue/gi)) {
          this.$router.push(`/${ this.$store.state.merchant.slug }/collections`)
        }
        this.$emit('close');
      }
    },
  },
}
</script>
