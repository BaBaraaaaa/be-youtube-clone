const express = require('express');
const router = express.Router();

// GET /playlist/:playlistId
router.get('/:playlistId', (req, res) => {
  res.json({ message: `View playlist ${req.params.playlistId}` });
});

// PUT /playlist/edit/:playlistId
router.put('/edit/:playlistId', (req, res) => {
  res.json({ message: `Edit playlist ${req.params.playlistId}` });
});

// POST /playlist/create
router.post('/create', (req, res) => {
  res.json({ message: 'Create playlist' });
});

module.exports = router;
