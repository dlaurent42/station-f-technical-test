import express from 'express';
import { Equipments } from '../../models';
import { updateOneById, fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route modify a document in database.
*/
export default express.Router().put('/:id', (req, res) => {

  // Fetch input data from body
  const { name } = req.body;
  const { id } = req.params;

  // Verify data
  if (!Equipments.verifyName(name)) return res.status(422).json({ success: false, message: 'Invalid name' });

  // Check if equipment name is not already assigned before update Equipment
  return fetchOne(Equipments, { name, _id: { $ne: id } })
    .then((document) => {
      if (!isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid name (already exists)');
      }
      return updateOneById(Equipments, id, { name });
    })
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: error.message })
        : res.json({ success: false, message: error.message })
    ));
});
