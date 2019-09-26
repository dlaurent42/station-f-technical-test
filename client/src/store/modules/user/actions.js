import { get } from 'lodash';
import axios from '../../../services/axios';
import * as types from '../../types/user';
import router from '../../../router';

export default {
  [types.ACTION_LOGIN]: ({ commit }, payload) => (
    axios.get(`/users/login?username=${payload.username}&password=${payload.password}`)
      .then((response) => {
        const { user } = response.data.payload;
        commit(types.MUTATE_ERROR, null);
        commit(types.MUTATE_LOGIN, { id: user._id, username: user.username, role: user.role }); // eslint-disable-line
        localStorage.setItem('access-token', response.data.payload.accessToken);
        localStorage.setItem('refresh-token', response.data.payload.refreshToken);
        localStorage.setItem('user-id', user._id); // eslint-disable-line
        router.replace('/');
      })
      .catch((error) => {
        commit(types.MUTATE_ERROR, get(error, 'response.data.message') || get(error, 'message'));
      })
  ),
  [types.ACTION_AUTOLOGIN]: ({ commit }) => (
    new Promise((resolve) => {
      const id = localStorage.getItem('user-id');
      if (!id) return resolve(false);
      return axios.get(`/users/${id}`)
        .then((response) => {
          if (!response.data.success) return resolve(false);
          const user = response.data.payload;
          commit(types.MUTATE_LOGIN, { id: user._id, username: user.username, role: user.role }); // eslint-disable-line
          return resolve(true);
        })
        .catch(() => {
          localStorage.removeItem('user-id');
          localStorage.removeItem('access-token');
          localStorage.removeItem('refresh-token');
          return resolve(false);
        });
    })
  ),
  [types.ACTION_LOGOUT]: ({ commit }) => {
    commit(types.MUTATE_LOGOUT);
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    router.replace('/login');
  },
  [types.ACTION_ERROR]: ({ commit }, payload) => {
    commit(types.MUTATE_ERROR, payload);
  },
};
