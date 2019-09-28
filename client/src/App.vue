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
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  scroll-behavior: smooth;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
  font-family: 'Oswald', sans-serif;
}

#app {
  padding-bottom: 80px;
}

button, div.mu-form-item-label, div.mu-checkbox-label {
  font-family: 'Oswald', sans-serif;
}

.mu-card {
  font-family: 'Montserrat', sans-serif;
}


</style>
