const STATUS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ADMIN: 'admin',
};

const ROUTES = [
  // auth
  { method: 'GET', url: '/auth/refresh', scope: STATUS.PUBLIC },
  // equipments
  { method: 'DELETE', url: '/equipments', scope: STATUS.AUTHENTICATED },
  { method: 'GET', url: '/equipments', scope: STATUS.AUTHENTICATED },
  { method: 'POST', url: '/equipments', scope: STATUS.ADMIN },
  { method: 'PUT', url: '/equipments', scope: STATUS.ADMIN },
  // reservations
  { method: 'DELETE', url: '/reservations', scope: STATUS.AUTHENTICATED },
  { method: 'GET', url: '/reservations', scope: STATUS.AUTHENTICATED },
  { method: 'POST', url: '/reservations', scope: STATUS.AUTHENTICATED },
  { method: 'PUT', url: '/reservations', scope: STATUS.AUTHENTICATED },
  // rooms
  { method: 'DELETE', url: '/rooms', scope: STATUS.AUTHENTICATED },
  { method: 'GET', url: '/rooms/slots', scope: STATUS.AUTHENTICATED },
  { method: 'GET', url: '/rooms', scope: STATUS.AUTHENTICATED },
  { method: 'POST', url: '/rooms', scope: STATUS.ADMIN },
  { method: 'PUT', url: '/rooms', scope: STATUS.ADMIN },
  // users
  { method: 'GET', url: '/users/login', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/users/', scope: STATUS.AUTHENTICATED },
  { method: 'GET', url: '/users', scope: STATUS.AUTHENTICATED },
  { method: 'POST', url: '/users', scope: STATUS.ADMIN },
];

export default {
  STATUS,
  ROUTES,
};
