// controllers/dashboard.controller.js

const Video = require("../models/Video");

exports.getHome = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ uploadDate: -1 })
      .limit(20)
      .populate("userId", "username profilePictureUrl");
    if (videos) {
      res.json({ videos });
    }
  } catch (error) {
    console.error("Lỗi lấy video:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách video." });
  }
};

exports.getWatch = (req, res) => {
  const { watchingId } = req.params;
  res.json({ message: `Watch video ${watchingId}` });
};

exports.getHistory = (req, res) => {
  res.json({ message: "User history" });
};

exports.getShorts = (req, res) => {
  res.json({ message: "Shorts list" });
};

exports.getTrending = (req, res) => {
  res.json({ message: "Trending videos" });
};

exports.getSubscriptions = (req, res) => {
  res.json({ message: "User subscriptions" });
};
