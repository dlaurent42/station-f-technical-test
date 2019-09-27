<template>
  <mu-container id="booking">
    <h1>BOOK A ROOM</h1>
    <app-booking-form/>
    <app-booking-table/>
  </mu-container>
</template>

<script>
import Form from './modules/Form.vue';
import Table from './modules/Table.vue';

export default {
  components: {
    'app-booking-form': Form,
    'app-booking-table': Table,
  },
};
</script>

<style lang="scss" scoped>
#booking {
  & h1 {
    padding: 20px 0;
  }
}
</style>
