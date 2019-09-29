export default {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development' || origin === process.env.CLIENT_URI) callback(null, true);
    else callback(new Error('CORS identification error!'));
  },
};
