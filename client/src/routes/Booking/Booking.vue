<template>
  <div id="booking">
    <app-section-title
      primary="BOOK A MEETING ROOM"
      secondary="Instantly and easily book unique meeting rooms and spaces."
    />
    <app-booking-form />
    <hr>
    <app-booking-table />
  </div>
</template>

<script>
import Form from './modules/Form.vue';
import Table from './modules/Table.vue';
import SectionTitle from '../../components/ui/SectionTitle.vue';

export default {
  title: 'Station F | Book a meeting room',
  components: {
    'app-booking-form': Form,
    'app-booking-table': Table,
    'app-section-title': SectionTitle,
  },
};
</script>

<style lang="scss" scoped>
#booking {

  width: 100vw;
  min-height: 100vh;
  min-height: calc(100vh - 80px);
  margin: 0;
  padding: 0;

  & hr {
    width: 60vw;
    margin: 5vh auto;
  }
}
</style>
