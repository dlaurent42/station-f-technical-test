<template>
  <div id="reservations">
    <app-section-title
      primary="RESERVATIONS"
      secondary="You just arrived and wan't to check if you have time for a coffee?"
    />
    <mu-container class="reservations-wrapper">

      <!-- navigation tabs -->
      <mu-tabs :value.sync="selected" color="rgb(44,44,44)" indicator-color="green" full-width>
        <mu-tab v-for="tab in ['TODAY', 'WEEK', 'MONTH', 'YEAR']" :key="tab">
          {{ tab }}
        </mu-tab>
      </mu-tabs>

      <!-- reservations list -->
      <div class="reservations-list">
        <div class="reservations-sublist">

          <!-- onError: empty div -->
          <div v-if="!reservations[selected]" />

          <!-- onEmpty: redirect to booking -->
          <div v-else-if="reservations[selected].length === 0" class="reservation-no-slot">
            <p>No reservations for now</p>
            <mu-button @click="redirectToBooking">Book a meeting room</mu-button>
          </div>

          <!-- onData: display list of upcoming reservations -->
          <div v-else>
            <div v-for="(reservation, idx) in reservations[selected]" :key="reservation._id">
              <div class="reservation-slot-wrapper">
                <div class="reservation-slot">

                  <!-- reservation text -->
                  <div class="reservation-slot-content">
                    <strong>{{ reservation.room.name }}</strong>
                    {{ formattedDate(reservation.from) }}
                    for
                    {{ reservation.duration }}
                    minutes
                  </div>

                  <!-- reservation deletion icon -->
                  <font-awesome-icon
                    @click="showConfirmationDialog = true; selectedReservation = reservation._id"
                    class="reservation-slot-icon"
                    icon="trash-alt"
                  />
                </div>
                <hr v-if="idx < reservations[selected].length - 1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </mu-container>

    <!-- reservation confirmation dialog box -->
    <app-confirmation-dialog
      :show="showConfirmationDialog"
      text="Do you confirm deletion of this reservation ?"
      @submit="onDeletion"
      @close="showConfirmationDialog = false"
    />
  </div>
</template>

<script>
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { mapGetters } from 'vuex';
import axios from '@/services/axios';
import * as types from '@/store/types/user';
import eventBus from '@/eventBuses/notifications';

const moment = extendMoment(Moment);

export default {
  title: 'Station F | Your reservations',
  data: () => ({
    selected: 0,
    reservations: Array(4).fill([]),
    showConfirmationDialog: false,
    selectedReservation: '',
  }),
  computed: {
    ...mapGetters({
      user: types.GET_USER,
    }),
  },
  methods: {
    formattedDate(date) {
      return moment.duration(moment(date).diff()).humanize(true);
    },
    redirectToBooking() {
      this.$router.push('/booking');
    },
    onDeletion() {
      // Close dialog box and reset deletion
      this.showConfirmationDialog = false;

      // Send delete request to api
      axios.delete(`/reservations/${this.selectedReservation}`)
        .then((response) => {
          // Remove reservation from list in case of success
          if (response.data.success) {
            this.reservations = this.reservations.map(a => (a.filter(b => b._id !== this.selectedReservation))); // eslint-disable-line
            eventBus.pushNotification('success', 'Reservation has been cancelled.');
          }
        })
        .catch(error => eventBus.pushNotification('error', error.message));
    },
  },
  created() {
    // Fetch reservations of user for current date+
    axios.get(`/reservations?filters={"user":"${this.user.id}", "from": { "$gte": "${moment.utc().format()}"}}`)
      .then((response) => {
        // Check if request succeed
        if (!response.data.success) return;

        // Set some dates
        const day = moment().startOf('day');
        const dayEnd = moment().endOf('day');
        const weekEnd = moment().endOf('week');
        const monthEnd = moment().endOf('month');
        const yearEnd = moment().endOf('year');

        // Set some ranges
        const dayRange = moment().range(day, dayEnd);
        const weekRange = moment().range(day, weekEnd);
        const monthRange = moment().range(day, monthEnd);
        const yearRange = moment().range(day, yearEnd);

        // Set some containers
        const reservationsOfDay = [];
        const reservationsOfWeek = [];
        const reservationsOfMonth = [];
        const reservationsOfYear = [];

        // Filter on payload
        this.reservations = response.data.payload.sort((a, b) => moment(a.from).diff(b.from));
        this.reservations.forEach((el) => {
          if (dayRange.contains(moment(el.from))) reservationsOfDay.push(el);
          if (weekRange.contains(moment(el.from))) reservationsOfWeek.push(el);
          if (monthRange.contains(moment(el.from))) reservationsOfMonth.push(el);
          if (yearRange.contains(moment(el.from))) reservationsOfYear.push(el);
        });

        // Transform reservations into array of arrays containing data
        this.reservations = [
          reservationsOfDay,
          reservationsOfWeek,
          reservationsOfMonth,
          reservationsOfYear,
        ];
      })
      .catch(error => eventBus.pushNotification('error', error.message));
  },
};
</script>

<style lang="scss">
#reservations {
  width: 100vw;
  min-height: 100vh;
  min-height: calc(100vh - 80px);
  margin: 0;
  padding: 0;

  & .reservations-wrapper {

    margin: 5vh auto;
    min-height: 300px;

    & .mu-tab-wrapper {
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
      padding: 20px;
    }

    & .mu-tab-link-highlight {
      height: 4px;
    }
    & .reservations-list, & .reservations-sublist {
      height: auto;
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      & .reservation-no-slot {
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & p {
          letter-spacing: 1px;
          color: #333;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
        }
        & button {
          margin-top: 50px;
          font-family: 'Oswald', sans-serif;
        }
      }
      & .reservation-slot {
        letter-spacing: 1px;
        color: #333;
        padding: 15px 20px;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        display: flex;

        & .reservation-slot-content {
          flex: 10;
        }
        & .reservation-slot-icon {
          flex: 1;
          font-size: 20px;
          color: #DB4437;
          opacity: .7;
          transition: .3s ease-in-out;
          cursor: pointer;
          &:hover {
            opacity: 1;
            transition: .3s ease-in-out;
          }

        }
      }
    }
  }
}
</style>

<style lang="scss">
.alert-dialog {
  & .mu-dialog-body {
    padding: 24px 24px 20px;
  }
}
</style>
