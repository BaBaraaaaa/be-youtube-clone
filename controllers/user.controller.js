const User = require("../models/User");

exports.getProfile = (req, res) => {
  res.json({ message: "User profile", user: req.user });
};

exports.updateSettings = (req, res) => {
  res.json({ message: "Update settings" });
};

exports.getSubscriptions = (req, res) => {
  res.json({ message: "User subscriptions" });
};

exports.getHistory = (req, res) => {
  res.json({ message: "User watch history" });
};

exports.getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    console.log(allUser);

    if (allUser) {
      res.json({ allUser });
    }
  } catch (error) {
    console.error("Lỗi lấy Tất cả User:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách User." });
  }
};
