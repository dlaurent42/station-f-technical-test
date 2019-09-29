<template>
  <div>
    <h4>{{ rooms.reduce((total, room) => total + +room.isBookable, 0) }} rooms available</h4>

    <!-- list of room cards -->
    <div v-if="loading" class="loading">Loading ...</div>
    <mu-grid-list v-else class="booking-grid">
      <mu-card class="card" v-for="room in rooms" :key="room._id">
        <mu-card-media>
          <img :src="room.image">
        </mu-card-media>
        <mu-card-title :title="room.name" />
        <mu-card-text>
          {{ room.description }}
        </mu-card-text>
        <mu-card-actions class="card-actions">
          <mu-button flat @click="openDialog(room)">Details</mu-button>
          <mu-button
            color="rgb(74,74,74)"
            :disabled="!room.isBookable"
            @click="onSubmit(room._id)"
          >
            Book
          </mu-button>
        </mu-card-actions>
      </mu-card>
    </mu-grid-list>

    <!-- details dialog box -->
    <mu-dialog :open.sync="dialogIsOpened">
      <div class="dialog-wrapper">
        <mu-card class="dialog-card">
          <mu-card-media>
            <img :src="dialogRoomData.image">
          </mu-card-media>
          <mu-card-title :title="dialogRoomData.name" />

          <!-- room capacity -->
          <mu-sub-header>Capacity</mu-sub-header>
          <mu-card-text>
            This room can contains up to
            {{ dialogRoomData.capacity }}
            attendees
          </mu-card-text>

          <!-- room description -->
          <mu-sub-header>Description</mu-sub-header>
          <mu-card-text>{{ dialogRoomData.description }}</mu-card-text>

          <!-- equipments list -->
          <mu-sub-header>Equipments</mu-sub-header>
          <mu-card-text v-if="dialogRoomData.equipments && dialogRoomData.equipments.length">
            <ul>
              <li v-for="equipment in dialogRoomData.equipments" :key="equipment._id">
                {{ equipment.name }}
              </li>
            </ul>
          </mu-card-text>
          <mu-card-text v-else>No equipments in this room.</mu-card-text>

          <!-- reservations list -->
          <mu-sub-header>Reservations</mu-sub-header>
          <mu-card-text v-if="dialogRoomData.reservations && dialogRoomData.reservations.length">
            <ul>
              <li v-for="reservation in dialogRoomData.reservations" :key="reservation._id">
                Reserved by
                {{ reservation.user.username }}
                {{ formattedFromTo(reservation.from, reservation.to) }}
              </li>
            </ul>
          </mu-card-text>
          <mu-card-text v-else>No reservation for this day.</mu-card-text>

          <!-- actions -->
          <mu-card-actions class="card-actions">
            <mu-button flat @click="dialogIsOpened = false">Close</mu-button>
            <mu-button
              color="rgb(74,74,74)"
              @click="dialogIsOpened = false;
              onSubmit(dialogRoomData._id)"
              :disabled="!dialogRoomData.isBookable"
            >
              Book
            </mu-button>
          </mu-card-actions>
        </mu-card>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { find, get, sortBy } from 'lodash';
import moment from 'moment';
import eventBus from '@/eventBuses/booking';

export default {
  data: () => ({
    dialogIsOpened: false,
    dialogRoomData: {},
    loading: false,
    rooms: [],
  }),
  methods: {
    formattedFromTo(from, to) {
      return `from ${moment(from).format('HH:mm')} to ${moment(to).format('HH:mm')}`;
    },
    onSubmit(room) {
      eventBus.submit(room);
    },
    openDialog(room) {
      this.dialogRoomData = room;
      this.dialogIsOpened = true;
    },
  },
  created() {
    // Declare images list
    const images = [
      'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/1282315/pexels-photo-1282315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/210620/pexels-photo-210620.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/159805/meeting-modern-room-conference-159805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ];

    // Add eventBus listeners and assign a random image to each room
    eventBus.$on('changeLoading', (value) => { this.loading = value; });
    eventBus.$on('changeRooms', (rooms) => {
      this.rooms = sortBy(rooms.map(room => Object.assign(room, {
        image: get(find(this.rooms, { _id: room._id }), 'image') || images[Math.floor(Math.random() * images.length)], // eslint-disable-line
      })), 'isBookable').reverse();
    });
  },
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 30px;
}
.loading {
  font-family: 'Oswald';
  font-size: 40px;
  text-transform: uppercase;
  text-align: center;
  color: #666;
  padding: 70px 0;
}
.booking-grid {
  background: transparent;
  width: 90vw;
  padding: 0 5vw 5vh;
  margin: auto !important;
  justify-content: center;
  & .card {
    width: 100%;
    max-width: 375px;
    margin: 30px 15px;
    & .mu-card-media {
      height: 200px;
      overflow: hidden;
    }
    & .card-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      & button {
        margin: 10px 10px;
      }
    }
  }
  & .dialog-wrapper {
    & .dialog-card {
      box-shadow: none;
    }
  }
}
</style>

<style lang="scss">
.mu-dialog {
  max-width: 500px;
  max-height: 50vh;
  overflow-y: auto;
  & .mu-dialog-body {
    padding: 0;
    & .card-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      & button {
        margin: 10px 10px;
      }
    }
  }
  @media (max-width: 768px) {
    width: 100vw;
    height: 90vh;
  }
}
</style>
