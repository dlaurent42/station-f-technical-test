<template>
  <mu-container id="booking">
    <h1>BOOK A ROOM</h1>
    <mu-form ref="form" :model="form" class="booking-form">
      <mu-flex wrap="wrap" justify-content="between" direction="column">
        <mu-form-item label="Date" prop="datetime" :rules="datetimeRules">
          <mu-date-input
            v-model="form.datetime"
            landscape
            :date-time-format="endDateFormat"
            @change="onDateChange"
          />
        </mu-form-item>
        <mu-form-item label="Time" prop="datetime" :rules="datetimeRules">
          <mu-date-input
            type="time"
            v-model="form.datetime"
            landscape
            @change="onDateChange"
          />
        </mu-form-item>
        <mu-form-item label="Duration (in minutes)" prop="duration" :rules="durationRules">
          <mu-text-field
            type="number"
            v-model="form.duration"
            prop="duration"
            @keydown="form.duration = parseInt(form.duration)"
            @change="onDateChange"
          />
        </mu-form-item>
        <mu-form-item label="Room capacity" prop="capacity" :rules="capacityRules">
          <mu-text-field
            type="number"
            v-model="form.capacity"
            prop="capacity"
            @keydown="form.capacity = parseInt(form.capacity)"
            @change="onOtherChanges"
          />
        </mu-form-item>
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
    <mu-data-table
      :loading="loading"
      :columns="columns"
      :sort.sync="sort"
      @sort-change="onSortChange"
      :data="filteredRooms"
      no-data-text="No rooms found."
    >
      <template slot="expand" slot-scope="prop">
        <div style="padding: 24px;" >
          <mu-list>
            <mu-list-item-title>{{ prop.row.name }}</mu-list-item-title>
            <mu-list-item>{{ prop.row.description }}</mu-list-item>
            <mu-list-item-title>Equipments</mu-list-item-title>
            <mu-list-item v-if="prop.row.equipments.length">
              <mu-chip v-for="equipment in prop.row.equipments" :key="equipment.id">
                {{ equipment.name }}
              </mu-chip>
            </mu-list-item>
            <mu-list-item v-else>No equipments in this meeting room.</mu-list-item>
            <mu-list-item-title>Reservations</mu-list-item-title>
            <div v-if="prop.row.reservations.length">
              <p v-for="reservation in prop.row.reservations" :key="reservation._id">
                Reserved by {{ reservation.user.username }} from {{ reservation.from }} to {{ reservation.to }}
              </p>
            </div>
            <mu-list-item v-else>No reservations for this day.</mu-list-item>
          </mu-list>
        </div>
      </template>
      <template slot-scope="scope">
        <td class="is-center">{{scope.row.capacity}}</td>
        <td class="is-center">{{scope.row.name}}</td>
        <td class="is-center">{{scope.row.description}}</td>
      </template>
    </mu-data-table>
  </mu-container>
</template>

<script>
import moment from 'moment';
import axios from '../../services/axios';
import endDateFormat from '../../utils/datetimeFromChineseToEnglish';

export default {
  data: () => ({

    // Rooms list
    rooms: [],
    filteredRooms: [],
    equipmentsList: [],
    loading: false,
    selected: undefined,

    // Table data
    sort: {
      name: '',
      order: 'asc',
    },
    columns: [{
      title: 'Capacity',
      name: 'capacity',
      sortable: true,
      align: 'center',
    }, {
      title: 'Name',
      name: 'name',
      sortable: true,
      align: 'center',
    }, {
      title: 'Description',
      name: 'description',
      sortable: true,
      align: 'center',
    }],

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
  methods: {
    onSortChange({ name, order }) {
      this.filteredRooms = this.filteredRooms.sort((a, b) => {
        if (typeof a[name] === 'number' && typeof b[name] === 'number') return (order === 'asc') ? a[name] - b[name] : b[name] - a[name];
        if (a[name] < b[name]) return (order === 'asc') ? -1 : 1;
        if (a[name] > b[name]) return (order === 'asc') ? 1 : -1;
        return 0;
      });
    },
    onDateChange() {
      this.$refs.form.validate()
        .then((isValid) => {
          // Check validity of the form
          // Do not send request to api if form is not valid ...
          if (!isValid) return;
          this.loading = true;

          // Fetch slots for date
          axios.get(`/rooms/slots?date=${this.form.datetime}`)
            .then((response) => {
              // Convert datetime to moment
              const from = moment.utc(this.form.datetime);
              const to = moment.utc(from).add(this.form.duration, 'minutes');
              console.log('onDateChange');

              // Filter rooms based on slots
              this.filteredRooms = response.data.payload.filter(room => (
                !room.reservations.some(reservation => (
                  (moment.utc(reservation.from).diff(from) <= 0 && from.diff(moment.utc(reservation.to)) < 0)
                  || (moment.utc(reservation.from).diff(to) < 0 && moment.utc(reservation.to).diff(to) < 0)
                ))
              ));

              // Assign results to rooms
              this.rooms = this.filteredRooms;

              // Now filter on other static fields
              this.onOtherChanges();
            })
            .catch(() => {
              this.loading = false;
            });
        });
    },
    onOtherChanges() {
      this.loading = true;

      // Filter on equipments and room capacity
      this.filteredRooms = this.rooms.filter(room => (

        // Verify capacity
        room.capacity >= this.form.capacity
        && (

          // Verify if any equipment is required
          this.form.equipments.length === 0

          // For each equipment required, verify it is included in room
          || !this.form.equipments.some(equipment => (
            !room.equipments.map(el => el._id).includes(equipment) // eslint-disable-line
          ))
        )
      ));

      this.loading = false;
    },
  },
  created() {
    // Fetch reservations slots and rooms for today + list of available equipments
    this.loading = true;
    axios.get('/rooms/slots')
      .then((response) => {
        this.rooms = response.data.payload;
        this.filteredRooms = response.data.payload;
        console.log(response.data.payload);
        return axios.get('/equipments');
      })
      .then((response) => {
        this.equipmentsList = response.data.payload;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
#booking {

  & h1 {
    padding: 20px 0;
  }

  & .booking-form {
    & .mu-form-item__focus {
      color: rgb(24, 45, 67);
    }
    & .mu-input__focus {
      color: rgb(24, 45, 67);
    }
    & .mu-checkbox-checked {
      color: rgb(24, 45, 67);
    }
  }
}
</style>
