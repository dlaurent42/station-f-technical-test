import express from 'express';
import { Users } from '../../models';
import { fetchAll } from '../../helpers';


/*
  This route fetches all users in database.
  [! for testing purpose only !]
*/
export default express.Router().get('/', (req, res) => (
  fetchAll(Users)
    .then(payload => res.status(200).json({
      success: true,
      payload: payload.map(user => ({ _id: user._id, username: user.username, role: user.role })),
    }))
    .catch(error => res.status(500).json({ success: false, message: error.message }))
));
