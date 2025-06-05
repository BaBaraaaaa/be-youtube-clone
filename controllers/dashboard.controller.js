// controllers/dashboard.controller.js

exports.getHome = (req, res) => {
  res.json({ message: "Home page data" });
};

exports.getWatch = (req, res) => {
  const { watchingId } = req.params;
  res.json({ message: `Watch video ${watchingId}` });
};

exports.getHistory = (req, res) => {
  res.json({ message: "User history" });
};

exports.getShorts = (req, res) => {
  res.json({ message: "Shorts list" });
};

exports.getTrending = (req, res) => {
  res.json({ message: "Trending videos" });
};

exports.getSubscriptions = (req, res) => {
  res.json({ message: "User subscriptions" });
};
