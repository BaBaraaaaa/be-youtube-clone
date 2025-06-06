const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const admin = require("../firebaseConfig/config");
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
  const { firebaseToken } = req.body;

  if (!firebaseToken) res.status(400).json({ error: "Missing Firebase Token" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { email, name, picture } = decodedToken;
    if (!email)
      return res.status(400).json({ error: " Email not found in token" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });
    const newUser = new User({
      email,
      username: email.split("@")[0] + "_" + Math.floor(Math.random() * 10000),
      fullName: name || "",
      profilePictureUrl: picture || "",
      passwordHash: "firebase",
    });
    await newUser.save();
    // Tạo token JWT riêng
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
     // Lưu refresh token
    await Token.create({ token: refreshToken, user: user._id }); 
    return res.status(201).json({
      status: 201,
      message: "Đăng ký thành công",
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,

    });
  } catch (error) {
    console.error("Firebase register error:", err);
    return res.status(401).json({ error: "Invalid Firebase Token" });
  }
};

exports.login = async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) res.status(400).json({ error: "Missing Firebase Token" });

  try {
    // Verify firebase token
    const decodeToken = await admin.auth().verifyIdToken(firebaseToken);
    console.log(decodeToken);
    const { email, name, picture } = decodeToken;
    console.log(decodeToken);
    if (!email)
      return res
        .status(400)
        .json({ error: "Email not found in Firebase token" });
    let user = await User.findOne({ email });
    if (!user)
      user = new User({
        email,
        username: email.split("@")[0] + "_" + Math.floor(Math.random() * 10000),
        fullName: name || "",
        profilePictureUrl: picture || "",
        passwordHash: "firebase",
      });
    await user.save();
    // Tạo token JWT riêng
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Lưu refresh token
    await Token.create({ token: refreshToken, user: user._id });

    return res.json({ accessToken, refreshToken, user });
  } catch (error) {
    console.error("firebase login error", error);
    return res.status(401).json({ error: "Invalid Firebase token" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  try {
    // Kiểm tra refresh token có trong DB không
    const storedToken = await Token.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(403).json({ error: "Refresh token invalid" });
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(403).json({ error: "Invalid refresh token" });

        // Tìm user theo id decode
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Tạo access token mới
        const newAccessToken = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.deleteOne({ token: refreshToken });
  res.json({ message: "Đăng xuất thành công" });
};
