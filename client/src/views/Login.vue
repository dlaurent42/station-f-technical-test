<template>
  <div id="login">
    <form @submit.prevent="onSubmit" class="login-form">
      {{ error.username }}
      {{ error.password }}
      {{ formError }}
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
      <span v-if="formError !== null">{{ formError }}</span>
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
