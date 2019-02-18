const express = require('express');
const app = express();

app.use((req, res) => {
  res.send('Welcome to express');
});

module.exports = app;
