const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database');
const data = require('../user');

const getUser = (req, res) => {
  db.query('SELECT * FROM employees', (err, rows, field) => {
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
          role: item.role,
          age: item.age,
          address: item.address,
        };
      }),
    });
  });
};

const getUserDetail = (req, res) => {
  var id = req.params.id;

  var sql = 'SELECT * FROM employees WHERE id = ?';

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
          role: item.role,
          age: item.age,
          address: item.address,
        };
      })[0],
    });
  });
};

const postUser = async (req, res) => {
  const body = req.body;

  const formData = {
    name: body.name,
    role: body.role,
    age: body.age,
    address: body.address,
  };

  var sql = 'INSERT INTO employees SET ?';

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

  var sql = 'DELETE FROM employees WHERE id = ?';

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

const updateUser = async (req, res) => {
  var id = req.params.id;

  const body = req.body;

  const formData = {
    name: body.name,
    role: body.role,
    age: body.age,
    address: body.address,
  };

  var sql = 'UPDATE employees SET ? where id = ?';

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

const loginUser = (req, res) => {
  const { username, password } = req.body;

  var sql = 'select * from users where username = ?';

  db.query(sql, username, async (err, rows, field) => {
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

    const data = rows[0];

    const checkPassword = await bcrypt.compare(password, data.password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign(
      {
        userId: data.id,
      },
      'login-gaming',
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      token: token,
      message: 'success',
    });
  });
};

const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  var sqlSearch = 'SELECT * FROM users WHERE username = ?';

  db.query(sqlSearch, username, async (err, rows, field) => {
    if (err) {
      return res.status(500).json({
        message: 'internal server error',
        error: err?.sqlMessage,
      });
    }

    if (rows.length > 0) {
      return res.status(422).json({
        message: 'Username sudah digunakan!',
      });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const formData = {
      name: name,
      username: username,
      password: newPassword,
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
  });
};

const profileUser = (req, res) => {
  const userId = req.userId;

  var sql = 'select * from users where id = ?';

  db.query(sql, userId, (err, rows, field) => {
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

    const data = rows[0];

    return res.status(200).json({
      message: 'successs',
      data: {
        id: data.id,
        name: data.name,
        username: data.username,
      },
    });
  });
};

module.exports = {
  getUser,
  getUserDetail,
  postUser,
  deleteUser,
  updateUser,
  loginUser,
  profileUser,
  registerUser,
};
