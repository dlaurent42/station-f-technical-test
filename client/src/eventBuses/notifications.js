import Vue from 'vue';

export default new Vue({
  methods: {
    pushNotification(type, text) {
      this.$emit('pushNotification', { type, text });
    },
  },
});
