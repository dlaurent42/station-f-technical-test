<template>
  <mu-data-table
    :loading="loading"
    :columns="columns"
    :sort.sync="sort"
    @sort-change="onSortChange"
    :data="rooms"
    no-data-text="No rooms found."
    class="booking-table"
    rowClassName="booking-table-row"
  >
    <template slot="expand" slot-scope="prop">
      <div style="padding: 24px;" >
        <mu-list>
          <mu-list-item-title>{{ prop.row.name }}</mu-list-item-title>
          <mu-list-item>Capacity: {{ prop.row.capacity }} people</mu-list-item>
          <mu-list-item>{{ prop.row.description }}</mu-list-item>
          <mu-list-item-title>Equipments</mu-list-item-title>
          <mu-list-item v-if="prop.row.equipments.length">
            <mu-chip v-for="equipment in prop.row.equipments" :key="equipment.id" class="chip">
              {{ equipment.name }}
            </mu-chip>
          </mu-list-item>
          <mu-list-item v-else>No equipments in this meeting room.</mu-list-item>
          <mu-list-item-title>Reservations</mu-list-item-title>
          <ul v-if="prop.row.reservations.length">
            <li v-for="reservation in prop.row.reservations" :key="reservation._id">
              Reserved by
              {{ reservation.user.username }}
              {{ formattedFromTo(reservation.from, reservation.to) }}
            </li>
          </ul>
          <mu-list-item v-else>No reservations for this day.</mu-list-item>
          <mu-flex fill align-items="center" justify-content="center">
            <mu-button small color="rgba(24, 45, 67, .8)" @click="onSubmit(prop.row._id)">
              Book this room
            </mu-button>
          </mu-flex>
        </mu-list>
      </div>
    </template>
    <template slot-scope="scope">
      <td class="is-center">{{ scope.row.capacity }}</td>
      <td class="is-center">{{ scope.row.name }}</td>
      <td class="is-center">{{ scope.row.description }}</td>
    </template>
  </mu-data-table>
</template>

<script>
import moment from 'moment';
import eventBus from '../../../eventBuses/booking';

export default {
  data: () => ({
    loading: false,
    rooms: [],
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
  },
  created() {
    // Add eventBus listeners
    eventBus.$on('changeLoading', (value) => { this.loading = value; });
    eventBus.$on('changeRooms', (rooms) => { this.rooms = rooms; });
  },
};
</script>

<style lang="scss" scoped>
.booking-table {
  background: transparent;
  & .is-expand div {
    background-color: #efefef;
    color: #343434;
    & .chip {
      margin: 8px;
      vertical-align: middle;
      background: #bbb;
      color: #343434;
    }
  }
}
</style>

<style>
.booking-table-row  {
  cursor: pointer;
}
</style>
