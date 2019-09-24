import express from 'express';
import { Rooms } from '../../models';
import { fetchAll, populate } from '../../helpers';

/*
  This route fetches rooms from database.
*/
export default express.Router().get('/', (req, res) => {

  // Check for filters in request
  let filters;
  try { filters = req.query.filters ? JSON.parse(req.query.filters) : {}; } catch (e) { return res.status(422).json({ success: false, message: 'Invalid filters' }); }

  // Fetch data
  return fetchAll(Rooms, filters)
    .then(documents => populate(Rooms, documents, { path: 'equipments' }))
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => res.status(500).json({ success: false, message: error.message }));
});
