require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {
  getUser,
  getUserDetail,
  postUser,
} = require('./controller/user_controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', getUser);
app.get('/users/:id', getUserDetail);
app.post('/users/add', postUser);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
