<template>
  <v-menu
    v-model="isDropdownVisible"
    :close-on-content-click="false"
    offset-y
    bottom
    max-height="300"
  >
    <template v-slot:activator="{ }">
      <v-text-field
        v-model="searchQuery"
        label="Search"
        append-icon="mdi-magnify"
        class=""
        filled
        rounded
        clearable
        solo
        outlined
        hide-details
        @input="onSearchInput"
        @click:append="search"
      ></v-text-field>
    </template>
    <v-list v-if="suggestions.length">
      <v-list-item
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ suggestion }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>No suggestions found</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { productSuggestions } from "../lib/data";
import { EventBus } from "../lib/event-bus";
export default {
  data() {
    return {
      searchQuery: "",
      isDropdownVisible: false,
      allSuggestions: [],
      suggestions: [],
    };
  },

  mounted() {
    // On mount, load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    this.allSuggestions = [...searchHistory, ...productSuggestions];
  },
  watch: {
    isDropdownVisible() {
      // On mount, load search history from localStorage
      let searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      this.allSuggestions = [...searchHistory, ...productSuggestions];
    },

    searchQuery() {
      if (this.searchQuery == "") this.isDropdownVisible = false;
    },
  },

  methods: {
    search() {
      if (this.searchQuery !== "") {
        //  this.$router.push({ name: 'search', query: { item: this.searchQuery } });
        //  this.$router.push(`/search/${this.searchQuery}`);

        let localSuggestions =
          JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (localSuggestions) {
          const existed = localSuggestions.find(
            (exist) => exist.toLowerCase() == this.searchQuery.toLowerCase()
          );
          if (existed) {
            localSuggestions = localSuggestions.filter(
              (exist) => exist.toLowerCase() !== this.searchQuery.toLowerCase()
            );
            localStorage.setItem(
              "searchHistory",
              JSON.stringify([...localSuggestions, this.searchQuery])
            );
          } else {
            localStorage.setItem(
              "searchHistory",
              JSON.stringify([...localSuggestions, this.searchQuery])
            );
          }
        } else {
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([this.searchQuery])
          );
        }
        this.isDropdownVisible = false;
        EventBus.$emit("search-query", this.searchQuery);
        // this.searchQuery=''
         EventBus.$emit("isSearchOpen", false);
      }
    },

    onSearchInput(value) {
      this.suggestions = this.allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      this.isDropdownVisible = true;
    },

    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      let localSuggestions =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (localSuggestions) {
        const existed = localSuggestions.find(
          (exist) => exist.toLowerCase() == suggestion.toLowerCase()
        );
        if (existed) {
          localSuggestions = localSuggestions.filter(
            (exist) => exist.toLowerCase() !== suggestion.toLowerCase()
          );
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([...localSuggestions, suggestion])
          );
        } else {
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([...localSuggestions, suggestion])
          );
        }
      } else {
        localStorage.setItem("searchHistory", JSON.stringify([suggestion]));
      }

      if (this.searchQuery !== "") {
        //  this.$router.push({ name: 'search', query: { item: this.searchQuery } });
        EventBus.$emit("search-query", this.searchQuery);
        // this.searchQuery=''
         EventBus.$emit("isSearchOpen", false);
      }
      this.isDropdownVisible = false;
    },
  },
};
</script>

<style scoped>

</style>
