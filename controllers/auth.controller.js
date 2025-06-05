const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");

const createAccessToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

const createRefreshToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

exports.register = async (req, res) => {
  const { name, email, avatar } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email đã đăng ký" });

  const user = new User({ name, email, avatar });
  await user.save();
  res.status(201).json({ message: "Đăng ký thành công", user });
};

exports.login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  await Token.create({ token: refreshToken, user: user._id });

  res.json({ accessToken, refreshToken });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const stored = await Token.findOne({ token: refreshToken });
  if (!stored) return res.status(403).json({ error: "Token không hợp lệ" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, userData) => {
    if (err)
      return res.status(403).json({ error: "Token hết hạn hoặc không hợp lệ" });
    const newAccessToken = createAccessToken({
      _id: userData.id,
      email: userData.email,
    });
    res.json({ accessToken: newAccessToken });
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.deleteOne({ token: refreshToken });
  res.json({ message: "Đăng xuất thành công" });
};
