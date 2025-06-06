const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");

//Get with Admin
router.get("", userController.getAllUser);

// GET /user/profile
router.get("/profile", verifyToken, userController.getProfile);

// PUT /user/settings
router.put("/settings", verifyToken, userController.updateSettings);

// GET /user/subscriptions
router.get("/subscriptions", verifyToken, userController.getSubscriptions);

// GET /user/history
router.get("/history", verifyToken, userController.getHistory);

module.exports = router;
