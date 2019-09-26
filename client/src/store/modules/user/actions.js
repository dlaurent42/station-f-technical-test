import axios from 'axios';
import { get } from 'lodash';
import * as types from '../../types/user';
import router from '../../../router';

const instance = axios.create({ baseURL: process.env.VUE_APP_API_URI });

export default {
  [types.ACTION_LOGIN]: ({ commit }, payload) => (
    instance.get(`/users/login?username=${payload.username}&password=${payload.password}`)
      .then((response) => {
        console.log(response);
        localStorage.setItem('access-token', response.data.payload.accessToken);
        localStorage.setItem('refresh-token', response.data.payload.refreshToken);
        const { user } = response.data.payload;
        commit(types.MUTATE_ERROR, null);
        commit(types.MUTATE_LOGIN, { id: user._id, username: user.username, role: user.role }); // eslint-disable-line
        router.replace('/');
      })
      .catch((error) => {
        commit(types.MUTATE_ERROR, get(error, 'response.data.message') || get(error, 'message'));
      })
  ),
  [types.ACTION_AUTOLOGIN]: () => {
    // Todo
  },
  [types.ACTION_LOGOUT]: ({ commit }) => {
    commit(types.MUTATE_LOGOUT);
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    router.replace('/login');
  },
  [types.ACTION_ERROR]: ({ commit }, payload) => {
    commit(types.MUTATE_ERROR, payload);
  },
};
