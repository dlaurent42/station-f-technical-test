import dotenv from 'dotenv';

dotenv.config();

export default {
  SECRET: process.env.JWT_SECRET || 'this is my secret',
  DURATION: process.env.JWT_DURATION || 900,
  DURATION_REFRESH: process.env.JWT_DURATION_REFRESH || 3600,
};
