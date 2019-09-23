import dotenv from 'dotenv';

dotenv.config();

const DATABASE = {
  HOST: process.env.DATABASE_HOST || '127.0.0.1',
  PORT: process.env.DATABASE_PORT || '27017',
  NAME: process.env.DATABASE_NAME || 'myDatabase',
  USER: process.env.DATABASE_USER || '',
  PASS: process.env.DATABASE_PASS || '',
  OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: process.env.DATABASE_RECONNECT_INTERVAL || 5000,
  },
};

export default Object.assign(DATABASE, { PATH: `mongodb://${DATABASE.USER}:${DATABASE.PASS}@${DATABASE.HOST}:${DATABASE.PORT}/${DATABASE.NAME}` });
