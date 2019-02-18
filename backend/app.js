const express = require('express');
const app = express();

const posts = [{
    id: 0,
    title: 'Node Title 1',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
  {
    id: 1,
    title: 'Node Title 1',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
  {
    id: 2,
    title: 'Node Title 1',
    content: 'this comes from the backend',
    category: 'Backend',
    tag: 'Node'
  },
]

app.use('/api/posts', (req, res) => {
  const message = 'Get posts success';
  res.status(200).json({
    message,
    posts
  });
});

module.exports = app;
