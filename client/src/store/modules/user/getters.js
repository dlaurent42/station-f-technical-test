import * as types from '../../types/user';

export default {
  [types.GET_USER]: state => state,
  [types.IS_AUTHENTICATED]: state => state.username !== null,
  [types.IS_ADMIN]: state => state.role === 'admin',
};
