<template>
  <div id="app">
    <app-header />
    <router-view/>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from './store/types/user';
import Header from './components/navigation/Header.vue';
import Footer from './components/navigation/Footer.vue';

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-footer': Footer,
  },
  computed: {
    ...mapGetters({
      user: types.GET_USER,
    }),
  },
  created() {
    this.$store.dispatch(types.ACTION_AUTOLOGIN);
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
