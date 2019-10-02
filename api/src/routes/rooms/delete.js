import express from 'express';
import { Rooms } from '../../models';
import { deleteOneById } from '../../helpers';

/*
  This route deletes a room from the database based on its id.
*/
export default express.Router().delete('/:id', (req, res) => (
  deleteOneById(Rooms, req.params.id)
    .then(success => res.status(200).json({ success }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }))
));
