const express = require('express');
const router = express.Router();

// GET / (home)
router.get('/', (req, res) => {
  res.json({ message: 'Home page data' });
});

// GET /watch/:watchingId
router.get('/watch/:watchingId', (req, res) => {
  const { watchingId } = req.params;
  res.json({ message: `Watch video ${watchingId}` });
});

// GET /history
router.get('/history', (req, res) => {
  res.json({ message: 'User history' });
});

// GET /shorts
router.get('/shorts', (req, res) => {
  res.json({ message: 'Shorts list' });
});

// GET /trending
router.get('/trending', (req, res) => {
  res.json({ message: 'Trending videos' });
});

// GET /subscriptions
router.get('/subscriptions', (req, res) => {
  res.json({ message: 'User subscriptions' });
});

module.exports = router;
