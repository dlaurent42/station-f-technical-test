import express from 'express';
import { Rooms } from '../../models';

/*
  This route deletes a room from the database.
*/
export default express.Router().delete('/:id', (req, res) => {

  new Promise((resolve, reject) => (
    Rooms.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) reject(error);
      resolve(data);
    })
  ))
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => res.status(500).json({ success: false, message: error.message }));
});
