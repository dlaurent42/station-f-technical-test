<template>
  <div>
    <h3>{{ rooms.length }} rooms available</h3>
    <div v-if="loading">Loading ...</div>
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
          <mu-button color="rgb(74,74,74)" @click="onSubmit(room._id)">Book</mu-button>
        </mu-card-actions>
      </mu-card>
    </mu-grid-list>
    <mu-dialog :open.sync="dialogIsOpened">
      <div class="dialog-wrapper">
        <mu-card class="dialog-card">
          <mu-card-media>
            <img :src="dialogRoomDate.image">
          </mu-card-media>
          <mu-card-title :title="dialogRoomDate.name" />
          <mu-sub-header>Capacity</mu-sub-header>
          <mu-card-text>
            This room can contains up to
            {{ dialogRoomDate.capacity }}
            attendees
          </mu-card-text>
          <mu-sub-header>Description</mu-sub-header>
          <mu-card-text>{{ dialogRoomDate.description }}</mu-card-text>
          <mu-sub-header>Equipments</mu-sub-header>
          <mu-card-text v-if="dialogRoomDate.equipments && dialogRoomDate.equipments.length">
            <ul>
              <li v-for="equipment in dialogRoomDate.equipments" :key="equipment._id">
                {{ equipment.name }}
              </li>
            </ul>
          </mu-card-text>
          <mu-card-text v-else>No reservation for this day.</mu-card-text>
          <mu-sub-header>Reservations</mu-sub-header>
          <mu-card-text v-if="dialogRoomDate.reservations && dialogRoomDate.reservations.length">
            <ul>
              <li v-for="reservation in dialogRoomDate.reservations" :key="reservation._id">
                Reserved by
                {{ reservation.user.username }}
                {{ formattedFromTo(reservation.from, reservation.to) }}
              </li>
            </ul>
          </mu-card-text>
          <mu-card-text v-else>No reservation for this day.</mu-card-text>
          <mu-card-actions class="card-actions">
            <mu-button flat @click="dialogIsOpened = false">Close</mu-button>
            <mu-button
              color="rgb(74,74,74)"
              @click="dialogIsOpened = false;
              onSubmit(dialogRoomDate._id)"
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
import moment from 'moment';
import eventBus from '../../../eventBuses/booking';

export default {
  data: () => ({
    dialogIsOpened: false,
    dialogRoomDate: {},
    loading: false,
    rooms: [],
    images: [
      'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/1282315/pexels-photo-1282315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/210620/pexels-photo-210620.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/159805/meeting-modern-room-conference-159805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ],
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
      align: 'center',
    }],
  }),
  methods: {
    formattedFromTo(from, to) {
      return `from ${moment(from).format('HH:mm')} to ${moment(to).format('HH:mm')}`;
    },
    onSortChange({ name, order }) {
      this.rooms = this.rooms.sort((a, b) => {
        if (typeof a[name] === 'number' && typeof b[name] === 'number') return (order === 'asc') ? a[name] - b[name] : b[name] - a[name];
        if (a[name] < b[name]) return (order === 'asc') ? -1 : 1;
        if (a[name] > b[name]) return (order === 'asc') ? 1 : -1;
        return 0;
      });
    },
    onSubmit(room) {
      eventBus.submit(room);
    },
    openDialog(room) {
      this.dialogRoomDate = room;
      this.dialogIsOpened = true;
    },
  },
  created() {
    // Add eventBus listeners
    eventBus.$on('changeLoading', (value) => { this.loading = value; });
    eventBus.$on('changeRooms', (rooms) => {
      this.rooms = rooms.map(room => Object.assign(room, {
        image: this.images[Math.floor(Math.random() * this.images.length)],
      }));
    });
  },
};
</script>

<style lang="scss" scoped>
.booking-grid {
  background: transparent;
  width: 80vw;
  padding: 5vh 10vw;
  margin: auto !important;
  justify-content: center;
  & h3 {
    text-align: left;
    font-size: 20px;
    padding-top: 40px;
  }
  & .card {
    width: 100%;
    max-width: 375px;
    margin: 30px 15px;
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
  width: 50vw;
  height: 50vh;
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
