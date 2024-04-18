require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getUser, getUserDetail } = require('./controller/user_controller');

app.get('/users', getUser);
app.get('/users/:id', getUserDetail);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
