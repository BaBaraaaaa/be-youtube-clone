const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Lấy comment của video
router.get("/:videoId", async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });
  res.json(comments);
});

// Thêm comment
router.post("/", async (req, res) => {
  const { text, user, video } = req.body;
  const comment = new Comment({ text, user, video });
  await comment.save();
  res.status(201).json(comment);
});

module.exports = router;
