const express = require("express");
const router = express.Router();

// GET /video/watch/:videoId
router.get("/watch/:videoId", (req, res) => {
  res.json({ message: `Watch video ${req.params.videoId}` });
});

// PUT /video/edit/:videoId
router.put("/edit/:videoId", (req, res) => {
  res.json({ message: `Edit video ${req.params.videoId}` });
});

// POST /video/upload
router.post("/upload", (req, res) => {
  res.json({ message: "Upload video" });
});

module.exports = router;
