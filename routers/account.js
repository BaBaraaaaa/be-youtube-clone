const express = require("express");
const router = express.Router();

// GET /account/profile
router.get("/profile", (req, res) => {
  res.json({ message: "User profile" });
});

// PUT /account/settings
router.put("/settings", (req, res) => {
  res.json({ message: "Update settings" });
});

// GET /account/subscriptions
router.get("/subscriptions", (req, res) => {
  res.json({ message: "User subscriptions" });
});

// GET /account/history
router.get("/history", (req, res) => {
  res.json({ message: "User watch history" });
});

module.exports = router;
