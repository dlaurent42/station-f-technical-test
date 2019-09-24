import express from 'express';
import { Rooms } from '../../models';
import { deleteOneById } from '../../helpers';

/*
  This route deletes a room from the database based on its id.
*/
export default express.Router().delete('/:id', (req, res) => (
  deleteOneById(Rooms, req.params.id)
    .then(() => res.status(200).json({ success: true }))
    .catch(error => res.status(500).json({ success: false, message: error.message }))
));
