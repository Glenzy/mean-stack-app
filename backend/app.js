import 'dotenv/config';
import path from 'path';
import express from 'express';
import {
  json,
  urlencoded
} from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import PostsRouter from './posts/posts.router';
import UserRouter from './user/user.router';
import {
  signup,
  login,
  protect
} from './utils/auth';

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const app = express();

mongoose.connect(`mongodb+srv://${username}:${password}@mean-stack-app-jk9zy.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected to the database');
  })
  .catch(() => {
    console.log('error connecting to the database');
    process.exit(1);
  });

app.disable('x-powered-by');
app.use(cors({
  "origin": "http://localhost:4200"
}));
app.use(json());
app.use(urlencoded({
  extended: true
}));

app.post('/api/posts', protect);
app.put('/api/posts', protect);
app.delete('/api/posts', protect);
app.use('/images', express.static(path.join('backend/images')));
app.use('/api/posts', PostsRouter);
app.use('/signup', signup);
app.use('/login', login);

module.exports = app;
