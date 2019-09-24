import express from 'express';
import { Equipments } from '../../models';
import { createOne, fetchOne } from '../../helpers';
import { isEmpty } from '../../utils';

/*
  This route insert a document in database.
*/
export default express.Router().post('/', (req, res) => {

  // Fetch input data from body
  const { name } = req.body;

  // Verify data
  if (!Equipments.verifyName(name)) return res.status(422).json({ success: false, message: 'Invalid name' });

  // Create document
  return fetchOne(Equipments, { name })
    .then((document) => {
      if (!isEmpty(document)) {
        res.status(422);
        throw new Error('Invalid name (already exists)');
      }
      return createOne(Equipments, { name });
    })
    .then(payload => res.status(200).json({ success: true, payload }))
    .catch(error => (
      res.statusCode === 200
        ? res.status(500).json({ success: false, message: error.message })
        : res.json({ success: false, message: error.message })
    ));
});
