import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import PostsRouter from './posts/posts.router';

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
    console.log('error connecting ot the database');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',
    'http://localhost:4200'
  );
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS, PATCH'
  );
  next();
})


app.use('/api/posts', PostsRouter);
/*app.post('/api/posts', (req, res) => {
  const post = req.body;
  const message = 'Post successfully added';
  console.log(post);
  res.status(201).json({
    message
  });
});

app.get('/api/posts', (req, res) => {
  const message = 'Get posts success';
  res.status(200).json({
    message,
    posts
  });
}); */

module.exports = app;
