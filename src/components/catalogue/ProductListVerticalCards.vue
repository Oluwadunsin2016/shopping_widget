<template>
  <div>
    <v-row :dense="$vuetify.breakpoint.smAndDown" v-if="!loading && items">
      <v-col v-for="item in items" :key="item.id" class="px-2 pb-0" cols="6">
        <ItemCardDefault
          v-if="item.name && item.price" :item="item"
          @plans="$emit('plans', item)"
          @details="$emit('details', item)"
        />
        <ItemCardPictureOnly
          v-else :item="item"
          @plans="$emit('plans', item)"
          @details="$emit('details', item)"
        />
      </v-col>
    </v-row>
    <v-row dense v-if="loading || fetching">
      <v-col :key="i" cols="6" v-for="i in 2">
        <ItemCardLoading/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ItemCardDefault from "../templates/elements/ItemCardDefault";
import ItemCardLoading from "../templates/elements/ItemCardLoading";
import ItemCardPictureOnly from "../templates/elements/ItemCardPictureOnly.vue";
import list from "../../mixins/items/list";

export default {
  name: 'ProductListVerticalCards',
  components: { ItemCardPictureOnly, ItemCardLoading, ItemCardDefault },
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
