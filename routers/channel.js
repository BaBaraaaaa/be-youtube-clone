// routes/channelRouter.js

const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

// GET /channel/:channelId
router.get("/:channelId", channelController.getChannelProfile);

// GET /channel/:channelId/videos
router.get("/:channelId/videos", channelController.getChannelVideos);

// GET /channel/:channelId/playlists
router.get("/:channelId/playlists", channelController.getChannelPlaylists);

// GET /channel/:channelId/about
router.get("/:channelId/about", channelController.getChannelAbout);

module.exports = router;
