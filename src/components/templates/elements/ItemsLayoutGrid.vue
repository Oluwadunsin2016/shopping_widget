<template>
  <v-row>
    <v-col :md="6" :order-lg="reversed ? '1' : '0'" class="pt-0" cols="12" v-if="items[0]">
      <ItemCardSquare :value="items[0]"/>
    </v-col>
    <v-col :md="6" class="py-0" cols="12">
      <v-row>
        <v-col :key="item.id" :md="6" cols="6" v-for="item in items.slice(1).splice(0, 4)">
          <ItemCardSquare :value="item"/>
        </v-col>
        <v-col :key="item.id" :md="6" cols="6" v-for="item in (4 - items.slice(1).splice(0, 4).length)">
          <ItemCardLoading/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ItemCardLoading from "../elements/ItemCardLoading";
import ItemCardSquare from "./ItemCardSquare";

export default {
		name: "ItemsLayoutGrid",
		components: { ItemCardSquare, ItemCardLoading },
		props: {
			items: {
				required: true,
				type: Array
			},
			reversed: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
