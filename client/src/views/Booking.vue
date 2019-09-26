<template>
  <div id="booking">
    <h1>That's the booking module!</h1>
    <p>You should only get here if you're authenticated!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    // Fetch /rooms/slots
  },
};
</script>
