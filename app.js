const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import the db connection
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const songRoutes = require('./routes/songs');
app.use('/', songRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
