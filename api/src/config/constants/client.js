import dotenv from 'dotenv';

dotenv.config();

export default {
  HOST: process.env.CLIENT_HOST || '127.0.0.1',
  PORT: process.env.CLIENT_PORT || '8080',
  URI: process.env.CLIENT_URI || '127.0.0.1:8080',
};
