import mongoose from 'mongoose';
import { uniqBy, get, find, omit } from 'lodash';

// Import data from json input
import data from '../assets/rooms.json';
import users from '../assets/users.json';

// Import config
import { DATABASE } from '../src/config';

// Import models
import { Equipments, Rooms, Users } from '../src/models';

// Function to add equipements to database
const addEquipments = equipments => (
  new Promise((resolve, reject) => (
    Equipments.insertMany(equipments, (error, docs) => {
      if (error) reject(error);
      else resolve(docs);
    })
  ))
);

// Function to add rooms to database
const addRooms = rooms => (
  new Promise((resolve, reject) => (
    Rooms.insertMany(rooms, (error, docs) => {
      if (error) reject(error);
      else resolve(docs);
    })
  ))
);

// Function to add users to database
const addUsers = () => (
  new Promise((resolve, reject) => (
    Users.insertMany(users, (error, docs) => {
      if (error) reject(error);
      else resolve(docs);
    })
  ))
);

// Main function to feed database with equipments and rooms
const feed = () => (
  new Promise((resolve, reject) => {

    // Retrieve equipments from data
    const equipments = uniqBy(data.rooms.map(el => el.equipements).flat(), 'name');

    // Connect to database
    mongoose.connect(DATABASE.PATH, DATABASE.OPTIONS).catch(() => {});

    // Add equipements
    return addEquipments(equipments)
      .then((docs) => {
        // Transform rooms object: remove 'equipEments' and set 'equipments as an array of ids
        const rooms = data.rooms.map(room => Object.assign(omit(room, ['equipements']), {
          equipments: room.equipements.map(equipment => ({
            _id: get(find(docs, { name: equipment.name }), '_id'),
          })),
        }));

        // Add rooms
        return addRooms(rooms);
      })
      .then(() => addUsers())
      .then(() => resolve())
      .catch(err => reject(err));
  })
);

feed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
