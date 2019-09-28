<template>
  <div class="menu" v-if="isAuthenticated" :class="{ opened: show, closed: !show }">
    <router-link id="menu-logo" to="/" exact>
      <img src="@/assets/logo.png" alt="logo" class="logo"/>
    </router-link>
    <div class="menu-burger" @click="show = !show">
      <span class="menu-burger-bar" :class="{ opened: show, closed: !show }"/>
      <span class="menu-burger-bar" :class="{ opened: show, closed: !show }"/>
      <span class="menu-burger-bar" :class="{ opened: show, closed: !show }"/>
    </div>
    <div v-if="show" class="menu-container">
      <div class="menu-items">
        <router-link
          @click.native="show = !show"
          class="menu-item"
          to="/"
          tag="div"
          exact
        >
          Dashboard
        </router-link>
        <router-link
          @click.native="show = !show"
          class="menu-item"
          to="/reservations"
          tag="div"
        >
          Reservations
        </router-link>
        <router-link
          @click.native="show = !show"
          class="menu-item"
          to="/booking"
          tag="div"
        >
          Book a room
        </router-link>
        <div @click="onLogout" class="menu-item">
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../../store/types/user';

export default {
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: types.IS_AUTHENTICATED,
      isAdmin: types.IS_ADMIN,
    }),
  },
  methods: {
    onLogout() {
      this.show = false;
      this.$store.dispatch(types.ACTION_LOGOUT);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 80px;
  padding-left: 25px;
  padding-right: 15px;
  z-index: 9999;
  background-color: white;
  -webkit-user-select: none;
  user-select: none;
  box-shadow: 1px 1px 5px rgb(50,50,50);
  &.opened {
    position: fixed;
  }
  & .menu-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }
  & .logo {
    height: 80px;
    width: auto;
  }
  & .menu-burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10001;
    padding: 10px;
    transition: .5s ease-in-out;
    cursor: pointer;
    & input {
      display: block;
      width: 40px;
      height: 32px;
      position: fixed;
      top: -7px;
      left: -5px;

      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the hamburger */

      -webkit-touch-callout: none;
    }

    & .menu-burger-bar {
      cursor: pointer;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: rgb(24,24,24);
      border-radius: 3px;

      z-index: 1;

      transform-origin: 4px 0px;

      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;

      &:first-child { transform-origin: 0% 0%; }
      &:nth-child(2) { transform-origin: 0% 100%; }
      &.opened {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -16px);
        background: #232323;
      }
      &.opened:first-child { transform: rotate(45deg) translate(4px, -4px); }
      &.opened:nth-child(2) { transform: rotate(-45deg) translate(-5px, 14px); }
      &.opened:last-child {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    }
    &:hover {
      opacity: .7;
      transition: .5s ease-in-out;
      & .menu-burger-bar.closed:first-child {
        transform: translateY(-4px);
      }
      & .menu-burger-bar.closed:last-child {
        transform: translateY(4px);
      }
    }
  }
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: white;
  color: rgb(40, 44, 52);
  z-index: 1000;

  & .menu-items {
    position: fixed;
    top: 50vh;
    left: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -50%);
    cursor: pointer;
    & .menu-logo {
      padding: 30px 0;
      & img {
        height: 40px;
      }
    }
    & .separator {
      height: 1px;
      width: 200px;
      margin: 0;
      background: rgba(40, 44, 52, 0.5);
    }
    & .menu-item {
      letter-spacing: 2px;
      padding: 5px 10px;
      margin: 0 5px;
      border-bottom: 1px solid transparent;
      opacity: .85;
      transition: .5s;
      padding: 15px 10px;
      font-family: 'Oswald';
      font-size: 20px;
      text-transform: uppercase;
      &:link, &:visited, &:active {
        text-decoration: none;
        color: inherit;
        transition: .5s;
      }
      &:hover {
        opacity: 1;
        letter-spacing: 4px;
      }
      &.router-link-active {
        opacity: 0.2;
        &:hover {
          opacity: 0.2;
          letter-spacing: 2px;
        }
      }
    }
  }
}
</style>
