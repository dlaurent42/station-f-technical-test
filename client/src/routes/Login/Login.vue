<template>
  <mu-container id="login" :style="{ backgroundImage }">
    <mu-form ref="form" :model="form" class="login-form">
      <h1>LOGIN</h1>

      <!-- username -->
      <mu-form-item label="username or email" prop="username" :rules="usernameRules">
        <mu-text-field v-model="form.username" prop="username" />
      </mu-form-item>

      <!-- password -->
      <mu-form-item label="password" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="form.password" prop="password" />
      </mu-form-item>

      <!-- submit -->
      <mu-form-item>
        <mu-button color="rgb(24, 45, 67)" @click="onSubmit">SUBMIT</mu-button>
      </mu-form-item>

      <!-- form error handler -->
      <div class="submit-error" v-if="submitError !== null">{{ submitError }}</div>
    </mu-form>
  </mu-container>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../../store/types/user';

export default {
  title: 'Station F | Login',
  data: () => ({
    usernameRules: [
      { validate: val => !!val, message: 'Username must be filled in' },
    ],
    passwordRules: [
      { validate: val => !!val, message: 'Password must be filled in' },
    ],
    form: {
      username: '',
      password: '',
    },
    images: [
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-314-1568044665.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-315-1568044665.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-316-1568044665.jpg',
      'https://www.vevs.com/images/meeting-room-booking-website-builder-demo.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-274-1568044665.jpg',
    ],
    backgroundImage: '',
  }),
  computed: {
    ...mapGetters({
      submitError: types.GET_USER_ERROR,
    }),
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate()
        .then((isValid) => {
          if (!isValid) return;

          // Reset errors
          this.$store.dispatch(types.ACTION_ERROR, null);
          // Dispatch action
          this.$store.dispatch(types.ACTION_LOGIN, {
            username: this.form.username,
            password: this.form.password,
          });
        });
    },
  },
  mounted() {
    this.backgroundImage = `linear-gradient(0deg,rgba(24,25,24,0.94),rgba(24,25,24,0.94)), url(${this.images[Math.floor(Math.random() * this.images.length)]})`;
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
  background-color: #181818;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 0;

  & .login-form {
    width: 400px;
    background-color: #eee;
    padding: 40px;
    border-radius: 5px;

    & h1 {
      padding: 20px 0;
    }

    & .submit-error {
      text-align: center;
      color: #ff1744;
    }

    & .mu-button {
      margin: auto;
    }

    & .mu-form-item__focus {
      color: rgb(24, 45, 67);
    }
    & .mu-input__focus {
      color: rgb(24, 45, 67);
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
