import express from 'express';
import { Users } from '../../models';
import { fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route fetches one user in database.
*/
export default express.Router().get('/:id', (req, res) => (
  fetchOne(Users, { _id: req.params.id })
    .then(document => (
      (!isEmpty(document))
        ? res.status(200).json({
          success: true,
          payload: { _id: document._id, username: document.username, role: document.role },
        })
        : res.status(200).json({
          success: false,
          message: 'User not found',
        })
    ))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }))
));
