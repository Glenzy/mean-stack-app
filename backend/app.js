const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import 'dotenv/config';
const PostsRouter = require('./posts/posts.router');

const posts = [{
    id: 0,
    title: 'Node Title 1',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
  {
    id: 1,
    title: 'Node Title 2',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
  {
    id: 2,
    title: 'Node Title 3',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
]
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
app.post('/api/posts', (req, res) => {
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
});

module.exports = app;
