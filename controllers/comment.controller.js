// controllers/comment.controller.js
const Comment = require("../models/Comment");

exports.getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text, user, video } = req.body;
    const comment = new Comment({ text, user, video });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
