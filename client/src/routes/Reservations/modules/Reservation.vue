<template>
  <div class="reservations-sublist">
    <div v-if="this.reservations.length">
      <h3 >It happens {{ type }} !</h3>
      <p v-for="reservation in this.reservations" :key="reservation._id">
        {{ reservation.room.name }}
        {{ formattedDate(reservation.from) }}
        for
        {{ reservation.duration }}
        minutes
      </p>
    </div>
    <div v-else>
      <h3>It could happened {{ type }}</h3>
      <p>... but there are no reservations !</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    type: String,
    reservations: Array,
  },
  methods: {
    formattedDate(date) {
      return moment.duration(moment(date).diff()).humanize(true);
    },
  },
};
</script>
