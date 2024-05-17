require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { verifyToken } = require('./middleware/auth_middleware');
const {
  getUser,
  getUserDetail,
  postUser,
  deleteUser,
  updateUser,
  loginUser,
  profileUser,
  registerUser,
} = require('./controller/user_controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', loginUser);
app.post('/register', registerUser);

app.use(verifyToken);

app.get('/profile', profileUser);
app.get('/users', getUser);
app.get('/users/:id', getUserDetail);
app.post('/users/add', postUser);
app.delete('/users/:id', deleteUser);
app.patch('/users/:id', updateUser);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
