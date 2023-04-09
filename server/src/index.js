import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT; // eslint-disable-line
const companyID = 'flurry';

// connect to db
let dbUrl = null;
if (app.get('env') === 'development') {
  console.log(`⚡️connecting to development db`);
  dbUrl = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/flurry_devdb?retryWrites=true&w=majority';
} else if (app.get('env') === 'test') {
  console.log(`⚡️connecting to test db (local)`);
  dbUrl = 'mongodb://localhost:27017/flurry_testdb';
} else if (app.get('env') === 'deploy_test') {
  console.log(`⚡️connecting to test db (deploy)`);
  dbUrl = 'mongodb+srv://xinyao:20001028@cluster0.kwf9tsb.mongodb.net/flurry_testdb?retryWrites=true&w=majority';
}
mongoose
    .connect(dbUrl)
    .catch((e) => {
      console.error('Connection error', e.message);
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Flurry Backend Server (Express + JS)');
});

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8080']; // TODO: ADD FRONTEND ORIGIN

const options = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use('/api', router);


const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export {app, server, companyID}; // for testing
