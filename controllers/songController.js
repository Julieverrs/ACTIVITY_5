const db = require('../db');
const multer = require('multer');
const path = require('path');

// Storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
}).fields([
  { name: 'mp3', maxCount: 1 },
  { name: 'album_photo', maxCount: 1 }
]);

// Controller to add song
exports.addSong = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send('Error uploading files');
    } else {
      const { title, lyrics } = req.body;
      const mp3 = req.files.mp3[0].filename;
      const album_photo = req.files.album_photo[0].filename;

      const query = 'INSERT INTO songs (title, lyrics, mp3, album_photo) VALUES (?, ?, ?, ?)';
      db.query(query, [title, lyrics, mp3, album_photo], (err, result) => {
        if (err) throw err;
        res.redirect('/');
      });
    }
  });
};

// Controller to fetch and display songs
exports.viewSongs = (req, res) => {
  const query = 'SELECT * FROM songs';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('viewSongs', { songs: results });
  });
};

// Controller to fetch and display a specific song's details
exports.viewSongDetails = (req, res) => {
  const songId = req.params.id;
  const query = 'SELECT * FROM songs WHERE id = ?';
  db.query(query, [songId], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const song = results[0];
      res.render('songDetails', { song });
    } else {
      res.send('Song not found');
    }
  });
};
