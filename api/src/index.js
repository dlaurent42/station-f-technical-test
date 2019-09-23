import cors from 'cors';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {
  API,
  // CORS,
  DATABASE,
  setRouter,
} from './config';

// Setup the application
const app = express();
app.use(bodyParser.json());
// app.use(cors(CORS));
app.use(cors());

// Setup routes
setRouter(app);

// Connect to database (persistent)
mongoose.connect(DATABASE.PATH, DATABASE.OPTIONS).catch(() => {});

// Run server
http.Server(app).listen(API.PORT, API.HOST);
