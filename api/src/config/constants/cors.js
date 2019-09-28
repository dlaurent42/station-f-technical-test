import dotenv from 'dotenv';

dotenv.config();

const WHITE_LIST = {
  CLIENT: process.env.CLIENT_URI,
};

export default {
  origin: (origin, callback) => {
    if ([WHITE_LIST.CLIENT].indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('CORS identification error!'));
  },
};
