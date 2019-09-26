/* Middleware(s) */
import authMiddleware from '../middleware/auth';

/* Routes(s) */
import getRefreshAuth from './auth/refresh';

import deleteEquipments from './equipments/delete';
import getEquipments from './equipments/get';
import postEquipments from './equipments/post';
import putEquipments from './equipments/put';

import deleteReservations from './reservations/delete';
import getReservations from './reservations/get';
import postReservations from './reservations/post';
import putReservations from './reservations/put';

import deleteRooms from './rooms/delete';
import getRooms from './rooms/get';
import getSlotsRooms from './rooms/getSlots';
import postRooms from './rooms/post';
import putRooms from './rooms/put';

import getUsers from './users/get';
import getUsersId from './users/getId';
import getUsersLogin from './users/getLogin';
import postUsers from './users/post';

export default {
  '': [
    authMiddleware,
  ],
  '/auth': [
    getRefreshAuth,
  ],
  '/equipments': [
    deleteEquipments,
    getEquipments,
    postEquipments,
    putEquipments,
  ],
  '/reservations': [
    deleteReservations,
    getReservations,
    postReservations,
    putReservations,
  ],
  '/rooms': [
    deleteRooms,
    getRooms,
    getSlotsRooms,
    postRooms,
    putRooms,
  ],
  '/users': [
    getUsers,
    getUsersId,
    getUsersLogin,
    postUsers,
  ],
};
