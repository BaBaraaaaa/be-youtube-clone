// routers/comment.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

// GET /comment/:videoId
router.get("/:videoId", commentController.getCommentsByVideo);

// POST /comment/
router.post("/", commentController.createComment);

module.exports = router;
