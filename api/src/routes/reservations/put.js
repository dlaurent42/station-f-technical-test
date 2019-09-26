import express from 'express';
import moment from 'moment';
import { Reservations, Rooms, Users } from '../../models';
import { updateOneById, fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route insert a document in database.
*/
export default express.Router().put('/:id', (req, res) => {

  // Fetch input data from body
  const { duration, roomId: room, userId: user } = req.body;
  let { from } = req.body;
  from = new Date(from);
  const to = moment.utc(from).add(duration, 'minutes').format();
  const { id } = req.params;

  // Verify data
  if (!Reservations.verifyFrom(from)) return res.status(422).json({ success: false, message: 'Invalid date' });
  if (!Reservations.verifyDuration(duration)) return res.status(422).json({ success: false, message: 'Invalid duration' });
  if (!room) return res.status(422).json({ success: false, message: 'Invalid room id' });
  if (!user) return res.status(422).json({ success: false, message: 'Invalid user id' });

  // Transform 'from' variable to formated moment js one
  from = moment.utc(from).format();

  // Verify if room exists
  return fetchOne(Rooms, { _id: room })
    .then((document) => {

      // Check whether returned document is empty
      if (isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid room id');
      }

      // Verify if user exists
      return fetchOne(Users, { _id: user });
    })
    .then((document) => {

      // Check whether returned document is empty
      if (isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid user id');
      }

      // Check if slot is not already taken (looking for conflicts)
      return fetchOne(Reservations, {
        _id: { $ne: id },
        $or: [
          { $and: [{ from: { $lt: from }, to: { $gt: from } }] }, // eslint-disable-line
          { $and: [{ from: { $lt: to }, to: { $gt: to } }] },
        ],
      });
    })
    .then((document) => {

      // Check whether returned document is empty
      if (!isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid slot');
      }

      // Create document
      return updateOneById(Reservations, id, { from, to, duration, room, user });
    })
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: 'An error occured' })
        : res.json({ success: false, message: error.message })
    ));
});
