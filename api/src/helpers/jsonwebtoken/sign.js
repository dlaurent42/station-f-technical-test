import jwt from 'jsonwebtoken';
import JWT from '../../config/constants/jwt';

export default (payload, expiresIn) => (
  new Promise((resolve, reject) => (
    jwt.sign(payload, JWT.SECRET, { expiresIn: expiresIn * 1000 }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    })
  ))
);
