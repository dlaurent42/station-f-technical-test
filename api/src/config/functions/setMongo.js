import mongoose from 'mongoose';
import DATABASE from '../constants/database';
import { sleep } from '../../utils';

const connect = () => mongoose.connect(DATABASE.PATH, DATABASE.OPTIONS);

export default () => {
  const db = mongoose.connection;

  // Reconnect on error
  db.on('error', () => mongoose.disconnect());

  // Reconnect on disconnect
  db.on('disconnected', () => {
    sleep(5000);
    connect();
  });

  // Connect
  connect();
};
