import 'dotenv/config';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import PostsRouter from './posts/posts.router';
import UsersRouter from './users/users.router';

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/images', express.static(path.join('backend/images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',
    'http://localhost:4200'
  );
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS, PATCH, PUT'
  );
  next();
});


app.use('/api/posts', PostsRouter);
app.use('/signup', UsersRouter);


module.exports = app;
