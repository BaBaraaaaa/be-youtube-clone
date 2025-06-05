// routes/playlistRouter.js

const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlistController");

// GET /playlist/:playlistId
router.get("/:playlistId", playlistController.viewPlaylist);

// PUT /playlist/edit/:playlistId
router.put("/edit/:playlistId", playlistController.editPlaylist);

// POST /playlist/create
router.post("/create", playlistController.createPlaylist);

module.exports = router;
