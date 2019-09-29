<template>
  <div>
    <h4>{{ rooms.reduce((total, room) => total + +room.isBookable, 0) }} rooms available</h4>

    <!-- list of room cards -->
    <mu-grid-list class="booking-grid">
      <div class="loading" :class="{ 'loading-hide': !loading }">
        <PulseLoader color="#666" />
        Spinner duration set to 2500ms
      </div>
      <mu-card
        class="card"
        v-for="room in rooms"
        :key="room._id"
        :class="{ 'card-hide': loading }"
      >
        <mu-card-media>
          <img :src="room.image">
        </mu-card-media>
        <mu-card-title :title="room.name" />
        <mu-card-text>
          {{ room.description }}
        </mu-card-text>
        <mu-card-actions class="card-actions">
          <mu-button flat @click="roomDetails = { data: room, show: true }">Details</mu-button>
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
    <mu-dialog :open.sync="roomDetails.show">
      <app-room-details
        :room="roomDetails.data"
        @close="roomDetails.show = false"
        @submit="onSubmit(roomDetails.data._id)"
      />
    </mu-dialog>
  </div>
</template>

<script>
import { PulseLoader } from '@saeris/vue-spinners';
import { find, get, sortBy } from 'lodash';
import TableDetails from './TableDetails.vue';
import eventBus from '@/eventBuses/booking';

export default {
  data: () => ({
    roomDetails: {
      show: false,
      data: {},
    },
    loading: false,
    rooms: [],
  }),
  components: {
    'app-room-details': TableDetails,
    PulseLoader,
  },
  methods: {
    onSubmit(room) {
      eventBus.submit(room);
    },
    openDialog(room) {
      this.dialogRoomData = room;
      this.roomDetailsOpen = true;
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
    eventBus.$on('changeLoading', (value) => {
      if (this.loading && !value) {
        setTimeout(() => {
          this.loading = value;
        }, 2500);
      } else this.loading = value;
    });
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
  position: absolute;
  font-family: 'Oswald';
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  color: #666;
  padding: 70px 0;
  transition: .5s ease-in-out;
  & div {
    margin-bottom: 20px;
  }
  &.loading-hide {
    opacity: 0;
    transition: .5s ease-in-out;
  }
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
    transition: .5s ease-in-out;
    &.card-hide {
      opacity: 0;
      transition: .5s ease-in-out;
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
  overflow-x: hidden;
  & .mu-dialog-body {
    padding: 0;
    & .mu-card {
      width: fit-content;
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
  @media (max-width: 768px) {
    max-width: 300px;
    width: 100vw;
    height: 90vh;
  }
}
</style>
