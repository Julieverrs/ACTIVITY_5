const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Route for index page
router.get('/', (req, res) => {
  res.render('index'); // Render index.ejs
});

// Route to view all songs
router.get('/songs', songController.viewSongs);

// Route to view a specific song
router.get('/songs/:id', songController.viewSongDetails);

// Route to show add song form
router.get('/add', (req, res) => res.render('addSong'));

// Route to add a song
router.post('/add', songController.addSong);

module.exports = router;
