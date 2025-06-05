// routes/videoRouter.js

const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");

router.get("/watch/:videoId", videoController.watchVideo);

router.put("/edit/:videoId", videoController.editVideo);

router.post("/upload", videoController.uploadVideo);

module.exports = router;
