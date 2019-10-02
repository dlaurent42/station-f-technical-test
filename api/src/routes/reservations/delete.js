import express from 'express';
import { Reservations } from '../../models';
import { deleteOneById } from '../../helpers';

/*
  This route deletes a reservation slot from the database.
*/
export default express.Router().delete('/:id', (req, res) => (
  deleteOneById(Reservations, req.params.id)
    .then(success => res.status(200).json({ success }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }))
));
