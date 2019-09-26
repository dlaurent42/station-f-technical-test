<template>
  <div id="login">
    <form @submit.prevent="onSubmit" class="login-form">
      <h1>LOGIN</h1>
      <md-field :class="{ 'md-invalid': error.username }">
        <label>Username</label>
        <md-input v-model="username"></md-input>
        <span v-if="error.username !== null" class="md-error">Username is required</span>
      </md-field>
      <md-field :class="{ 'md-invalid': error.password }">
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
        <span v-if="error.password !== null" class="md-error">Password is required</span>
      </md-field>
      <md-button type="submit" class="md-raised md-primary">Submit</md-button>
      <div class="error" v-if="formError !== null">{{ formError }}</div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../store/types/user';

export default {
  data: () => ({
    username: '',
    password: '',
    error: {
      username: false,
      password: false,
    },
  }),
  computed: {
    ...mapGetters({
      formError: types.GET_USER_ERROR,
    }),
  },
  methods: {
    onSubmit() {
      // Reset errors
      this.error.username = false;
      this.error.password = false;
      this.$store.dispatch(types.ACTION_ERROR, null);

      // Check inputs
      if (!this.username.trim().length) this.error.username = true;
      if (!this.password.trim().length) this.error.password = true;
      if (this.error.username || this.error.password) return;

      // Dispatch action
      this.$store.dispatch(types.ACTION_LOGIN, {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgb(24,24,24);

  .login-form {
    width: 400px;
    background-color: #eee;
    padding: 40px;
    border-radius: 5px;
    // box-shadow: 10px 10px 0px #888;

    .error {
      color: #ff1744;
    }

  }
  @media (max-width: 450px) {
    background-color: #eee;

    & .login-form {
      width: 300px;
    }
  }


}
</style>
