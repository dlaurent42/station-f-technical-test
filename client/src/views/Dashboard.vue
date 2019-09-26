<template>
  <div id="dashboard">
    <h1>That's the dashboard module!</h1>
    <p>You should only get here if you're authenticated!</p>
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
