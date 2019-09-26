import express from 'express';
import mongoose from 'mongoose';
import { find } from 'lodash';
import { Rooms, Equipments } from '../../models';
import { createOne, fetchAll, fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route insert a document in database.
*/
export default express.Router().post('/', (req, res) => {

  // Fetch input data from body
  const { name, description, capacity, equipments = [] } = req.body;

  // Verify data
  if (!Rooms.verifyName(name)) return res.status(422).json({ success: false, message: 'Invalid name' });
  if (!Rooms.verifyDescription(description)) return res.status(422).json({ success: false, message: 'Invalid description' });
  if (!Rooms.verifyCapacity(capacity)) return res.status(422).json({ success: false, message: 'Invalid capacity' });

  // Check if name is not already assigned and fetch equipments if not
  return fetchOne(Rooms, { name })
    .then((document) => {
      if (!isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid name (already exists)');
      }
      return fetchAll(Equipments);
    })
    .then((equip) => {

      // Verify equipments from request
      if (equipments.some(el => !find(equip, { _id: mongoose.Types.ObjectId(el._id) }))) {
        res.status(422);
        throw new Error('Invalid equipments list');
      }

      // Create document in Rooms model
      return createOne(Rooms, {
        name,
        description,
        capacity,
        equipments: equipments.map(el => el._id),
      });
    })
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: 'An error occured' })
        : res.json({ success: false, message: error.message })
    ));
});
