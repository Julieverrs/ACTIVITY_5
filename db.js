const mysql = require('mysql2');

// MySQL2 connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spotify_clone'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL2 connected');
});

module.exports = db;
