import dotenv from 'dotenv';

dotenv.config();

export default {
  HOST: process.env.API_HOST || '127.0.0.1',
  PORT: process.env.API_PORT || '3000',
  URI: process.env.API_URI || '127.0.0.1:3000',
};
