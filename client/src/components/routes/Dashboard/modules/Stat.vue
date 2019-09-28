<template>
  <div class="stat">
    <div class="stat-duration">{{ formattedDuration }}</div>
    <div class="stat-wrapper">
      <div class="stat-wrapper-format">{{ format }}</div>
      <div class="stat-wrapper-text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    format: '',
    formattedDuration: 0,
  }),
  props: {
    duration: Number,
    text: String,
  },
  created() {
    // Get duration object from duration provided as props
    const { _data: durationObject } = moment.duration(this.duration, 'minutes');

    // Assess format and formatted duration from retrieved data
    // ... days
    if (durationObject.days) {
      this.format = (durationObject.days > 1) ? 'days' : 'day';
      this.formattedDuration = durationObject.days;

    // ... hours
    } else if (durationObject.hours) {
      this.format = (durationObject.hours > 1) ? 'hours' : 'hour';
      this.formattedDuration = durationObject.hours;

    // ... minutes
    } else {
      this.format = (durationObject.minutes > 1) ? 'min.' : 'min.';
      this.formattedDuration = durationObject.minutes;
    }
  },
};
</script>

<style lang="scss" scoped>
.stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 300px;
  margin: 15px 0;
  font-family: 'Oswald', sans-serif;
  padding: 20px 40px;
  background: linear-gradient(120deg, #666, #222);
  color: #eee;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
    0 1px 1px 0 rgba(0,0,0,.14),
    0 1px 3px 0 rgba(0,0,0,.12);
  & .stat-duration {
    width: fit-content;
    font-size: 85px;
    font-weight: bold;
    text-align: right;
    padding-right: 20px;
  }
  & .stat-wrapper {
    flex-direction: column;
    flex-wrap: nowrap;

    & .stat-wrapper-format {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 55px;
      letter-spacing: 4px;
      // color: #332;
    }
    & .stat-wrapper-text {
      font-family: 'Roboto', sans-serif;
      font-style: italic;
      font-size: 20px;
      color: #bbb;
    }
  }
}
</style>
