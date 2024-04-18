const db = require('../database');
const data = require('../user');

const getUser = (req, res) => {
  db.query('select * from users', (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    res.status(200).json({
      message: 'success',
      data: rows.map((item) => {
        return {
          id: item.id,
          name: item.name,
          age: item.age,
          address: item.address,
        };
      }),
    });
  });
};

const getUserDetail = (req, res) => {
  var id = req.params.id;

  var sql = 'select * from users where id = ?';

  db.query(sql, id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    if (rows.length == 0) {
      return res.status(404).json({
        message: 'Data Not Found',
      });
    }

    return res.status(200).json({
      message: 'success',
      data: rows.map((item) => {
        return {
          id: item.id,
          name: item.name,
          age: item.age,
          address: item.address,
        };
      })[0],
    });
  });
};

const postUser = (req, res) => {
  const body = req.body;

  const formData = {
    name: body.name,
    age: body.age,
    address: body.address,
  };

  var sql = 'INSERT INTO users SET ?';

  db.query(sql, formData, (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    return res.status(200).json({
      message: 'success',
    });
  });
};

module.exports = { getUser, getUserDetail, postUser };
