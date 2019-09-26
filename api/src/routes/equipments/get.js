import express from 'express';
import { Equipments } from '../../models';
import { fetchAll } from '../../helpers';

/*
  This route fetches equipments from database.
*/
export default express.Router().get('/', (req, res) => {

  // Check for filters in request
  let filters;
  try { filters = req.query.filters ? JSON.parse(req.query.filters) : {}; } catch (e) { return res.status(422).json({ success: false, message: 'Invalid filters' }); }

  // Fetch data
  return fetchAll(Equipments, filters)
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }));
});
