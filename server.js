const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Load ENV variables
dotenv.config();

// Khởi tạo app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Import routers
const authRoutes = require("./routers/auth");
const dashboardRoutes = require("./routers/dashboard");
const channelRoutes = require("./routers/channel");
const videoRoutes = require("./routers/videos");
const playlistRoutes = require("./routers/playlist");
const userRoutes = require("./routers/user");

// Mount routers
app.use("/", dashboardRoutes); // Route thử nghiệm
app.use("/auth", authRoutes);
app.use("/channel", channelRoutes);
app.use("/video", videoRoutes);
app.use("/playlist", playlistRoutes);
app.use("/user", userRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Trang không tồn tại." });
});
app.use((req, res) => {
  res.status(400).json({ message: "lỗi từ client." });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
