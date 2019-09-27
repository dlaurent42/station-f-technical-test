<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from './store/types/user';
import Header from './components/navigation/Header.vue';

export default {
  name: 'app',
  components: {
    'app-header': Header,
  },
  computed: {
    ...mapGetters({
      user: types.GET_USER,
    }),
  },
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  scroll-behavior: smooth;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

#app {
  padding-bottom: 80px;
}
</style>
