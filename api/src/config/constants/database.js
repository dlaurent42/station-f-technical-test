const DATABASE = {
  HOST: process.env.DATABASE_HOST,
  PORT: process.env.DATABASE_PORT,
  NAME: process.env.DATABASE_NAME,
  USER: process.env.DATABASE_USER,
  PASS: process.env.DATABASE_PASS,
  OPTIONS: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: process.env.DATABASE_RECONNECT_INTERVAL,
  },
};

export default Object.assign(DATABASE, { PATH: `mongodb://${DATABASE.USER}:${DATABASE.PASS}@${DATABASE.HOST}:${DATABASE.PORT}/${DATABASE.NAME}` });
