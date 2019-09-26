<template>
  <div id="login">
    <form @submit.prevent="onSubmit" class="login-form">
      <md-field :class="{ 'md-invalid': error.username }">
        <label>Username</label>
        <md-input v-model="username" required></md-input>
        <span class="md-error">Username is required</span>
      </md-field>
      <md-field :class="{ 'md-invalid': error.password }">
        <label>Password</label>
        <md-input type="password" v-model="password" required></md-input>
        <span class="md-error">Password is required</span>
      </md-field>
      <md-button type="submit" class="md-raised md-primary">Submit</md-button>
    </form>
  </div>
</template>

<script>
import * as types from '../store/types/user';

export default {
  data: () => ({
    username: null,
    password: null,
    error: {
      username: false,
      password: false,
      form: false,
    },
  }),
  methods: {
    onSubmit() {
      // Reset errors
      this.error.username = false;
      this.error.password = false;
      this.error.form = false;

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
