<template>
  <v-sheet class="pa-4 py-6">
    <template v-if="schedule.length">
      <v-subheader class="justify-center mb-5">Request Schedule</v-subheader>
      <v-simple-table class="mb-10">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">S/N</th>
            <th class="text-left">Amount</th>
            <th class="text-left" v-if="showPaid">Paid</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="i" v-for="(item, i) in schedule">
            <td>{{ item.date | date }}</td>
            <td>{{ item.serial }} of {{ schedule.length }}</td>
            <td>{{ item.amount | currency }}</td>
            <td v-if="showPaid">
              <div class="green--text" v-if="item.paid">
                <v-icon color="green">mdi-check</v-icon>
              </div>
              <div class="red--text" v-else>
                <v-icon color="red" v-if="+item.amount_paid === 0">mdi-minus</v-icon>
                <v-icon color="orange" v-if="+item.amount_paid < +item.amount && +item.amount_paid > 0">
                  mdi-dots-horizontal
                </v-icon>
                <v-icon color="green" v-if="+item.amount_paid === +item.amount">mdi-check</v-icon>
              </div>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>

    <div class="pa-10" v-else>
      <div class="text-small text-center">
        No schedule
      </div>
    </div>

    <div class="d-flex justify-center">
      <v-btn @click="$emit('close')" class="px-8" color="red" outlined small>
        Close
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
	export default {
		name: "Schedule",

		props: {
			schedule: {
				type: Array,
				required: true
			},
			showPaid: {
				type: Boolean,
				default: false,
			}
		},
	}
</script>
