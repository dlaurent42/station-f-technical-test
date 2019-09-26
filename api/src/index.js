import cors from 'cors';
import http from 'http';
import express from 'express';

import { API, CORS, setMongo, setRouter } from './config';

// Setup the application
const app = express();

// Since express v4.16.0, express.json() replaces bodyparser.json()
// More details here: https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318#47232318
app.use(express.json());

// Cors is used to allow only URLs from a white list
// app.use(cors(CORS));
app.use(cors());

// Setup routes
setRouter(app);

// Connect to database (persistent)
setMongo();

// Run server
http.Server(app).listen(API.PORT, API.HOST);
