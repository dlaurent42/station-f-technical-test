<template>
  <mu-container id="login">
    <mu-form ref="form" :model="form" class="login-form">
      <h1>LOGIN</h1>
      <mu-form-item label="username or email" prop="username" :rules="usernameRules">
        <mu-text-field v-model="form.username" prop="username" />
      </mu-form-item>
      <mu-form-item label="password" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="form.password" prop="password" />
      </mu-form-item>
      <mu-form-item>
        <mu-button color="rgb(24, 45, 67)" @click="onSubmit">SUBMIT</mu-button>
      </mu-form-item>
      <div class="submit-error" v-if="submitError !== null">{{ submitError }}</div>
    </mu-form>
  </mu-container>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../../store/types/user';

export default {
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
