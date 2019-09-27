import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';

/*
  Reservations model contains all reservations by room.
*/

const ReservationsSchema = new Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 30,
    max: 60 * 3,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: Date,
  updatedAt: Date,
}, { versionKey: false });

ReservationsSchema.pre('update', function (next) {
  // Update 'updatedAt'
  this.updatedAt = Date.now();
  next();
});

ReservationsSchema.pre('findOneAndUpdate', function (next) {
  // Update 'updatedAt'
  this.updatedAt = Date.now();
  next();
});

ReservationsSchema.pre('save', function (next) {
  // Specify createdAt in case of new record
  if (!this.createdAt) this.createdAt = Date.now();

  // Update/set 'updatedAt'
  this.updatedAt = Date.now();

  next();
});

ReservationsSchema.statics.verifyFrom = value => (
  moment.utc(value)._isValid
  && moment().add(10, 'minutes').diff(moment(value)) < 0
);

ReservationsSchema.statics.verifyDuration = value => (
  Number.isInteger(value) && value >= 30 && value <= 60 * 3 && value % 30 === 0
);

export default model('Reservations', ReservationsSchema);
