require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./user');

app.get('/', (req, res) => {
  res.json({
    message: 'success',
    data: data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        age: item.age,
        address: item.address,
      };
    }),
  });
});

app.get('/:id', (req, res) => {
  var id = req.params.id;

  var check = data.filter((item) => item.id == id);

  if (check.length == 0) {
    res.status(404).json({
      message: 'Data Not Found',
    });
    return;
  }

  res.json({
    message: 'success',
    data: check[0],
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
