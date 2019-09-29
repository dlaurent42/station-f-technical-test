<template>
  <mu-form ref="form" :model="form" class="booking-form">
    <h3>Find the room that fit your needs</h3>
    <mu-flex wrap="wrap" justify-content="between" direction="row" align-items="center" fill>

      <!-- select date -->
      <mu-form-item label="Date" prop="datetime" :rules="datetimeRules">
        <mu-date-input
          v-model="form.datetime"
          landscape
          :date-time-format="endDateFormat"
          @change="onDateChange"
        />
      </mu-form-item>

      <!-- select time -->
      <mu-form-item label="Time" prop="datetime" :rules="datetimeRules">
        <mu-date-input
          type="time"
          v-model="form.datetime"
          landscape
          @change="onDateChange"
        />
      </mu-form-item>

      <!-- select duration -->
      <mu-form-item label="Duration (in minutes)" prop="duration" :rules="durationRules">
        <mu-text-field
          type="number"
          v-model="form.duration"
          prop="duration"
          @keydown="form.duration = parseInt(form.duration)"
          @change="onDateChange"
        />
      </mu-form-item>

      <!-- select number of attendees -->
      <mu-form-item label="Attendees" prop="capacity" :rules="capacityRules">
        <mu-text-field
          type="number"
          v-model="form.capacity"
          prop="capacity"
          @keydown="form.capacity = parseInt(form.capacity)"
          @change="onOtherChanges"
        />
      </mu-form-item>
    </mu-flex>
    <hr>

    <!-- select mandatory equipments -->
    <mu-flex wrap="wrap" justify-content="start" direction="row" align-items="center" fill>
      <mu-form-item label="Equipments" prop="equipments">
        <mu-checkbox
          v-for="equipment in equipmentsList"
          v-model="form.equipments"
          :key="equipment._id"
          :label="equipment.name"
          :value="equipment._id"
          @change="onOtherChanges"
        />
      </mu-form-item>
    </mu-flex>
  </mu-form>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import eventBus from '@/eventBuses/booking';
import * as types from '@/store/types/user';
import axios from '@/services/axios';
import endDateFormat from '@/utils/datetimeFromChineseToEnglish';

export default {
  data: () => ({
    // Data
    rooms: [],
    filteredRooms: [],
    equipmentsList: [],

    // Form validation
    datetimeRules: [{
      validate: value => moment().diff(moment(value)) < 0,
      message: 'Date must be in future',
    }],
    durationRules: [
      { validate: value => Number.isInteger(parseInt(value, 10)), message: 'Duration must be numeric' },
      { validate: value => value > 0, message: 'Duration must be positive' },
      { validate: value => value > 0 && value < 60 * 4, message: 'Duration cannot exceed 4 hours' },
    ],
    capacityRules: [
      { validate: value => Number.isInteger(parseInt(value, 10)), message: 'Room capacity must be numeric' },
      { validate: value => value > 0, message: 'Room capacity must be positive' },
      { validate: value => value > 0 && value < 600, message: 'Room capacity cannot exceed 600 ppl' },
    ],
    // Form data
    form: {
      datetime: new Date(),
      duration: 30,
      capacity: 1,
      equipments: [],
      errors: {
        capatity: false,
      },
    },
    endDateFormat, // Chinese to English...
  }),
  computed: {
    ...mapGetters({
      user: types.GET_USER,
    }),
  },
  methods: {
    onSubmit(roomId) {
      this.$refs.form.validate()
        .then((isValid) => {
          if (!isValid) return;

          // Put data in variable for better visibility
          const data = {
            from: new Date(this.form.datetime),
            duration: parseInt(this.form.duration, 10),
            roomId,
            userId: this.user.id,
          };

          // Send request
          axios.post('/reservations', data)
            .then(res => (
              (res.data.success)
                ? this.onDateChange()
                : null
            ))
            .catch(() => {});
        });
    },

    // Called in case of date / time / duration change
    onDateChange() {
      this.$refs.form.validate()
        .then((isValid) => {
          // Check validity of the form
          // Do not send request to api if form is not valid ...
          if (!isValid) return;
          eventBus.setLoading(true);

          // Fetch slots for date
          axios.get(`/rooms/slots?date=${this.form.datetime}`)
            .then((response) => {
              // Convert datetime to moment
              const from = moment.utc(this.form.datetime).set({ second: 0, millisecond: 0 });
              const to = moment.utc(from).add(parseInt(this.form.duration, 10), 'minutes');

              // Filter rooms based on slots
              this.filteredRooms = response.data.payload.filter(room => (
                !room.reservations.some(reservation => (
                  from.diff(moment.utc(reservation.to)) < 0
                  && moment.utc(reservation.from).diff(to) < 0
                ))
              ));

              // Assign results to rooms
              this.rooms = this.filteredRooms;

              // Now filter on other static fields
              this.onOtherChanges();
            })
            .catch(() => eventBus.setLoading(false));
        });
    },

    // Called in case of equipments / capacity change
    onOtherChanges() {
      eventBus.setLoading(true);

      // Filter on equipments and room capacity
      this.filteredRooms = this.rooms.filter(room => (

        // Verify capacity
        room.capacity >= parseInt(this.form.capacity, 10)
        && (

          // Verify if any equipment is required
          this.form.equipments.length === 0

          // For each equipment required, verify it is included in room
          || !this.form.equipments.some(equipment => (
            !room.equipments.map(el => el._id).includes(equipment) // eslint-disable-line
          ))
        )
      ));
      eventBus.setRooms(this.filteredRooms);
      eventBus.setLoading(false);
    },
  },
  created() {
    eventBus.setLoading(true);

    // Fetch reservation slots
    axios.get('/rooms/slots')
      .then((response) => {
        // Update rooms in case of success
        if (response.data.success) {
          this.rooms = response.data.payload;
          this.filteredRooms = this.rooms;
          eventBus.setLoading(false);
          eventBus.setRooms(this.rooms);
        }

        // Fetch equipments list
        return axios.get('/equipments');
      })
      .then((response) => {
        // Update equipments list in case of success
        if (response.data.success) this.equipmentsList = response.data.payload;
      })
      .catch(() => eventBus.setLoading(false));

    // Add eventBus listeners
    eventBus.$on('submit', roomId => this.onSubmit(roomId));
  },
};
</script>

<style lang="scss" scoped>
.booking-form {
  width: 80vw;
  margin: 5vh 10vw;
  display: flex;
  flex-direction: column;
  & h3 {
    font-size: 40px;
    padding: 40px 0;
  }
  & .mu-form-item__focus {
    color: #34495e;
  }
  & .mu-input__focus {
    color: #34495e;
  }
  & .mu-checkbox-checked {
    color: #34495e;
  }
}
</style>