// routers/dashboard.js

const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");

// GET /
router.get("/", dashboardController.getHome);

// GET /watch/:watchingId
router.get("/watch/:watchingId", dashboardController.getWatch);

// GET /history
router.get("/history", dashboardController.getHistory);

// GET /shorts
router.get("/shorts", dashboardController.getShorts);

// GET /trending
router.get("/trending", dashboardController.getTrending);

// GET /subscriptions
router.get("/subscriptions", dashboardController.getSubscriptions);

module.exports = router;
