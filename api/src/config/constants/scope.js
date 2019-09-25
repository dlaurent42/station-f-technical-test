const STATUS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ADMIN: 'admin',
};

const ROUTES = [
  // auth
  { method: 'GET', url: '/auth/refresh', scope: STATUS.PUBLIC },
  // equipments
  { method: 'DELETE', url: '/equipments', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/equipments', scope: STATUS.PUBLIC },
  { method: 'POST', url: '/equipments', scope: STATUS.PUBLIC },
  { method: 'PUT', url: '/equipments', scope: STATUS.PUBLIC },
  // reservations
  { method: 'DELETE', url: '/reservations', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/reservations', scope: STATUS.PUBLIC },
  { method: 'POST', url: '/reservations', scope: STATUS.PUBLIC },
  { method: 'PUT', url: '/reservations', scope: STATUS.PUBLIC },
  // rooms
  { method: 'DELETE', url: '/rooms', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/rooms', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/rooms/slots', scope: STATUS.PUBLIC },
  { method: 'POST', url: '/rooms', scope: STATUS.PUBLIC },
  { method: 'PUT', url: '/rooms', scope: STATUS.PUBLIC },
  // users
  { method: 'GET', url: '/users', scope: STATUS.PUBLIC },
  { method: 'GET', url: '/users/login', scope: STATUS.PUBLIC },
  { method: 'POST', url: '/users', scope: STATUS.PUBLIC },
];

export default {
  STATUS,
  ROUTES,
};
