const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routers/auth");
const dashboardRoutes = require("./routers/dashboard");
const channelRoutes = require("./routers/channel");
const videoRoutes = require("./routers/videos");
const playlistRoutes = require("./routers/playlist");
const accountRoutes = require("./routers/account");

// Middleware để parse JSON request body
app.use(express.json());
connectDB();
// Route thử nghiệm
app.use("/", dashboardRoutes); // root cho dashboard

app.use("/auth", authRoutes);
app.use("/channel", channelRoutes);
app.use("/video", videoRoutes);
app.use("/playlist", playlistRoutes);
app.use("/account", accountRoutes);

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
