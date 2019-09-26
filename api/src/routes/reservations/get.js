import express from 'express';
import { Reservations } from '../../models';
import { fetchAll, populate } from '../../helpers';

/*
  This route fetches reservations from database.
*/
export default express.Router().get('/', (req, res) => {

  // Check for filters in request
  let filters;
  try { filters = req.query.filters ? JSON.parse(req.query.filters) : {}; } catch (e) { return res.status(422).json({ success: false, message: 'Invalid filters' }); }

  // Fetch data
  return fetchAll(Reservations, filters)
    .then(documents => populate(Reservations, documents, { path: 'room' }))
    .then(documents => populate(Reservations, documents, { path: 'room.equipments' }))
    .then(documents => populate(Reservations, documents, { path: 'user', select: ['_id', 'username'] }))
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }));
});
