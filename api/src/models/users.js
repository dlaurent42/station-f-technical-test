import bcrypt from 'bcrypt';
import validator from 'validator';
import { Schema, model } from 'mongoose';
import { capitalize } from '../utils';

/*
  Users model contains list of users. This model is very simple as it is not asked by the test.
*/

const UsersSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate: value => validator.matches(value, /^[a-zA-Z]([\w -]*[a-zA-Z])?$/g),
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    validate: value => validator.matches(value, /^[a-zA-Z]([\w -]*[a-zA-Z])?$/g),
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: value => validator.isAlphanumeric(value),
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: value => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  createdAt: Date,
  updatedAt: Date,
}, { versionKey: false });

UsersSchema.pre('update', function (next) {
  // Update 'updatedAt'
  this.updatedAt = Date.now();
  next();
});

UsersSchema.pre('findOneAndUpdate', function (next) {
  // Update 'updatedAt'
  this.updatedAt = Date.now();
  next();
});

UsersSchema.pre('save', function (next) {

  // Update 'updatedAt'
  this.updatedAt = Date.now();

  // Specify createdAt in case of new record
  if (!this.createdAt) this.createdAt = Date.now();

  // Only capitalize the firstname if it has been modified (or is new)
  if (this.isModified('firstname')) this.firstname = capitalize(this.firstname, [' ', '-']);

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Generate a salt

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Hash the password using generated salt
    return bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);

      // Override the cleartext password with the hashed one
      this.password = hash;
      this.salt = salt;
      return next();
    });
  });
});

UsersSchema.statics.verifyFirstname = value => (
  validator.matches(value, /^[a-zA-Z]([\w -]*[a-zA-Z])?$/g)
);
UsersSchema.statics.verifyLastname = value => (
  validator.matches(value, /^[a-zA-Z]([\w -]*[a-zA-Z])?$/g)
);
UsersSchema.statics.verifyUsername = value => (
  validator.isAlphanumeric(value)
);
UsersSchema.statics.verifyEmail = value => (
  validator.isEmail(value)
);
UsersSchema.statics.verifyPassword = value => (
  typeof value === 'string' && value.length < 30
);
UsersSchema.statics.verifyRole = value => (
  typeof value === 'undefined' || ['user', 'admin'].includes(value)
);


export default model('Users', UsersSchema);
