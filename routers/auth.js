const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const User = require("../models/User");

// Tạo access token
const createAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

// Tạo refresh token
const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// Route login mẫu (giả lập)
router.post("/login", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  // Tạo token
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  // Lưu refresh token vào DB
  await Token.create({ token: refreshToken, user: user._id });

  res.json({ accessToken, refreshToken });
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email đã được đăng ký" });

    // Tạo user mới
    const user = new User({ name, email, avatar });
    await user.save();

    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Route refresh token
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    // Kiểm tra token có tồn tại trong DB không
    const storedToken = await Token.findOne({ token: refreshToken });
    if (!storedToken)
      return res.status(403).json({ error: "Invalid refresh token" });

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (err, userData) => {
        if (err)
          return res.status(403).json({ error: "Invalid refresh token" });

        // Tạo access token mới
        const accessToken = createAccessToken({
          _id: userData.id,
          email: userData.email,
        });
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route logout
router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "No refresh token" });

  try {
    // Xóa refresh token trong DB
    await Token.deleteOne({ token: refreshToken });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
