import dotenv from 'dotenv';

dotenv.config();

const WHITE_LIST = {
  SOCKET: process.env.SOCKETS_URI,
  CLIENT: process.env.CLIENT_URI,
};

export default {
  origin: (origin, callback) => {
    if ([WHITE_LIST.SOCKET, WHITE_LIST.CLIENT].indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('CORS indentification error!'));
  },
};
