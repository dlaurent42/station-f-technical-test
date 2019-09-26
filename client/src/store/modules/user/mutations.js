import * as types from '../../types/user';

export default {
  [types.MUTATE_LOGIN]: (state, payload) => {
    state.id = payload.id;
    state.username = payload.username;
    state.role = payload.role;
  },
  [types.MUTATE_LOGOUT]: (state) => {
    state.id = null;
    state.username = null;
    state.role = null;
  },
  [types.MUTATE_ERROR]: (state, payload) => {
    state.error = payload;
  },
};
