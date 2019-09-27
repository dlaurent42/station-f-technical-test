import Vue from 'vue';

export default new Vue({
  methods: {
    setLoading(value) {
      this.$emit('changeLoading', value);
    },
    setRooms(rooms) {
      this.$emit('changeRooms', rooms);
    },
    submit(roomId) {
      this.$emit('submit', roomId);
    },
  },
});
