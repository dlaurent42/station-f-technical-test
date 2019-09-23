import express from 'express';
import { Rooms } from '../../models';

/*
  This route fetches rooms from database.
*/
export default express.Router().get('/', (req, res) => {
  const {
    offset = 0, // how many documents must be skipped
    limit = 50, // maximum number of documents to fetch
    sort = 'name', // name of field to use to sort results
  } = req.params;

  new Promise((resolve, reject) => (
    Rooms
      .find()
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate('equipments')
      .exec((error, data) => {
        if (error) reject(error);
        resolve(data);
      })
  ))
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => res.status(500).json({ success: false, message: error.message }));
});
