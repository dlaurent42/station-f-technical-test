<template>
  <div id="reservations">
    <h1>That's the reservations module!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="reservations.lenght === 0">No reservation for now}</p>
    <div v-else>
      <div
        v-for="reservation in reservations"
        :key="reservation.id"
      >
        {{ reservation.from }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservations: [],
    };
  },
  created() {
    // Fetch reservations
  },
};
</script>
