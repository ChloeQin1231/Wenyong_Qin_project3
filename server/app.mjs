import mongoose from 'mongoose';
import './models/user.mjs';
import './models/twit.mjs';
import express from 'express';
import session from 'express-session';
import path from 'path';
import url from 'url';
import auth from './routes/auth.mjs';
import twit from './routes/twit.mjs';
import { MONGO_URL } from './config.mjs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.error(err);
  });

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());
app.use(session({
  secret: 'twitterapp',
  resave: false,
  saveUninitialized: true,
}));

const api = new express.Router();

api.use('/auth', auth);
api.use('/twit', twit);
app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('server started at', port);
});
