import express from 'express';
import moment from 'moment';
import { omit } from 'lodash';
import { Rooms, Reservations } from '../../models';
import { fetchAll, populate } from '../../helpers';

/*
  This route fetches slots by room from database.
*/
export default express.Router().get('/slots', (req, res) => {

  // Check for date in request
  const date = req.query.date || new Date();

  // Declare a variable to store rooms
  let rooms = [];

  // Fetch rooms
  return fetchAll(Rooms)
    .then(documents => populate(Rooms, documents, { path: 'equipments' }))
    .then((documents) => {

      // Assign returned documents to rooms
      rooms = documents;

      // Fetch reservations of the day
      return fetchAll(Reservations, {
        $and: [
          { from: { $gte: moment.utc(moment(date).startOf('day')).format() } },
          { to: { $lte: moment.utc(moment(date).endOf('day')).format() } },
        ],
      });
    })
    .then(documents => populate(Reservations, documents, { path: 'user', select: ['_id', 'username'] }))
    .then(reservations => res.status(200).json({
      success: true,
      // Loop through rooms to assign relative reservations (sanitized)
      payload: rooms.map(room => Object.assign(room, { reservations: reservations
        .filter(reservation => reservation.room === room._id)
        .map(reservation => omit(reservation, 'room')),
      })),
    }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }));
});
