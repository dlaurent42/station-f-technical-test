import axios from 'axios';
import * as types from '../../types/user';

const instance = axios.create({ baseURL: process.env.API_URI });

export default {
  [types.ACTION_LOGIN]: ({ commit }, payload) => (
    instance.get(`/users/login?username=${payload.username}&password=${payload.password}`)
      .then((response) => {
        console.log(response);
        localStorage.setItem('access-token', response.data.accessToken);
        localStorage.setItem('access-token', response.data.accessToken);
        const { user } = response.data;
        commit(types.MUTATE_LOGIN, { id: user._id, username: user.username, role: user.role }); // eslint-disable-line
      })
      .catch((error) => {
        console.error(error);
      })
  ),
  [types.ACTION_AUTOLOGIN]: () => {
    // Todo
  },
  [types.ACTION_LOGOUT]: ({ commit }) => {
    commit(types.MUTATE_LOGOUT);
  },
};
