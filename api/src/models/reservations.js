import mongoose, { Schema, model } from 'mongoose';

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
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: 'owner',
      enum: ['owner', 'mandatory', 'optional'],
    },
    participationStatus: {
      type: String,
      required: true,
      trim: true,
      default: 'waiting for confirmation',
      enum: ['accepted', 'rejected', 'maybe', 'waiting for confirmation'],
    },
  }],
  createdAt: Date,
  updatedAt: Date,
});

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

export default model('Reservations', ReservationsSchema);
