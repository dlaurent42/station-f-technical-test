import { Schema, model } from 'mongoose';
import validator from 'validator';

/*
  Equipments model contains all available equipments as a list.
  It is refered in rooms model.
*/

const EquipementsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: value => validator.isLength(value, { min: 2, max: 45 }) && validator.isAscii(value),
  },
}, { versionKey: false });

EquipementsSchema.statics.verifyName = value => (
  validator.isLength(value, { min: 2, max: 45 }) && validator.isAscii(value)
);


export default model('Equipments', EquipementsSchema);
