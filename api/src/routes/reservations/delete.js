import express from 'express';
import { Reservations } from '../../models';
import { deleteOneById } from '../../helpers';

/*
  This route deletes a reservation slot from the database.
*/
export default express.Router().delete('/:id', (req, res) => (
  deleteOneById(Reservations, req.params.id)
    .then(() => res.status(200).json({ success: true }))
    .catch(error => res.status(500).json({ success: false, message: error.message }))
));