<template>
  <div id="dashboard">
    <app-section-title
      primary="DASHBOARD"
      secondary="Those statistics will brighten your day - or not"
    />
    <mu-container class="dashboard-wrapper">

      <!-- most booked rooms -->
      <h3 class="dashboard-subtitle">Your most booked rooms</h3>

      <!-- no booked rooms -->
      <div v-if="this.topBookedRooms.length === 0" class="dashboard-top-not-booked">
        <p>No reservations since beginning of the year, start now !</p>
        <mu-button color="#333" @click="redirectToBooking">Book a meeting room</mu-button>
      </div>

      <!-- top 3 booked rooms -->
      <mu-flex v-else justify-content="around" wrap="wrap">
        <mu-card
          v-for="(room, index) in this.topBookedRooms"
          :key="room._id"
          class="dashboard-top-booked"
        >
          <font-awesome-icon
            :icon="['trophy', 'medal', 'award'][index]"
            class="dashboard-top-booked-card-icon"
          />
          <mu-card-media>
            <img :src="room.image">
          </mu-card-media>
          <mu-card-title :title="room.name" />

          <!-- room capacity -->
          <mu-card-text>
            You booked this rooms
            <strong>{{ room.numberOfReservations }} times</strong>
            this year
          </mu-card-text>
        </mu-card>
      </mu-flex>

      <!-- time spent in meetings -->
      <h3 class="dashboard-subtitle">Your time in meetings</h3>
      <mu-flex justify-content="around" wrap="wrap">
        <app-dashboard-stat :duration="34" text="this week"/>
        <app-dashboard-stat :duration="340" text="this month"/>
        <app-dashboard-stat :duration="3400" text="this year"/>
      </mu-flex>

      <!-- best day to book a room -->
      <h3 class="dashboard-subtitle">Your best day to book a room</h3>
      <div v-if="favoriteDayToBookRooms && favoriteDayToBookRooms.day" class="day-to-book">
        {{ favoriteDayToBookRooms.day }}
        is definitly the best day with
        {{ favoriteDayToBookRooms.numberOfReservations }}
        reservations this year.
      </div>
      <div v-else class="day-to-not-book">Not enough data.</div>
    </mu-container>
  </div>
</template>

<script>
import Moment from 'moment';
import { groupBy, countBy } from 'lodash';
import { extendMoment } from 'moment-range';
import { mapGetters } from 'vuex';
import axios from '@/services/axios';
import * as types from '@/store/types/user';
import Stat from './modules/Stat.vue';

const moment = extendMoment(Moment);

export default {
  title: 'Station F | Dashboard',
  data: () => ({
    reservations: [],
    topBookedRooms: [],
    favoriteDayToBookRooms: {},
  }),
  components: {
    'app-dashboard-stat': Stat,
  },
  computed: {
    ...mapGetters({
      user: types.GET_USER,
    }),
  },
  methods: {
    getTimeSpentInMeetings(since) {
      const range = moment().range(moment().startOf(since), moment());
      return this.reservations.reduce((total, reservation) => (
        range.contains(moment(reservation.from))
          ? total + reservation.duration
          : total
      ), 0);
    },
    redirectToBooking() {
      this.$router.push('/booking');
    },
  },
  created() {
    // Fetch all reservations of user
    axios.get(`/reservations?filters={"user":"${this.user.id}"}`)
      .then((response) => {
        // Check if request succeed
        if (!response.data.success) return;

        // Assign to reservations
        this.reservations = response.data.payload;

        // Assign favorite days to book rooms
        [this.favoriteDayToBookRooms] = Object.entries(
          countBy(this.reservations.map(el => moment(el.from).weekday())),
        )
          .map(entry => ({ day: entry[0], numberOfReservations: entry[1] }))
          .sort((a, b) => b.numberOfReservations - a.numberOfReservations)
          .slice(0, 1)
          .map(el => ({
            ...el,
            day: moment().weekday(el.day).format('dddd'),
          }));

        // Assign to topBookedRooms
        const images = [
          'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/1282315/pexels-photo-1282315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/210620/pexels-photo-210620.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/159805/meeting-modern-room-conference-159805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ];
        this.topBookedRooms = Object
          .values(
            groupBy(this.reservations, obj => obj.room._id), // eslint-disable-line
          )
          .map(value => ({
            ...value[0].room,
            numberOfReservations: value.length,
            image: `${images[Math.floor(Math.random() * images.length)]}`,
          }))
          .sort((a, b) => b.numberOfReservations - a.numberOfReservations)
          .slice(0, 3);
      })
      .catch(() => {});
  },
};
</script>

<style lang="scss">
#dashboard {
  width: 100vw;
  min-height: 100vh;
  min-height: calc(100vh - 80px);
  margin: 0;
  padding: 0;
  & .dashboard-wrapper {
    margin-top: 30px;
    & .dashboard-subtitle {
      font-size: 40px;
      padding: 30px 0;
    }

    & .dashboard-top-booked {
      width: 300px;
      margin: 15px 0;
      & .mu-card-media {
        height: 200px;
        overflow: hidden;
      }
      & .dashboard-top-booked-card-icon {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 300px;
        height: 200px;
        font-size: 50px;
        opacity: .6;
        color: #ddd;
        padding: 40px 60px;
        background: black;
      }
    }

    & .dashboard-top-not-booked {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
      & p {
        letter-spacing: 1px;
        color: #333;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        padding: 20px 0;
      }
    }

    & .day-to-book, & .day-to-not-book {
      text-align: center;
      font-size: 25px;
      font-family: 'Montserrat';
      width: fit-content;
      text-align: center;
      margin: auto;
    }
  }

}
</style>
