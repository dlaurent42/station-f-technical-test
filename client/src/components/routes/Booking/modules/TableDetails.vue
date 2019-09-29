<template>
  <div class="dialog-wrapper">
    <mu-card class="dialog-card">
      <mu-card-media>
        <img :src="room.image">
      </mu-card-media>
      <mu-card-title :title="room.name" />

      <!-- room capacity -->
      <mu-sub-header>Capacity</mu-sub-header>
      <mu-card-text>
        This room can contains up to
        {{ room.capacity }}
        attendees
      </mu-card-text>

      <!-- room description -->
      <mu-sub-header>Description</mu-sub-header>
      <mu-card-text>{{ room.description }}</mu-card-text>

      <!-- equipments list -->
      <mu-sub-header>Equipments</mu-sub-header>
      <mu-card-text v-if="room.equipments && room.equipments.length">
        <ul>
          <li v-for="equipment in room.equipments" :key="equipment._id">
            {{ equipment.name }}
          </li>
        </ul>
      </mu-card-text>
      <mu-card-text v-else>No equipments in this room.</mu-card-text>

      <!-- reservations list -->
      <mu-sub-header>Reservations</mu-sub-header>
      <mu-card-text v-if="room.reservations && room.reservations.length">
        <ul>
          <li v-for="reservation in room.reservations" :key="reservation._id">
            Reserved by
            {{ reservation.user.username }}
            {{ formattedFromTo(reservation.from, reservation.to) }}
          </li>
        </ul>
      </mu-card-text>
      <mu-card-text v-else>No reservation for this day.</mu-card-text>

      <!-- actions -->
      <mu-card-actions class="card-actions">
        <mu-button
          flat
          @click="close"
        >
          Close
        </mu-button>
        <mu-button
          color="rgb(74,74,74)"
          @click="submit"
          :disabled="!room.isBookable"
        >
          Book
        </mu-button>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    room: Object,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.close();
      this.$emit('submit');
    },
    formattedFromTo(from, to) {
      return `from ${moment(from).format('HH:mm')} to ${moment(to).format('HH:mm')}`;
    },
  },
};
</script>
