const express = require('express');
const router = express.Router();

// GET /channel/:channelId
router.get('/:channelId', (req, res) => {
  res.json({ message: `Channel profile ${req.params.channelId}` });
});

// GET /channel/:channelId/videos
router.get('/:channelId/videos', (req, res) => {
  res.json({ message: `Videos of channel ${req.params.channelId}` });
});

// GET /channel/:channelId/playlists
router.get('/:channelId/playlists', (req, res) => {
  res.json({ message: `Playlists of channel ${req.params.channelId}` });
});

// GET /channel/:channelId/about
router.get('/:channelId/about', (req, res) => {
  res.json({ message: `About channel ${req.params.channelId}` });
});

module.exports = router;
