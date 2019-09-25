import jwt from 'jsonwebtoken';
import JWT from '../../config/constants/jwt';

export default token => (
  new Promise((resolve, reject) => (
    jwt.verify(token, JWT.SECRET, (error, payload) => {
      if (error) reject(error);
      else resolve(payload);
    })
  ))
);
