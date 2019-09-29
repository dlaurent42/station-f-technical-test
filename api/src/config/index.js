/* Config */
import importConfig from './constants/dotenv'; // eslint-disable-line

/* Constants */
import API from './constants/api';
import CLIENT from './constants/client';
import CORS from './constants/cors';
import DATABASE from './constants/database';
import JWT from './constants/jwt';
import SCOPE from './constants/scope';

/* Functions */
import setMongo from './functions/setMongo';
import setRouter from './functions/setRouter';

export {
  API,
  CLIENT,
  CORS,
  DATABASE,
  JWT,
  SCOPE,
  setMongo,
  setRouter,
};
