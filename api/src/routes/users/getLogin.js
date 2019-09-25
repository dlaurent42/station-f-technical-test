import express from 'express';
import bcrypt from 'bcrypt';
import JWT from '../../config/constants/jwt';
import { Users } from '../../models';
import { fetchOne, sign } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route checks user password.
*/

const checkPassword = (res, password, user) => (
  new Promise((resolve, reject) => (
    bcrypt.hash(password, user.salt, (error, hash) => {
      if (error) reject(error);
      else if (hash !== user.password) {
        res.status(403);
        reject(new Error('Wrong password.'));
      } else resolve(user);
    })
  ))
);

export default express.Router().get('/login', (req, res) => {

  // Fetch input data from body
  const { username, email, password } = req.query;

  // Verify data
  if ((!username && !email) || !password) return res.status(422).json({ success: false, message: 'Invalid input' });

  // Create a variable to store accessToken, refreshToken and user information
  let user;
  let accessToken;
  let refreshToken;

  // Create document
  return fetchOne(Users, { $or: [{ username }, { email }] })
    .then((document) => {

      // Verify whether returned document is empty
      if (isEmpty(document)) {
        res.status(403);
        throw new Error('User not found');
      }

      // Check user password
      return checkPassword(res, password, document);
    })
    .then((payload) => {

      // Store user data
      user = { _id: payload._id, username: payload.username, role: payload.role };

      // Ask for a new access token
      return sign(user, JWT.DURATION);
    })
    .then((token) => {

      // Assign fresh token to access token
      accessToken = token;

      // Ask for a new refresh token
      return sign(user, JWT.DURATION_REFRESH);
    })
    .then((token) => {

      // Assign fresh token to refresh token
      refreshToken = token;

      return res.status(200).json({
        success: true,
        payload: {
          accessToken,
          refreshToken,
          user,
        },
      });
    })
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: error.message })
        : res.json({ success: false, message: error.message })
    ));
});
