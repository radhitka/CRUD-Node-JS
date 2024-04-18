const mysql = require('mysql');

var db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('Connect');
});

module.exports = db;
