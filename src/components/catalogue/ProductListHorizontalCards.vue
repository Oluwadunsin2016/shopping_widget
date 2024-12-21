<template>
  <div>
    <v-row no-gutters v-if="!loading && items">
      <v-col cols="12" v-for="item in items" :key="item.id">
        <ItemCardFull :item="item" @plans="$emit('plans', item)" @details="$emit('details', item)"/>
      </v-col>
    </v-row>
    <v-row v-if="loading || fetching">
      <v-col :key="i" cols="12" v-for="i in 2">
        <ItemCardLoading/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ItemCardLoading from "../templates/elements/ItemCardLoading";
import list from "../../mixins/items/list";
import ItemCardFull from "../templates/elements/ItemCardFull.vue";

export default {
  name: 'ProductListHorizontalCards',
  components: { ItemCardFull, ItemCardLoading },
  mixins: [list]
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-skeleton-loader__list-item-three-line.v-skeleton-loader__bone {
    background: none;
  }
}
</style>
