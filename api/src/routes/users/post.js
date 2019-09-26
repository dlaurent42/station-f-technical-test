import express from 'express';
import { Users } from '../../models';
import { createOne, fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route creates a user in database.
  [! for testing purpose only !]
*/
export default express.Router().post('/', (req, res) => {

  // Fetch input data from body
  const { firstname, lastname, username, email, password, role = 'user' } = req.body;

  // Verify data
  if (!Users.verifyFirstname(firstname)
    || !Users.verifyLastname(lastname)
    || !Users.verifyUsername(username)
    || !Users.verifyEmail(email)
    || !Users.verifyPassword(password)
    || !Users.verifyRole(role)
  ) return res.status(422).json({ success: false, message: 'Invalid input' });

  // Create document
  return fetchOne(Users, { $or: [{ username }, { email }] })
    .then((document) => {
      if (!isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid name or email (already exists)');
      }
      return createOne(Users, { firstname, lastname, username, email, password, role });
    })
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: 'An error occured' })
        : res.json({ success: false, message: error.message })
    ));
});
