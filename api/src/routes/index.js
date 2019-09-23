/* Middleware(s) */

/* Routes(s) */
import getRooms from './rooms/get';

const routes = {
  '': [],
  '/rooms': [
    getRooms,
  ],
  '/reservations': [],
};

export default routes;
