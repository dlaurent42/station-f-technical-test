import express from 'express';
import { Rooms, Equipments } from '../../models';
import { deleteOneById, pull } from '../../helpers';

/*
  This route deletes an equipment from the database based on its id
  and all relative occurence in rooms.
*/
export default express.Router().delete('/:id', (req, res) => (
  deleteOneById(Equipments, req.params.id)
    .then(() => pull(Rooms, 'equipments', req.params.id))
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).json({ success: false, message: 'An error occured' }))
));
