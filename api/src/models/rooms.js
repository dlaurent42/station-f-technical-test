import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

/*
  Rooms model contains all rooms as described in json input file.
  For flexibility reasons, equipments are defined in another model.
*/

const RoomsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: value => validator.isLength(value, { min: 2, max: 15 }) && validator.isAscii(value),
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: value => validator.isLength(value, { min: 2, max: 255 }) && validator.isAscii(value),
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  equipments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipments',
  }],
  createdAt: Date,
  updatedAt: Date,
});

RoomsSchema.pre('update', function () {
  this.updatedAt = Date.now();
});

RoomsSchema.pre('findOneAndUpdate', function () {
  this.updatedAt = Date.now();
});

RoomsSchema.pre('save', function (next) {
  if (!this.createdAt) this.createdAt = Date.now();
  this.updatedAt = Date.now();
  next();
});

export default model('Rooms', RoomsSchema);
