import express from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../../models';
import { fetchOne } from '../../helpers';
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

  // Create document
  return fetchOne(Users, { $or: [{ username }, { email }] })
    .then((document) => {
      if (isEmpty(document)) {
        res.status(403);
        throw new Error('User not found');
      }
      return checkPassword(res, password, document);
    })
    .then(payload => (
      res.status(200).json({
        success: true,
        payload: { _id: payload._id, username: payload.username, role: payload.role },
      })
    ))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: error.message })
        : res.json({ success: false, message: error.message })
    ));
});
