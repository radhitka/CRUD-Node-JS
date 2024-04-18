const db = require('../database');
const data = require('../user');

const getUser = (req, res) => {
  db.query('SELECT * FROM users', (err, rows, field) => {
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

  var sql = 'SELECT * FROM users WHERE id = ?';

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

const deleteUser = (req, res) => {
  var id = req.params.id;

  var sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    return res.status(200).json({
      message: 'Success Delete user',
    });
  });
};

const updateUser = (req, res) => {
  var id = req.params.id;

  const body = req.body;

  const formData = {
    name: body.name,
    age: body.age,
    address: body.address,
  };

  var sql = 'UPDATE users SET ? where id = ?';

  db.query(sql, [formData, id], (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    return res.status(200).json({
      message: 'Success Update User',
    });
  });
};

module.exports = { getUser, getUserDetail, postUser, deleteUser, updateUser };
